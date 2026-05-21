import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback } from 'react';

import { RhythmicGaitRoutes, RhythmicGaitParamList } from '../../../shared/constants/routes';
import { useSessionStore } from '../store';

type NavProp = NativeStackNavigationProp<RhythmicGaitParamList>;

// Defensive route guard for HomeScreen.
// Reads the current session phase when HomeScreen gains focus and redirects
// to the correct screen if a session is already in progress.
// Forward navigation (Start walking, Walk again) is handled imperatively in screen button
// handlers — this guard is only for the edge case of landing on Home mid-session.
export function useSessionRouteGuard(): void {
  const navigation = useNavigation<NavProp>();

  useFocusEffect(
    useCallback(() => {
      const phase = useSessionStore.getState().runtime.status;
      switch (phase) {
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
    }, [navigation])
  );
}
