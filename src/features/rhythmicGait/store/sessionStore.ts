import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { getPaceById, toSeconds } from './catalogData';
import type { SessionConfig, SessionResult, SessionRuntime, SessionState } from './types';

const DEFAULT_CONFIG: SessionConfig = {
  cue: 'audio',
  paceId: 'steady',
  durationMinutes: 5,
  countInEnabled: true,
  endChimeEnabled: true,
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
  };
};

// Feature-scoped Zustand store for session configuration, runtime state, and results.
// Persist middleware serialises only `config` to AsyncStorage so the user's last
// choices are restored on next app launch. Runtime and lastResult are in-memory only.
export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      config: DEFAULT_CONFIG,
      runtime: { ...DEFAULT_RUNTIME },
      lastResult: undefined,

      setConfig: (partial) => {
        set(s => ({ config: { ...s.config, ...partial } }));
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

      // Decrements the countdown digit. Transitions to running when it reaches 1
      // (the digit 1 is displayed, then startRunning is called).
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
      },

      // Called each timer tick with the current system timestamp.
      // Uses clock deltas (not increment counting) to avoid drift.
      // The timer engine in Feature 5 is responsible for calling this at the desired interval.
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
        set(s => ({
          runtime: {
            ...s.runtime,
            status: 'paused',
            pausedAt: Date.now(),
          },
        }));
      },

      resume: () => {
        const { runtime } = get();
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
      },

      stop: () => {
        const { config, runtime } = get();
        set({
          runtime: { ...runtime, status: 'completed' },
          lastResult: buildResult(config, runtime, false),
        });
      },

      complete: () => {
        const { config, runtime } = get();
        set({
          runtime: { ...runtime, status: 'completed', remainingSeconds: 0 },
          lastResult: buildResult(config, runtime, true),
        });
      },

      // Resets runtime to idle defaults. Config is intentionally preserved.
      // lastResult is preserved so the Result screen can still read it during the
      // transition animation before the next session clears it.
      reset: () => {
        set({ runtime: { ...DEFAULT_RUNTIME } });
      },
    }),
    {
      name: 'Rythmic-session-config',
      storage: createJSONStorage(() => AsyncStorage),
      // Only persist the user's configuration — runtime state is never saved.
      partialize: (state) => ({ config: state.config }),
    },
  ),
);
