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
// Rescue-aware: if a rescue session is active (snapshot exists), redirects to
// Rescue rather than the normal Running screen.
export function useSessionRouteGuard(): void {
  const navigation = useNavigation<NavProp>();

  useFocusEffect(
    useCallback(() => {
      const state = useSessionStore.getState();
      const phase = state.runtime.status;
      const isRescueActive = state.rescueSnapshot !== undefined;
      switch (phase) {
        case 'countdown':
          navigation.navigate(RhythmicGaitRoutes.Countdown);
          break;
        case 'running':
        case 'paused':
          navigation.navigate(
            isRescueActive ? RhythmicGaitRoutes.Rescue : RhythmicGaitRoutes.Running,
          );
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
