import * as Speech from 'expo-speech';

import { t } from '../../../shared/i18n';
import type { TranslationKey } from '../../../shared/i18n/keys';

// Spoken-cue keys — short phrases announced while the phone is in a pocket.
// Mapped to translation keys so localisation flows through the existing i18n catalog.
export type SpeechKey =
  | 'paused'
  | 'resumed'
  | 'twoMinutesLeft'
  | 'oneMinuteLeft'
  | 'complete';

const KEY_MAP: Record<SpeechKey, TranslationKey> = {
  paused: 'speech.paused',
  resumed: 'speech.resumed',
  twoMinutesLeft: 'speech.twoMinutesLeft',
  oneMinuteLeft: 'speech.oneMinuteLeft',
  complete: 'speech.complete',
};

// Thin wrapper around expo-speech. Speaks the localized phrase for the given key.
// Failures are swallowed intentionally — a missed announcement must never crash a walk.
// NOTE: speech is configured to mix with audio cues, not duck them, so metronome
// playback continues uninterrupted during the spoken phrase.
export const speak = (key: SpeechKey): void => {
  try {
    Speech.speak(t(KEY_MAP[key]), {
      rate: 0.95,
      pitch: 1.0,
    });
  } catch {
    // Intentionally silent — speech is a comfort feature, never a critical path.
  }
};

// Stops any currently-playing speech. Call on session reset / unmount of the session screen.
export const stopSpeech = (): void => {
  try {
    Speech.stop();
  } catch {
    // Intentionally silent.
  }
};
