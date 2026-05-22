import { useShallow } from 'zustand/react/shallow';

import { getPaceById } from './catalogData';
import { useSessionStore } from './sessionStore';
import type { Pace, Preferences, RuntimeStatus, SessionConfig, SessionResult } from './types';

// Current phase of the session state machine.
export const useSessionPhase = (): RuntimeStatus =>
  useSessionStore(s => s.runtime.status);

// Full config object. Uses shallow equality so the component only re-renders
// when an individual config field actually changes.
export const useSessionConfig = (): SessionConfig =>
  useSessionStore(useShallow(s => s.config));

// Full preferences object — uses shallow equality for the same reason as useSessionConfig.
export const usePreferences = (): Preferences =>
  useSessionStore(useShallow(s => s.preferences));

// Single-field selector for the most common preference read (theme switching).
export const useBigTextMode = (): boolean =>
  useSessionStore(s => s.preferences.bigTextMode);

// Session progress as a 0–1 float. Returns 0 when no session has started.
export const useSessionProgress = (): number =>
  useSessionStore(s => {
    const { totalDurationSeconds, elapsedSeconds } = s.runtime;
    if (totalDurationSeconds === 0) return 0;
    return Math.min(1, elapsedSeconds / totalDurationSeconds);
  });

// Remaining seconds to display in the timer (already clamped ≥ 0 by tickOnce).
export const useRemainingSeconds = (): number =>
  useSessionStore(s => s.runtime.remainingSeconds);

// Current countdown digit (3, 2, 1, or 0).
export const useCountdownValue = (): number =>
  useSessionStore(s => s.runtime.countdownValue);

// Result snapshot from the last completed or stopped session.
export const useLastResult = (): SessionResult | undefined =>
  useSessionStore(s => s.lastResult);

// True only while the session is actively running (not paused, not idle).
export const useIsRunning = (): boolean =>
  useSessionStore(s => s.runtime.status === 'running');

// True only while the session is paused.
export const useIsPaused = (): boolean =>
  useSessionStore(s => s.runtime.status === 'paused');

// True while a rescue session is active (snapshot is held during rescue).
export const useIsRescueActive = (): boolean =>
  useSessionStore(s => s.rescueSnapshot !== undefined);

// Full Pace catalog object for the currently selected pace.
export const useCurrentPace = (): Pace =>
  useSessionStore(s => getPaceById(s.config.paceId));

// BPM number for the currently selected pace.
export const useCurrentBpm = (): number =>
  useSessionStore(s => getPaceById(s.config.paceId).bpm);
