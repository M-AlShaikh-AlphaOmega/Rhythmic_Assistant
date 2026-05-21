import { useEffect } from 'react';

import {
  useCurrentBpm,
  useIsRunning,
  useSessionConfig,
  useSessionPhase,
} from '../store';
import { fireBeatHaptic } from '../services/cueHaptic';
import { initAudio, playBeat, playChime, teardownAudio } from '../services/cueAudio';

// Drives the cue output (audio and/or haptic) in sync with the session BPM.
// A single interval fires both audio and haptic for Combined mode so they never drift apart.
// Plays the end chime once when the session reaches 'completed' if the preference is enabled.
export const useCue = (): void => {
  const { cue, endChimeEnabled } = useSessionConfig();
  const bpm = useCurrentBpm();
  const isRunning = useIsRunning();
  const status = useSessionPhase();

  // Load audio resources once on mount; release on unmount.
  useEffect(() => {
    initAudio();
    return () => {
      teardownAudio();
    };
  }, []);

  // Beat interval — recreated when isRunning or bpm changes.
  // Cleared on pause/stop (isRunning becomes false); restarted on resume.
  useEffect(() => {
    if (!isRunning) return;

    const intervalMs = Math.round(60000 / bpm);
    const id = setInterval(() => {
      if (cue === 'audio' || cue === 'combined') playBeat();
      if (cue === 'vibration' || cue === 'combined') fireBeatHaptic();
    }, intervalMs);

    return () => clearInterval(id);
  }, [isRunning, bpm, cue]);

  // End chime — fires once when the session transitions to 'completed'.
  useEffect(() => {
    if (status === 'completed' && endChimeEnabled) {
      playChime();
    }
  }, [status, endChimeEnabled]);
};
