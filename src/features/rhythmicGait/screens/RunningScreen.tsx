import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useKeepAwake } from 'expo-keep-awake';
import React, { useCallback, useEffect } from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { BigActionButton, HoldToConfirmButton, ProgressBar } from '../../../shared/components';
import { RhythmicGaitParamList, RhythmicGaitRoutes } from '../../../shared/constants/routes';
import { t } from '../../../shared/i18n';
import { useCue, useSpokenReminders, useTimer } from '../hooks';
import {
  useIsPaused,
  useRemainingSeconds,
  useSessionPhase,
  useSessionProgress,
  useSessionStore,
} from '../store';

type NavProp = NativeStackNavigationProp<RhythmicGaitParamList>;

// Formats a seconds value as "MM:SS".
const formatTime = (seconds: number): string => {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

// Running session screen — the surface a user glances at mid-walk.
// Stripped down to a single huge timer, one big Pause/Resume, and a small
// hold-to-confirm "End walk" at the bottom. No visualizer, no cue chip,
// no decorative elements — every pixel earns its place.
// Keeps the screen awake for the duration of the session.
export default function RunningScreen() {
  const navigation = useNavigation<NavProp>();
  const insets = useSafeAreaInsets();
  const { theme } = useUnistyles();
  const phase = useSessionPhase();
  const isPaused = useIsPaused();
  const remainingSeconds = useRemainingSeconds();
  const progress = useSessionProgress();
  const pause = useSessionStore(s => s.pause);
  const resume = useSessionStore(s => s.resume);
  const stop = useSessionStore(s => s.stop);

  useKeepAwake();
  useTimer();
  useCue();
  useSpokenReminders();

  useEffect(() => {
    if (phase === 'completed') {
      navigation.replace(RhythmicGaitRoutes.Result);
    }
  }, [phase, navigation]);

  const handleEnd = useCallback(() => {
    stop();
  }, [stop]);

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + 32, paddingBottom: insets.bottom + 16 },
      ]}
    >
      <View style={styles.timerBlock}>
        <Text style={styles.timer}>{formatTime(remainingSeconds)}</Text>
        {isPaused && <Text style={styles.pausedLabel}>Paused</Text>}
      </View>

      <View style={styles.actions}>
        <View style={styles.progressBlock}>
          <Text style={styles.percentLabel}>{Math.round(progress * 100)}% complete</Text>
          <ProgressBar progress={progress} color={theme.colors.brand.primary} />
        </View>
        <BigActionButton
          variant="primary"
          label={isPaused ? t('running.resume') : t('running.pause')}
          onPress={isPaused ? resume : pause}
          testID="running-pause"
        />
        <HoldToConfirmButton
          label={t('running.end')}
          hint={t('running.endHint')}
          holdDurationMs={2000}
          onConfirm={handleEnd}
          testID="running-end"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg.app,
    paddingHorizontal: theme.spacing.s5,
    justifyContent: 'space-between',
  },
  timerBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.s3,
  },
  timer: {
    fontSize: 120,
    fontWeight: theme.typography.weight.bold,
    fontFamily: theme.typography.family.bold,
    color: theme.colors.text.primary,
    letterSpacing: -3,
  },
  pausedLabel: {
    fontSize: theme.typography.size.h2,
    fontWeight: theme.typography.weight.semibold,
    fontFamily: theme.typography.family.semibold,
    color: theme.colors.warn.paused,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  actions: {
    gap: theme.spacing.s4,
  },
  progressBlock: {
    gap: theme.spacing.s2,
  },
  percentLabel: {
    fontSize: theme.typography.size.body,
    fontWeight: theme.typography.weight.semibold,
    fontFamily: theme.typography.family.semibold,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
}));
