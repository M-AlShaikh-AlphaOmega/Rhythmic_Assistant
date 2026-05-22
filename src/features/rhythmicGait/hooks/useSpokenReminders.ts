import { useEffect, useRef } from 'react';

import { speak } from '../services/cueSpeech';
import { useRemainingSeconds, useSessionPhase } from '../store';

// Fires one-shot spoken reminders during an active session when the remaining
// time crosses 2:00 and 1:00. Refs prevent re-firing on every tick. Resets when
// the session leaves the running state (idle / countdown / completed).
export const useSpokenReminders = (): void => {
  const phase = useSessionPhase();
  const remaining = useRemainingSeconds();
  const firedRef = useRef({ twoMin: false, oneMin: false });

  useEffect(() => {
    if (phase === 'idle' || phase === 'countdown' || phase === 'completed') {
      firedRef.current = { twoMin: false, oneMin: false };
    }
  }, [phase]);

  useEffect(() => {
    if (phase !== 'running') return;
    if (remaining <= 120 && remaining > 60 && !firedRef.current.twoMin) {
      firedRef.current.twoMin = true;
      speak('twoMinutesLeft');
    }
    if (remaining <= 60 && remaining > 0 && !firedRef.current.oneMin) {
      firedRef.current.oneMin = true;
      speak('oneMinuteLeft');
    }
  }, [remaining, phase]);
};
