// Public surface for the session store.
// All consumers (screens, hooks, services) import exclusively from this barrel.

export { useSessionStore } from './sessionStore';

export {
  useSessionPhase,
  useSessionConfig,
  usePreferences,
  useBigTextMode,
  useSessionProgress,
  useRemainingSeconds,
  useCountdownValue,
  useLastResult,
  useIsRunning,
  useIsPaused,
  useIsRescueActive,
  useCurrentPace,
  useCurrentBpm,
} from './selectors';

export { PACES, CUES, DURATIONS, getPaceById, getCueById, toSeconds } from './catalogData';

export type {
  CueId,
  PaceId,
  DurationMinutes,
  HapticStrength,
  MoodMarker,
  RuntimeStatus,
  SessionConfig,
  SessionRuntime,
  SessionResult,
  SessionState,
  Preferences,
  Pace,
  Cue,
  DurationOption,
} from './types';
