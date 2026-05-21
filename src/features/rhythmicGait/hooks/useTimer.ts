import { useEffect, useRef } from 'react';
import { AppState, type AppStateStatus } from 'react-native';

import { useSessionPhase, useSessionStore } from '../store';
import type { RuntimeStatus } from '../store';

// Drives the session tick loop at 1 Hz while the session is running.
// Passes Date.now() to tickOnce — drift correction is handled inside the store
// using system-clock deltas, not increment counting.
// The interval is destroyed on pause and recreated on resume via the phase dependency.
// Auto-pauses when the app backgrounds; auto-resumes when it returns to foreground.
export const useTimer = (): void => {
  const phase = useSessionPhase();
  const tickOnce = useSessionStore(s => s.tickOnce);
  const pause = useSessionStore(s => s.pause);
  const resume = useSessionStore(s => s.resume);

  // Keeps the AppState handler's view of phase fresh without re-subscribing on every change.
  const phaseRef = useRef<RuntimeStatus>(phase);
  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  // NOTE: set only when WE auto-paused due to backgrounding — prevents accidental
  // auto-resume of a session the user intentionally paused before backgrounding.
  const pausedByBackground = useRef(false);

  // Tick interval — recreated whenever phase changes so pause kills it and resume restarts it.
  useEffect(() => {
    if (phase !== 'running') return;
    const id = setInterval(() => {
      tickOnce(Date.now());
    }, 1000);
    return () => clearInterval(id);
  }, [phase, tickOnce]);

  // AppState subscription — auto-pause on background, auto-resume on foreground.
  useEffect(() => {
    const handleAppStateChange = (nextState: AppStateStatus): void => {
      if (nextState === 'background' || nextState === 'inactive') {
        if (phaseRef.current === 'running') {
          pausedByBackground.current = true;
          pause();
        }
      } else if (nextState === 'active') {
        if (pausedByBackground.current) {
          pausedByBackground.current = false;
          resume();
        }
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription.remove();
  }, [pause, resume]);
};
