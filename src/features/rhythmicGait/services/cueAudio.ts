import { Audio, type AVPlaybackSource } from 'expo-av';

// TODO: replace nulls with require() once audio files are sourced.
// e.g. require('../../../../assets/audio/beat.wav')
const BEAT_SOURCE: AVPlaybackSource | null = null;
const CHIME_SOURCE: AVPlaybackSource | null = null;

// Module-level sound instances — created once, replayed on each beat.
// Using module scope (not React state) avoids re-renders on load completion.
let beatSound: Audio.Sound | null = null;
let chimeSound: Audio.Sound | null = null;

// Configures the audio session and pre-loads both sounds.
// Safe to call multiple times — guards against double-loading.
export const initAudio = async (): Promise<void> => {
  await Audio.setAudioModeAsync({
    playsInSilentModeIOS: false,
    shouldDuckAndroid: true,
  });

  if (BEAT_SOURCE !== null && beatSound === null) {
    try {
      const { sound } = await Audio.Sound.createAsync(BEAT_SOURCE, { shouldPlay: false });
      beatSound = sound;
    } catch {
      // Asset not yet available — beat will be silent until file is added.
    }
  }

  if (CHIME_SOURCE !== null && chimeSound === null) {
    try {
      const { sound } = await Audio.Sound.createAsync(CHIME_SOURCE, { shouldPlay: false });
      chimeSound = sound;
    } catch {
      // Asset not yet available — chime will be silent until file is added.
    }
  }
};

// Replays the beat sound from the start. No-ops if the asset is not loaded.
export const playBeat = (): void => {
  if (beatSound === null) return;
  beatSound.replayAsync().catch(() => {});
};

// Replays the chime sound from the start. No-ops if the asset is not loaded.
export const playChime = (): void => {
  if (chimeSound === null) return;
  chimeSound.replayAsync().catch(() => {});
};

// Unloads both sounds and clears the module-level references.
// Call on unmount to release native audio resources.
export const teardownAudio = async (): Promise<void> => {
  if (beatSound !== null) {
    await beatSound.unloadAsync().catch(() => {});
    beatSound = null;
  }
  if (chimeSound !== null) {
    await chimeSound.unloadAsync().catch(() => {});
    chimeSound = null;
  }
};
