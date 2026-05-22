import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import {
  Button,
  Pill,
  ScreenHeader,
  SectionCard,
  SummaryRow,
} from '../../../shared/components';
import { RhythmicGaitParamList, RhythmicGaitRoutes } from '../../../shared/constants/routes';
import { t } from '../../../shared/i18n';
import { getAnalytics } from '../../../shared/services/analytics';
import { emojis } from '../../../theme/icons';
import {
  getCueById,
  getPaceById,
  useLastResult,
  useSessionConfig,
  useSessionStore,
} from '../store';
import type { MoodMarker } from '../store';

type NavProp = NativeStackNavigationProp<RhythmicGaitParamList>;

const MOOD_CHOICES: ReadonlyArray<{
  value: MoodMarker;
  emoji: string;
  labelKey: 'result.mood.good' | 'result.mood.same' | 'result.mood.hard';
}> = [
  { value: 'good', emoji: '🙂', labelKey: 'result.mood.good' },
  { value: 'same', emoji: '😐', labelKey: 'result.mood.same' },
  { value: 'hard', emoji: '🙁', labelKey: 'result.mood.hard' },
];

// Session result screen — gentle close to a walk.
// The user picks a mood (optional) and either dismisses (Done) or starts another
// walk (Walk again). Mood is committed to preferences on confirm, not on tap,
// so accidental presses do not overwrite the most recent intentional mood.
export default function ResultScreen() {
  const navigation = useNavigation<NavProp>();
  const result = useLastResult();
  const config = useSessionConfig();
  const reset = useSessionStore(s => s.reset);
  const setPreferences = useSessionStore(s => s.setPreferences);
  const start = useSessionStore(s => s.start);
  const [selectedMood, setSelectedMood] = useState<MoodMarker | undefined>(undefined);

  // Guard: if there is no result (unexpected landing), return to Home.
  useEffect(() => {
    if (result === undefined) {
      reset();
      navigation.popToTop();
    }
  }, [result, reset, navigation]);

  const commitMood = useCallback(() => {
    if (selectedMood !== undefined) {
      setPreferences({ lastMood: selectedMood });
      getAnalytics().track('mood_marked', { mood: selectedMood });
    }
  }, [selectedMood, setPreferences]);

  const handleDone = useCallback(() => {
    commitMood();
    getAnalytics().track('done', {});
    reset();
    navigation.popToTop();
  }, [commitMood, reset, navigation]);

  const handleWalkAgain = useCallback(() => {
    const pace = getPaceById(config.paceId);
    commitMood();
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
  }, [
    commitMood,
    start,
    config.countInEnabled,
    config.paceId,
    config.cue,
    config.durationMinutes,
    navigation,
  ]);

  if (result === undefined) return null;

  const cueLabel = getCueById(result.cue).label;

  return (
    <View style={styles.container}>
      <ScreenHeader title={t('home.title')} onBack={handleDone} />
      <View style={styles.content}>
        <View style={styles.heroBlock}>
          <Text style={styles.heroTitle}>
            {t('result.title')} <Text style={styles.heroEmoji}>{emojis.sessionComplete}</Text>
          </Text>
          <Text style={styles.heroSubtitle}>{t('result.subtitle')}</Text>
        </View>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionHeader}>{t('result.feelingTitle')}</Text>
          <Text style={styles.sectionHint}>{t('result.tapToSelect')}</Text>
        </View>

        <View style={styles.moodRow}>
          {MOOD_CHOICES.map(choice => (
            <MoodTile
              key={choice.value}
              emoji={choice.emoji}
              label={t(choice.labelKey)}
              selected={selectedMood === choice.value}
              onPress={() => setSelectedMood(choice.value)}
              testID={`mood-${choice.value}`}
            />
          ))}
        </View>

        <Text style={styles.sectionHeader}>{t('result.summaryTitle')}</Text>

        <SectionCard>
          <SummaryRow
            iconName="walk-outline"
            iconTone="red"
            label={t('result.summary.pace')}
            right={<Pill tone="red" label={result.paceLabel} />}
          />
          <SummaryRow
            iconName="musical-notes-outline"
            iconTone="blue"
            label={t('result.summary.cue')}
            right={<Pill tone="blue" label={cueLabel} />}
          />
          <SummaryRow
            iconName="time-outline"
            iconTone="amber"
            label={t('result.summary.duration')}
            right={
              <Text style={styles.rightValue}>
                {`${result.durationMinutes} ${t('result.summary.durationUnit')}`}
              </Text>
            }
          />
          <SummaryRow
            iconName="pulse-outline"
            iconTone="green"
            label={t('result.summary.bpm')}
            showDivider={false}
            right={
              <Text style={styles.rightValue}>
                {`${result.bpm} ${t('result.summary.bpmUnit')}`}
              </Text>
            }
          />
        </SectionCard>

        <View style={styles.buttonRow}>
          <View style={styles.buttonFlex}>
            <Button variant="secondary" label={t('result.done')} onPress={handleDone} fullWidth />
          </View>
          <View style={styles.buttonFlex}>
            <Button
              variant="primary"
              label={t('result.again')}
              onPress={handleWalkAgain}
              fullWidth
            />
          </View>
        </View>
      </View>
    </View>
  );
}

type MoodTileProps = {
  emoji: string;
  label: string;
  selected: boolean;
  onPress: () => void;
  testID?: string;
};

// Single mood tile — large emoji + label, with a red ring + checkmark badge
// when selected. Pure presentation; selection state owned by the parent screen.
const MoodTile = ({ emoji, label, selected, onPress, testID }: MoodTileProps) => {
  const { theme } = useUnistyles();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected }}
      style={({ pressed }) => [
        styles.moodTile,
        selected && styles.moodTileSelected,
        pressed && styles.moodTilePressed,
      ]}
      testID={testID}
    >
      <Text style={styles.moodEmoji}>{emoji}</Text>
      <Text style={[styles.moodLabel, selected && styles.moodLabelSelected]}>{label}</Text>
      {selected && (
        <View style={styles.moodCheck}>
          <Ionicons
            name="checkmark"
            size={theme.iconSize.sm}
            color={theme.colors.brand.onPrimary}
          />
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg.app,
  },
  content: {
    flex: 1,
    padding: theme.spacing.s4,
    gap: theme.spacing.s4,
  },
  heroBlock: {
    alignItems: 'center',
    gap: theme.spacing.s1,
    paddingVertical: theme.spacing.s3,
  },
  heroTitle: {
    fontSize: theme.typography.size.h2,
    fontWeight: theme.typography.weight.bold,
    fontFamily: theme.typography.family.bold,
    color: theme.colors.text.primary,
    textAlign: 'center',
  },
  heroEmoji: {
    fontSize: theme.typography.size.h2,
  },
  heroSubtitle: {
    fontSize: theme.typography.size.body,
    fontWeight: theme.typography.weight.regular,
    fontFamily: theme.typography.family.regular,
    color: theme.colors.text.secondary,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionHeader: {
    fontSize: theme.typography.size.h3,
    fontWeight: theme.typography.weight.bold,
    fontFamily: theme.typography.family.bold,
    color: theme.colors.text.primary,
  },
  sectionHint: {
    fontSize: theme.typography.size.body,
    fontWeight: theme.typography.weight.regular,
    fontFamily: theme.typography.family.regular,
    color: theme.colors.text.secondary,
  },
  moodRow: {
    flexDirection: 'row',
    gap: theme.spacing.s3,
  },
  moodTile: {
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
  moodTileSelected: {
    borderWidth: 2,
    borderColor: theme.colors.brand.primary,
    backgroundColor: theme.colors.brand.primaryTint,
  },
  moodTilePressed: {
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
  moodLabelSelected: {
    color: theme.colors.brand.primary,
    fontWeight: theme.typography.weight.bold,
    fontFamily: theme.typography.family.bold,
  },
  moodCheck: {
    position: 'absolute',
    top: theme.spacing.s2,
    right: theme.spacing.s2,
    width: 22,
    height: 22,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.brand.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightValue: {
    fontSize: theme.typography.size.body,
    fontWeight: theme.typography.weight.bold,
    fontFamily: theme.typography.family.bold,
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
