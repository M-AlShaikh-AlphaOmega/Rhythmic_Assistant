import type { CueId, Cue, DurationMinutes, DurationOption, Pace, PaceId } from './types';

// Static pace catalog — matches §8 of the planning document.
export const PACES: readonly Pace[] = [
  {
    id: 'gentle',
    label: 'Gentle',
    bpm: 72,
    description: 'Soft, slow — perfect for easy starts',
    rhythmSummary: 'Calm pentatonic melody at 72 BPM',
    icon: '🍃',
  },
  {
    id: 'steady',
    label: 'Steady',
    bpm: 96,
    description: 'A comfortable everyday walking rhythm',
    rhythmSummary: 'Warm major-scale rhythm at 96 BPM',
    icon: '💙',
  },
  {
    id: 'energizing',
    label: 'Energizing',
    bpm: 120,
    description: 'Upbeat and brisk — for when you feel energised',
    rhythmSummary: 'Uplifting ascending beat at 120 BPM',
    icon: '🔥',
  },
] as const;

// Static cue catalog.
export const CUES: readonly Cue[] = [
  {
    id: 'audio',
    label: 'Audio',
    description: 'Rhythmic tones guide your steps',
    icon: 'music-note',
  },
  {
    id: 'vibration',
    label: 'Vibration',
    description: 'Gentle pulses through your device',
    icon: 'vibrate',
  },
  {
    id: 'combined',
    label: 'Combined',
    description: 'Audio and vibration together',
    icon: 'layers',
  },
] as const;

// Static duration options.
export const DURATIONS: readonly DurationOption[] = [
  { value: 5, label: '5 min' },
  { value: 10, label: '10 min' },
  { value: 15, label: '15 min' },
] as const;

// Returns the Pace for a given id. Throws in dev if the id is invalid.
export const getPaceById = (id: PaceId): Pace => {
  const pace = PACES.find(p => p.id === id);
  if (!pace) {
    throw new Error(`[catalogData] Unknown pace id: "${id}"`);
  }
  return pace;
};

// Returns the Cue for a given id. Throws in dev if the id is invalid.
export const getCueById = (id: CueId): Cue => {
  const cue = CUES.find(c => c.id === id);
  if (!cue) {
    throw new Error(`[catalogData] Unknown cue id: "${id}"`);
  }
  return cue;
};

// Returns the duration in seconds for a given DurationMinutes value.
export const toSeconds = (minutes: DurationMinutes): number => minutes * 60;
