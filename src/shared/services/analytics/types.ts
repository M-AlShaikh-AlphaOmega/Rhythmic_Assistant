import type { CueId, PaceId } from '../../../features/rhythmicGait/store';

// Telemetry event catalog for the rhythmic-gait session flow (RGA-031).
export type AnalyticsEventName =
  | 'session_started'
  | 'session_paused'
  | 'session_resumed'
  | 'session_stopped'
  | 'session_completed'
  | 'walk_again'
  | 'done';

type SessionContext = {
  paceId: PaceId;
  cue: CueId;
  durationMinutes: number;
  bpm: number;
};

type ProgressContext = {
  elapsedSeconds: number;
  remainingSeconds: number;
};

// Typed payload per event — enforces required fields at the call site.
export type AnalyticsEventPayload = {
  session_started: SessionContext;
  session_paused: SessionContext & ProgressContext;
  session_resumed: SessionContext & ProgressContext;
  session_stopped: SessionContext & ProgressContext & { wasFullyCompleted: false };
  session_completed: SessionContext;
  walk_again: SessionContext;
  done: Record<string, never>;
};

// Contract for any analytics backend (console logger, PostHog, Amplitude, etc.).
export interface AnalyticsService {
  track<E extends AnalyticsEventName>(event: E, payload: AnalyticsEventPayload[E]): void;
}
