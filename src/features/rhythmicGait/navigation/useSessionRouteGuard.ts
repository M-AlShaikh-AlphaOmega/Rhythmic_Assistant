import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect } from 'react';

import { RhythmicGaitRoutes, RhythmicGaitParamList } from '../../../shared/constants/routes';

// Contract type for the session state — mirrors SessionRuntime.state from the data model (§8).
// Defined here so TASK 4 can import it when wiring the store.
export type SessionState = 'idle' | 'countdown' | 'running' | 'paused' | 'completed';

type NavProp = NativeStackNavigationProp<RhythmicGaitParamList>;

// NOTE: TASK 3.3 — Route guard contract.
// This hook prevents the user from landing on the wrong screen when the session state
// does not match the current route. Call it at the top of HomeScreen.
//
// Contract for TASK 4 (store integration):
//   1. Import and read `runtime.state` from the Zustand session store.
//   2. Replace the hardcoded 'idle' below with the live store value.
//   3. State → screen mapping:
//      'countdown' → navigate to RhythmicGaitRoutes.Countdown
//      'running'   → navigate to RhythmicGaitRoutes.Running
//      'paused'    → navigate to RhythmicGaitRoutes.Running  (paused is a sub-state of Running screen)
//      'completed' → navigate to RhythmicGaitRoutes.Result
//      'idle'      → no redirect (already on Home)
export function useSessionRouteGuard(): void {
  const navigation = useNavigation<NavProp>();

  // TODO (TASK 4): replace with `useSessionStore(state => state.runtime.state)`
  // Cast to SessionState so TypeScript treats all switch branches as reachable.
  const sessionState = 'idle' as SessionState;

  useEffect(() => {
    switch (sessionState) {
      case 'countdown':
        navigation.navigate(RhythmicGaitRoutes.Countdown);
        break;
      case 'running':
      case 'paused':
        navigation.navigate(RhythmicGaitRoutes.Running);
        break;
      case 'completed':
        navigation.navigate(RhythmicGaitRoutes.Result);
        break;
      default:
        break;
    }
  }, [sessionState, navigation]);
}
