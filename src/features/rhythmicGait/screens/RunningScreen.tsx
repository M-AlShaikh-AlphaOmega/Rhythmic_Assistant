import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useKeepAwake } from 'expo-keep-awake';
import React, { useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';

import {
  BpmAudioCueCard,
  Button,
  CircularProgressTimer,
  HoldToConfirmButton,
  MetricTile,
  SessionStatusHeader,
} from '../../../shared/components';
import { RhythmicGaitParamList, RhythmicGaitRoutes } from '../../../shared/constants/routes';
import { t } from '../../../shared/i18n';
import type { TranslationKey } from '../../../shared/i18n/keys';
import { useCue, useSpokenReminders, useTimer } from '../hooks';
import {
  useCurrentPace,
  useIsPaused,
  useRemainingSeconds,
  useSessionConfig,
  useSessionPhase,
  useSessionStore,
} from '../store';
import type { CueId } from '../store';

type NavProp = NativeStackNavigationProp<RhythmicGaitParamList>;

// Formats a seconds value as "MM:SS".
const formatTime = (seconds: number): string => {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

// Maps a cue identifier to the running-screen cue label key.
const cueLabelKey = (cue: CueId): TranslationKey => {
  switch (cue) {
    case 'audio':
      return 'running.cueAudio';
    case 'vibration':
      return 'running.cueVibration';
    case 'combined':
      return 'running.cueCombined';
  }
};

// Placeholder live metrics — Steps, Cadence, Distance, In-sync are not tracked by
// the store yet. Held as constants here so a follow-up task can swap them for
// real selectors in a single, obvious place.
const PLACEHOLDER_STEPS = '412';
const PLACEHOLDER_CADENCE = '95';
const PLACEHOLDER_DISTANCE = '0.3';
const PLACEHOLDER_IN_SYNC = true;

// Running session screen — primary surface for the mid-walk experience.
// Status header → elapsed-style circular timer → BPM + audio-cue card →
// Steps/Cadence/Distance tiles → big Pause/Resume → hold-to-confirm End walk.
// Keeps the screen awake for the duration of the session.
export default function RunningScreen() {
  const navigation = useNavigation<NavProp>();
  const insets = useSafeAreaInsets();
  const phase = useSessionPhase();
  const isPaused = useIsPaused();
  const remainingSeconds = useRemainingSeconds();
  const totalDurationSeconds = useSessionStore(s => s.runtime.totalDurationSeconds);
  const elapsedSeconds = useSessionStore(s => s.runtime.elapsedSeconds);
  const pace = useCurrentPace();
  const config = useSessionConfig();
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

  const progress = totalDurationSeconds === 0 ? 0 : elapsedSeconds / totalDurationSeconds;
  const percentDone = Math.round(progress * 100);
  const bpmLabel = `${pace.bpm} ${t('running.bpm')}`;
  const subtitle =
    `${t('running.elapsedOf')} ${formatTime(totalDurationSeconds)} · ` +
    `${percentDone}% ${t('running.elapsedDone')}`;
  const pillLabel = `${formatTime(remainingSeconds)} ${t('running.timeLeft')}`;

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 16 },
      ]}
    >
      <View style={styles.content}>
        <SessionStatusHeader
          activity={t('running.activity')}
          paceLabel={pace.label}
          bpmLabel={bpmLabel}
          inSync={PLACEHOLDER_IN_SYNC}
          inSyncLabel={t('running.inSync')}
        />

        <View style={styles.timerBlock}>
          <CircularProgressTimer
            progress={progress}
            timeLabel={formatTime(elapsedSeconds)}
            active={!isPaused}
            topLabel={t('running.elapsedLabel')}
            subtitle={subtitle}
            pillLabel={pillLabel}
          />
        </View>

        <BpmAudioCueCard
          bpm={pace.bpm}
          bpmUnit={t('running.bpm')}
          cueLabel={t(cueLabelKey(config.cue))}
          cueHint={t('running.cueHint')}
          active={!isPaused}
        />

        <View style={styles.metricsRow}>
          <MetricTile
            icon="footsteps-outline"
            label={t('running.steps')}
            value={PLACEHOLDER_STEPS}
          />
          <MetricTile
            icon="pulse-outline"
            label={t('running.cadence')}
            value={PLACEHOLDER_CADENCE}
            unit={t('running.cadenceUnit')}
          />
          <MetricTile
            icon="trail-sign-outline"
            label={t('running.distance')}
            value={PLACEHOLDER_DISTANCE}
            unit={t('running.distanceUnit')}
          />
        </View>
      </View>

      <View style={styles.actions}>
        <Button
          variant="primary"
          label={isPaused ? t('running.resume') : t('running.pause')}
          iconName={isPaused ? 'play' : 'pause'}
          onPress={isPaused ? resume : pause}
          fullWidth
          testID="running-pause"
        />
        <HoldToConfirmButton
          label={t('running.end')}
          hint={t('running.endHint')}
          holdDurationMs={1000}
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
    paddingHorizontal: theme.spacing.s4,
    gap: theme.spacing.s3,
  },
  content: {
    flex: 1,
    gap: theme.spacing.s3,
  },
  timerBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.s2,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: theme.spacing.s3,
  },
  actions: {
    gap: theme.spacing.s3,
  },
}));
