import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect } from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';

import {
  AudioVisualizer,
  Button,
  CircularProgressTimer,
  CueChip,
  ProgressBar,
  ScreenHeader,
  SectionCard,
  StatusBadge,
} from '../../../shared/components';
import { RhythmicGaitParamList, RhythmicGaitRoutes } from '../../../shared/constants/routes';
import { useCue, useTimer } from '../hooks';
import {
  useCurrentBpm,
  useCurrentPace,
  useIsPaused,
  useIsRunning,
  useRemainingSeconds,
  useSessionConfig,
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

// Running/paused session screen (RA-4).
// Paused is a sub-state of this screen — layout adapts via StatusBadge, caption, and button row.
// Drives the timer via useTimer and cue output via useCue.
// Auto-transitions to Result when session phase becomes 'completed'.
export default function RunningScreen() {
  const navigation = useNavigation<NavProp>();
  const insets = useSafeAreaInsets();
  const phase = useSessionPhase();
  const isRunning = useIsRunning();
  const isPaused = useIsPaused();
  const remainingSeconds = useRemainingSeconds();
  const progress = useSessionProgress();
  const pace = useCurrentPace();
  const bpm = useCurrentBpm();
  const { cue } = useSessionConfig();
  const pause = useSessionStore(s => s.pause);
  const resume = useSessionStore(s => s.resume);
  const stop = useSessionStore(s => s.stop);

  useTimer();
  useCue();

  useEffect(() => {
    if (phase === 'completed') {
      navigation.replace(RhythmicGaitRoutes.Result);
    }
  }, [phase, navigation]);

  const handleStop = useCallback(() => {
    stop();
    // navigation handled by the phase useEffect above
  }, [stop]);

  const caption = isPaused
    ? 'Session paused. Tap Resume when ready.'
    : 'Follow each cue with a comfortable, steady step.';

  const percentComplete = Math.round(progress * 100);

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Rhythmic Gait Assistant"
        // NOTE: back is a no-op — gesture is disabled at the navigator level and
        // there is no safe way to cancel a running session via back.
        onBack={() => {}}
      />
      <View style={styles.content}>
        <SectionCard style={styles.sessionCard}>
          {/* Header row: labels left, status badge right */}
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
              <Text style={styles.overline}>WALKING SESSION</Text>
              <View style={styles.paceRow}>
                <Text style={styles.paceEmoji}>{pace.icon}</Text>
                <Text style={styles.paceLabel}>{pace.label} rhythm</Text>
              </View>
            </View>
            <StatusBadge variant={isPaused ? 'paused' : 'active'} />
          </View>

          {/* Timer ring + cue chip */}
          <View style={styles.timerBlock}>
            <CircularProgressTimer
              progress={progress}
              timeLabel={formatTime(remainingSeconds)}
              active={isRunning}
            />
            <CueChip cue={cue} bpm={bpm} />
          </View>

          {/* Audio visualizer */}
          <AudioVisualizer active={isRunning} />

          {/* Caption */}
          <Text style={styles.caption}>{caption}</Text>
        </SectionCard>

        {/* Button row */}
        <View style={styles.buttonRow}>
          <View style={styles.buttonFlex}>
            {isPaused ? (
              <Button
                variant="secondary"
                iconName="play"
                label="Resume"
                onPress={resume}
                fullWidth
              />
            ) : (
              <Button
                variant="secondary"
                iconName="pause"
                label="Pause"
                onPress={pause}
                fullWidth
              />
            )}
          </View>
          <View style={styles.buttonFlex}>
            <Button
              variant="primary"
              iconName="stop-circle"
              label="Stop"
              onPress={handleStop}
              fullWidth
            />
          </View>
        </View>
      </View>

      {/* Progress bar + label — full-width outside padded content */}
      <View style={[styles.progressFooter, { paddingBottom: insets.bottom + 8 }]}>
        <ProgressBar progress={progress} />
        <Text style={styles.progressLabel}>{percentComplete}% complete</Text>
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
    padding: theme.spacing.s4,
    justifyContent: 'space-between',
    gap: theme.spacing.s4,
  },
  sessionCard: {
    gap: theme.spacing.s4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardHeaderLeft: {
    gap: theme.spacing.s1,
  },
  overline: {
    fontSize: theme.typography.size.overline,
    fontWeight: theme.typography.weight.semibold,
    fontFamily: theme.typography.family.sans,
    color: theme.colors.text.secondary,
    letterSpacing: theme.typography.letterSpacing.overline,
    textTransform: 'uppercase',
  },
  paceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.s2,
  },
  paceEmoji: {
    fontSize: theme.typography.size.title,
  },
  paceLabel: {
    fontSize: theme.typography.size.title,
    fontWeight: theme.typography.weight.semibold,
    fontFamily: theme.typography.family.sans,
    color: theme.colors.text.primary,
  },
  timerBlock: {
    alignItems: 'center',
    gap: theme.spacing.s3,
  },
  caption: {
    fontSize: theme.typography.size.caption,
    fontWeight: theme.typography.weight.regular,
    fontFamily: theme.typography.family.sans,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    lineHeight: theme.typography.size.caption * theme.typography.lineHeight.relaxed,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: theme.spacing.s3,
  },
  buttonFlex: {
    flex: 1,
  },
  progressFooter: {
    paddingHorizontal: theme.spacing.s4,
    paddingTop: theme.spacing.s3,
    gap: theme.spacing.s2,
    backgroundColor: theme.colors.bg.app,
  },
  progressLabel: {
    fontSize: theme.typography.size.caption,
    fontWeight: theme.typography.weight.regular,
    fontFamily: theme.typography.family.sans,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
}));
