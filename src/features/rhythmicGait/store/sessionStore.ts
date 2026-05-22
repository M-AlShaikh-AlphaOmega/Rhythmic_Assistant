import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { getAnalytics } from '../../../shared/services/analytics';
import { speak } from '../services/cueSpeech';
import { getPaceById, toSeconds } from './catalogData';
import type {
  Preferences,
  SessionConfig,
  SessionResult,
  SessionRuntime,
  SessionState,
} from './types';

// Builds the common session context used by every telemetry payload.
const buildSessionContext = (config: SessionConfig) => {
  const pace = getPaceById(config.paceId);
  return {
    paceId: config.paceId,
    cue: config.cue,
    durationMinutes: config.durationMinutes,
    bpm: pace.bpm,
  };
};

const DEFAULT_CONFIG: SessionConfig = {
  cue: 'audio',
  paceId: 'steady',
  durationMinutes: 5,
  countInEnabled: true,
  endChimeEnabled: true,
};

const DEFAULT_PREFERENCES: Preferences = {
  bigTextMode: true,
  volume: 0.7,
  hapticStrength: 'strong',
  emergencyContact: undefined,
  lastMood: undefined,
};

// Hard-coded rescue config used by startRescue() — no user choice in a freeze moment.
// Vibration-only, gentlest pace, short duration, no count-in, no end chime.
const RESCUE_CONFIG: SessionConfig = {
  cue: 'vibration',
  paceId: 'gentle',
  durationMinutes: 5,
  countInEnabled: false,
  endChimeEnabled: false,
};

const DEFAULT_RUNTIME: SessionRuntime = {
  status: 'idle',
  startedAt: null,
  totalDurationSeconds: 0,
  remainingSeconds: 0,
  elapsedSeconds: 0,
  pausedAt: null,
  accumulatedPauseSeconds: 0,
  countdownValue: 3,
};

// Builds a SessionResult snapshot from the current store state when a session ends.
const buildResult = (
  config: SessionConfig,
  runtime: SessionRuntime,
  wasFullyCompleted: boolean,
  isRescue: boolean,
): SessionResult => {
  const pace = getPaceById(config.paceId);
  return {
    paceId: config.paceId,
    paceLabel: pace.label,
    paceIcon: pace.icon,
    cue: config.cue,
    durationMinutes: config.durationMinutes,
    bpm: pace.bpm,
    completedAt: Date.now(),
    wasFullyCompleted,
    isRescue,
  };
};

// Feature-scoped Zustand store for session configuration, preferences, runtime state, and results.
// Persist middleware serialises `config` and `preferences` to AsyncStorage so the user's last
// choices survive across launches. Runtime, lastResult, and rescueSnapshot are in-memory only.
export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      config: DEFAULT_CONFIG,
      preferences: DEFAULT_PREFERENCES,
      runtime: { ...DEFAULT_RUNTIME },
      lastResult: undefined,
      rescueSnapshot: undefined,

      setConfig: (partial) => {
        set(s => ({ config: { ...s.config, ...partial } }));
      },

      setPreferences: (partial) => {
        set(s => ({ preferences: { ...s.preferences, ...partial } }));
      },

      // Transitions from idle to countdown (if countInEnabled) or directly to running.
      start: () => {
        const { config } = get();
        if (config.countInEnabled) {
          set(s => ({
            runtime: {
              ...s.runtime,
              status: 'countdown',
              countdownValue: 3,
            },
          }));
        } else {
          get().startRunning();
        }
      },

      // Starts an emergency rescue session: snapshots the user's current config,
      // replaces it with the rescue config, and goes straight to running (no count-in).
      // reset() restores the snapshot so rescue never destroys the user's normal settings.
      startRescue: () => {
        const { config } = get();
        set({
          rescueSnapshot: config,
          config: RESCUE_CONFIG,
        });
        get().startRunning();
      },

      // Decrements the countdown digit. Transitions to running when it reaches 1.
      tickCountdown: () => {
        const { runtime } = get();
        if (runtime.status !== 'countdown') return;
        const next = (runtime.countdownValue - 1) as 3 | 2 | 1 | 0;
        if (next <= 0) {
          get().startRunning();
        } else {
          set(s => ({
            runtime: { ...s.runtime, countdownValue: next },
          }));
        }
      },

      // Transitions to the running state and records the session start timestamp.
      startRunning: () => {
        const { config } = get();
        const totalDurationSeconds = toSeconds(config.durationMinutes);
        set(s => ({
          runtime: {
            ...s.runtime,
            status: 'running',
            startedAt: Date.now(),
            totalDurationSeconds,
            remainingSeconds: totalDurationSeconds,
            elapsedSeconds: 0,
            accumulatedPauseSeconds: 0,
            pausedAt: null,
            countdownValue: 3,
          },
        }));
        getAnalytics().track('session_started', buildSessionContext(config));
      },

      // Called each timer tick with the current system timestamp.
      // Uses clock deltas (not increment counting) to avoid drift.
      tickOnce: (nowMs) => {
        const { runtime } = get();
        if (runtime.status !== 'running' || runtime.startedAt === null) return;

        const elapsed = Math.floor(
          (nowMs - runtime.startedAt - runtime.accumulatedPauseSeconds * 1000) / 1000,
        );
        const remaining = Math.max(0, runtime.totalDurationSeconds - elapsed);

        set(s => ({
          runtime: {
            ...s.runtime,
            elapsedSeconds: elapsed,
            remainingSeconds: remaining,
          },
        }));

        if (remaining === 0) {
          get().complete();
        }
      },

      pause: () => {
        const { config, runtime } = get();
        set(s => ({
          runtime: {
            ...s.runtime,
            status: 'paused',
            pausedAt: Date.now(),
          },
        }));
        getAnalytics().track('session_paused', {
          ...buildSessionContext(config),
          elapsedSeconds: runtime.elapsedSeconds,
          remainingSeconds: runtime.remainingSeconds,
        });
        speak('paused');
      },

      resume: () => {
        const { config, runtime } = get();
        if (runtime.pausedAt === null) return;
        const pauseDuration = (Date.now() - runtime.pausedAt) / 1000;
        set(s => ({
          runtime: {
            ...s.runtime,
            status: 'running',
            pausedAt: null,
            accumulatedPauseSeconds: s.runtime.accumulatedPauseSeconds + pauseDuration,
          },
        }));
        getAnalytics().track('session_resumed', {
          ...buildSessionContext(config),
          elapsedSeconds: runtime.elapsedSeconds,
          remainingSeconds: runtime.remainingSeconds,
        });
        speak('resumed');
      },

      stop: () => {
        const { config, runtime, rescueSnapshot } = get();
        const isRescue = rescueSnapshot !== undefined;
        set({
          runtime: { ...runtime, status: 'completed' },
          lastResult: buildResult(config, runtime, false, isRescue),
        });
        getAnalytics().track('session_stopped', {
          ...buildSessionContext(config),
          elapsedSeconds: runtime.elapsedSeconds,
          remainingSeconds: runtime.remainingSeconds,
          wasFullyCompleted: false,
          isRescue,
        });
      },

      complete: () => {
        const { config, runtime, rescueSnapshot } = get();
        const isRescue = rescueSnapshot !== undefined;
        set({
          runtime: { ...runtime, status: 'completed', remainingSeconds: 0 },
          lastResult: buildResult(config, runtime, true, isRescue),
        });
        getAnalytics().track('session_completed', { ...buildSessionContext(config), isRescue });
        speak('complete');
      },

      // Resets runtime to idle defaults. Restores user's config if a rescue session
      // was active. Preferences and lastResult are preserved.
      reset: () => {
        const { rescueSnapshot } = get();
        if (rescueSnapshot !== undefined) {
          set({
            runtime: { ...DEFAULT_RUNTIME },
            config: rescueSnapshot,
            rescueSnapshot: undefined,
          });
        } else {
          set({ runtime: { ...DEFAULT_RUNTIME } });
        }
      },
    }),
    {
      name: 'Rythmic-session-config',
      storage: createJSONStorage(() => AsyncStorage),
      // Persist user configuration and preferences only — runtime state is never saved.
      partialize: (state) => ({
        config: state.config,
        preferences: state.preferences,
      }),
    },
  ),
);
