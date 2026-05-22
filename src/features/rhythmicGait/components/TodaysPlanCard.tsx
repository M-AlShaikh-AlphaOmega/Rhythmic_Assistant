import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { PlanStatTile } from '../../../shared/components';
import { t } from '../../../shared/i18n';

export type TodaysPlanCardProps = {
  cueValue: string;
  paceValue: string;
  durationValue: string;
  onAdjust: () => void;
};

// Home "Today's plan" card — green pill + "Same as yesterday" + Adjust action,
// followed by three stat tiles (cue, pace, duration). Pure presentational; the
// caller passes the formatted values from the session config.
export const TodaysPlanCard = ({
  cueValue,
  paceValue,
  durationValue,
  onAdjust,
}: TodaysPlanCardProps) => {
  const { theme } = useUnistyles();

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.pill}>
          <Text style={styles.pillText}>{t('home.plan.title')}</Text>
        </View>
        <Text style={styles.subtitle} numberOfLines={1}>
          {t('home.plan.sameAsYesterday')}
        </Text>
        <Pressable
          onPress={onAdjust}
          accessibilityRole="button"
          accessibilityLabel={t('home.plan.adjust')}
          hitSlop={8}
          style={({ pressed }) => [styles.adjust, pressed && styles.adjustPressed]}
          testID="home-plan-adjust"
        >
          <Ionicons name="options-outline" size={theme.iconSize.sm} color={theme.colors.brand.primary} />
          <Text style={styles.adjustText}>{t('home.plan.adjust')}</Text>
        </Pressable>
      </View>

      <View style={styles.tiles}>
        <PlanStatTile icon="musical-notes-outline" label={t('home.plan.cueLabel')} value={cueValue} />
        <PlanStatTile icon="heart-outline" label={t('home.plan.paceLabel')} value={paceValue} />
        <PlanStatTile icon="time-outline" label={t('home.plan.durationLabel')} value={durationValue} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  card: {
    backgroundColor: theme.colors.bg.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.s4,
    gap: theme.spacing.s4,
    borderWidth: 1,
    borderColor: theme.colors.border.default,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.s2,
  },
  pill: {
    paddingVertical: theme.spacing.s1,
    paddingHorizontal: theme.spacing.s3,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.success.surface,
  },
  pillText: {
    fontSize: theme.typography.size.caption,
    fontWeight: theme.typography.weight.semibold,
    fontFamily: theme.typography.family.semibold,
    color: theme.colors.success.base,
  },
  subtitle: {
    flex: 1,
    fontSize: theme.typography.size.caption,
    fontWeight: theme.typography.weight.medium,
    fontFamily: theme.typography.family.medium,
    color: theme.colors.text.secondary,
  },
  adjust: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.s1,
    paddingVertical: theme.spacing.s1,
  },
  adjustPressed: {
    opacity: 0.6,
  },
  adjustText: {
    fontSize: theme.typography.size.caption,
    fontWeight: theme.typography.weight.semibold,
    fontFamily: theme.typography.family.semibold,
    color: theme.colors.brand.primary,
  },
  tiles: {
    flexDirection: 'row',
    gap: theme.spacing.s2,
  },
}));
