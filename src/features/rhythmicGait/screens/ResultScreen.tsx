import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Button, ScreenHeader, SectionCard, StatRow } from '../../../shared/components';
import { RhythmicGaitParamList, RhythmicGaitRoutes } from '../../../shared/constants/routes';
import { getAnalytics } from '../../../shared/services/analytics';
import { t } from '../../../shared/i18n';
import {
  getCueById,
  getPaceById,
  useLastResult,
  useSessionConfig,
  useSessionStore,
} from '../store';
import type { MoodMarker } from '../store';

type NavProp = NativeStackNavigationProp<RhythmicGaitParamList>;

const MOOD_CHOICES: { value: MoodMarker; emoji: string; labelKey: 'result.mood.good' | 'result.mood.same' | 'result.mood.hard' }[] = [
  { value: 'good', emoji: '🙂', labelKey: 'result.mood.good' },
  { value: 'same', emoji: '😐', labelKey: 'result.mood.same' },
  { value: 'hard', emoji: '🙁', labelKey: 'result.mood.hard' },
];

// Session result screen — gentle close to a walk.
// Shows a small stat readout and the mood marker. Mood is captured in one tap
// and stored as a preference; it is intentionally never displayed back as a score.
export default function ResultScreen() {
  const navigation = useNavigation<NavProp>();
  const result = useLastResult();
  const config = useSessionConfig();
  const reset = useSessionStore(s => s.reset);
  const setPreferences = useSessionStore(s => s.setPreferences);
  const start = useSessionStore(s => s.start);

  // Guard: if there is no result (unexpected landing), return to Home.
  useEffect(() => {
    if (result === undefined) {
      reset();
      navigation.popToTop();
    }
  }, [result, reset, navigation]);

  const handleDone = useCallback(() => {
    getAnalytics().track('done', {});
    reset();
    navigation.popToTop();
  }, [reset, navigation]);

  const handleMood = useCallback(
    (mood: MoodMarker) => {
      setPreferences({ lastMood: mood });
      getAnalytics().track('mood_marked', { mood });
      reset();
      navigation.popToTop();
    },
    [setPreferences, reset, navigation],
  );

  const handleWalkAgain = useCallback(() => {
    const pace = getPaceById(config.paceId);
    getAnalytics().track('walk_again', {
      paceId: config.paceId,
      cue: config.cue,
      durationMinutes: config.durationMinutes,
      bpm: pace.bpm,
    });
    start();
    if (config.countInEnabled) {
      navigation.navigate(RhythmicGaitRoutes.Countdown);
    } else {
      navigation.navigate(RhythmicGaitRoutes.Running);
    }
  }, [start, config.countInEnabled, config.paceId, config.cue, config.durationMinutes, navigation]);

  if (result === undefined) return null;

  const cueLabel = getCueById(result.cue).label;

  return (
    <View style={styles.container}>
      <ScreenHeader title={t('home.title')} onBack={handleDone} />
      <View style={styles.content}>
        <View style={styles.heroBlock}>
          <Text style={styles.heroTitle}>{t('result.title')}</Text>
          <Text style={styles.heroSubtitle}>{t('result.subtitle')}</Text>
        </View>

        <View style={styles.moodRow}>
          {MOOD_CHOICES.map(choice => (
            <Pressable
              key={choice.value}
              onPress={() => handleMood(choice.value)}
              accessibilityRole="button"
              accessibilityLabel={t(choice.labelKey)}
              style={({ pressed }) => [styles.moodButton, pressed && styles.moodButtonPressed]}
              testID={`mood-${choice.value}`}
            >
              <Text style={styles.moodEmoji}>{choice.emoji}</Text>
              <Text style={styles.moodLabel}>{t(choice.labelKey)}</Text>
            </Pressable>
          ))}
        </View>

        <SectionCard>
          <StatRow
            label="Pace"
            value={`${result.paceIcon} ${result.paceLabel}`}
            showDivider
          />
          <StatRow label="Cue used" value={cueLabel} showDivider />
          <StatRow label="Duration" value={`${result.durationMinutes} min`} showDivider />
          <StatRow label="BPM" value={`${result.bpm} steps/min`} />
        </SectionCard>

        <View style={styles.buttonRow}>
          <View style={styles.buttonFlex}>
            <Button variant="secondary" label={t('result.done')} onPress={handleDone} fullWidth />
          </View>
          <View style={styles.buttonFlex}>
            <Button variant="primary" label={t('result.again')} onPress={handleWalkAgain} fullWidth />
          </View>
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
    padding: theme.spacing.s4,
    gap: theme.spacing.s5,
  },
  heroBlock: {
    alignItems: 'center',
    gap: theme.spacing.s2,
    paddingVertical: theme.spacing.s3,
  },
  heroTitle: {
    fontSize: theme.typography.size.h2,
    fontWeight: theme.typography.weight.bold,
    fontFamily: theme.typography.family.bold,
    color: theme.colors.text.primary,
  },
  heroSubtitle: {
    fontSize: theme.typography.size.body,
    fontWeight: theme.typography.weight.regular,
    fontFamily: theme.typography.family.regular,
    color: theme.colors.text.secondary,
  },
  moodRow: {
    flexDirection: 'row',
    gap: theme.spacing.s3,
    justifyContent: 'space-between',
  },
  moodButton: {
    flex: 1,
    minHeight: 100,
    backgroundColor: theme.colors.bg.surface,
    borderWidth: 1,
    borderColor: theme.colors.border.default,
    borderRadius: theme.radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.s1,
    paddingVertical: theme.spacing.s3,
  },
  moodButtonPressed: {
    opacity: 0.7,
  },
  moodEmoji: {
    fontSize: 40,
  },
  moodLabel: {
    fontSize: theme.typography.size.body,
    fontWeight: theme.typography.weight.medium,
    fontFamily: theme.typography.family.medium,
    color: theme.colors.text.primary,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: theme.spacing.s3,
  },
  buttonFlex: {
    flex: 1,
  },
}));
