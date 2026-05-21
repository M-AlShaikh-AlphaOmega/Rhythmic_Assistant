import { useEffect } from 'react';

import { useSessionPhase, useSessionStore } from '../store';

// Drives the 3-second countdown by calling tickCountdown at 1 Hz.
// Active only while phase === 'countdown'; cleans up automatically on phase change.
export const useCountdown = (): void => {
  const phase = useSessionPhase();
  const tickCountdown = useSessionStore(s => s.tickCountdown);

  useEffect(() => {
    if (phase !== 'countdown') return;
    const id = setInterval(() => {
      tickCountdown();
    }, 1000);
    return () => clearInterval(id);
  }, [phase, tickCountdown]);
};
