import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useKeepAwake } from 'expo-keep-awake';
import React, { useCallback, useEffect, useRef } from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';

import {
  AudioVisualizer,
  Button,
  CircularProgressTimer,
  ScreenHeader,
} from '../../../shared/components';
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

// Rescue screen — instant start, zero configuration.
// On mount, the rescue session begins immediately via startRescue().
// The user's normal config is snapshotted and restored on reset().
// "I'm OK" exits without a hold-to-confirm — leaving must be easy.
export default function RescueScreen() {
  const navigation = useNavigation<NavProp>();
  const insets = useSafeAreaInsets();
  const phase = useSessionPhase();
  const isPaused = useIsPaused();
  const remaining = useRemainingSeconds();
  const progress = useSessionProgress();
  const startRescue = useSessionStore(s => s.startRescue);
  const pause = useSessionStore(s => s.pause);
  const resume = useSessionStore(s => s.resume);
  const stop = useSessionStore(s => s.stop);
  const reset = useSessionStore(s => s.reset);
  const startedRef = useRef(false);

  useKeepAwake();
  useTimer();
  useCue();
  useSpokenReminders();

  // Kick off the rescue session exactly once on mount.
  useEffect(() => {
    if (!startedRef.current && phase === 'idle') {
      startedRef.current = true;
      startRescue();
    }
  }, [phase, startRescue]);

  // Natural completion: return to Home, restoring user's normal config.
  useEffect(() => {
    if (phase === 'completed') {
      reset();
      navigation.popToTop();
    }
  }, [phase, reset, navigation]);

  const handleExit = useCallback(() => {
    if (phase === 'running' || phase === 'paused') {
      stop();
    }
    reset();
    navigation.popToTop();
  }, [phase, stop, reset, navigation]);

  return (
    <View style={styles.container}>
      <ScreenHeader title={t('rescue.title')} onBack={handleExit} />
      <View style={[styles.content, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.timerBlock}>
          <CircularProgressTimer
            progress={progress}
            timeLabel={formatTime(remaining)}
            active={!isPaused}
            statusLabel={isPaused ? 'Paused' : 'Strong cue'}
          />
          <AudioVisualizer active={!isPaused} />
        </View>

        <View style={styles.actions}>
          <Text style={styles.percentLabel}>{Math.round(progress * 100)}% complete</Text>
          <Button
            variant="primary"
            label={isPaused ? t('rescue.resume') : t('rescue.pause')}
            onPress={isPaused ? resume : pause}
            fullWidth
            testID="rescue-pause"
          />
          <Button
            variant="secondary"
            label={t('rescue.exit')}
            onPress={handleExit}
            fullWidth
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg.app,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.s5,
    justifyContent: 'space-between',
    paddingTop: theme.spacing.s6,
  },
  timerBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.s5,
  },
  actions: {
    gap: theme.spacing.s3,
  },
  percentLabel: {
    fontSize: theme.typography.size.body,
    fontWeight: theme.typography.weight.semibold,
    fontFamily: theme.typography.family.semibold,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
}));
