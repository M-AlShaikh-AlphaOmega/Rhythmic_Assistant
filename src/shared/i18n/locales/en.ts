export const strings = {
  assessment: {
    title: 'Assessment',
    start: 'Start',
    stop: 'Stop',
    tremorDetected: 'Tremor detected',
    noTremor: 'No tremor detected',
    dominantFrequency: 'Dominant frequency',
  },
  history: {
    title: 'History',
    empty: 'No assessments yet.',
    loadError: 'Failed to load history.',
  },
  settings: {
    title: 'Settings',
  },
  ble: {
    scanning: 'Scanning…',
    connected: 'Connected',
    disconnected: 'Disconnected',
  },
} as const;

export type Strings = typeof strings;
