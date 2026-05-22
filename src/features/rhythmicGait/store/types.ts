// Discriminated string unions used as identifiers throughout the feature.
export type CueId = 'audio' | 'vibration' | 'combined';
export type PaceId = 'gentle' | 'steady' | 'energizing';
export type DurationMinutes = 5 | 10 | 15;
export type HapticStrength = 'soft' | 'medium' | 'strong';
export type MoodMarker = 'good' | 'same' | 'hard';

// All possible states the session state machine can be in.
export type RuntimeStatus = 'idle' | 'countdown' | 'running' | 'paused' | 'completed';

// User choices captured on the Settings screen.
export interface SessionConfig {
  cue: CueId;
  paceId: PaceId;
  durationMinutes: DurationMinutes;
  countInEnabled: boolean;
  endChimeEnabled: boolean;
}

// Persistent UX preferences — separate from per-session config.
// Lives alongside config in AsyncStorage; never cleared by reset().
export interface Preferences {
  bigTextMode: boolean;
  volume: number; // 0..1
  hapticStrength: HapticStrength;
  hapticOnTap: boolean;
  emergencyContact?: string;
  lastMood?: MoodMarker;
}

// Live timing and phase data for an active or paused session.
export interface SessionRuntime {
  status: RuntimeStatus;
  startedAt: number | null;
  totalDurationSeconds: number;
  remainingSeconds: number;
  elapsedSeconds: number;
  pausedAt: number | null;
  accumulatedPauseSeconds: number;
  countdownValue: 3 | 2 | 1 | 0;
}

// Snapshot written when a session ends (Stop or natural completion).
export interface SessionResult {
  paceId: PaceId;
  paceLabel: string;
  paceIcon: string;
  cue: CueId;
  durationMinutes: DurationMinutes;
  bpm: number;
  completedAt: number;
  wasFullyCompleted: boolean;
  isRescue: boolean;
}

// Catalog item types — used by catalogData and selectors.
export interface Pace {
  id: PaceId;
  label: string;
  bpm: number;
  description: string;
  rhythmSummary: string;
  icon: string;
}

export interface Cue {
  id: CueId;
  label: string;
  description: string;
  icon: string;
}

export interface DurationOption {
  value: DurationMinutes;
  label: string;
}

// Combined store state shape — implemented by the Zustand store.
export interface SessionState {
  config: SessionConfig;
  preferences: Preferences;
  runtime: SessionRuntime;
  lastResult: SessionResult | undefined;
  // Snapshot of the user's config before a rescue session began.
  // Restored on reset() so rescue never overwrites the user's normal settings.
  rescueSnapshot: SessionConfig | undefined;

  // Actions
  setConfig: (partial: Partial<SessionConfig>) => void;
  setPreferences: (partial: Partial<Preferences>) => void;
  start: () => void;
  startRescue: () => void;
  tickCountdown: () => void;
  startRunning: () => void;
  tickOnce: (nowMs: number) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  complete: () => void;
  reset: () => void;
}
