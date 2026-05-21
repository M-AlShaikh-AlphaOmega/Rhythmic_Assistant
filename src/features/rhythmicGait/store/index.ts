// Public surface for the session store.
// All consumers (screens, hooks, services) import exclusively from this barrel.

export { useSessionStore } from './sessionStore';

export {
  useSessionPhase,
  useSessionConfig,
  useSessionProgress,
  useRemainingSeconds,
  useCountdownValue,
  useLastResult,
  useIsRunning,
  useIsPaused,
  useCurrentPace,
  useCurrentBpm,
} from './selectors';

export { PACES, CUES, DURATIONS, getPaceById, getCueById, toSeconds } from './catalogData';

export type {
  CueId,
  PaceId,
  DurationMinutes,
  RuntimeStatus,
  SessionConfig,
  SessionRuntime,
  SessionResult,
  SessionState,
  Pace,
  Cue,
  DurationOption,
} from './types';
