import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { WeekBars, WeekBarState } from '../../../shared/components';

export type StreakCardProps = {
  title: string;
  subtitle: string;
  bars: WeekBarState[];
};

// Home streak card — amber-circle flame icon on the left, title + subtitle in
// the middle, week-bar visualization on the right. Pure presentational.
export const StreakCard = ({ title, subtitle, bars }: StreakCardProps) => {
  const { theme } = useUnistyles();

  return (
    <View style={styles.card}>
      <View style={styles.iconCircle}>
        <Ionicons name="flame" size={theme.iconSize.button} color={theme.colors.warn.paused} />
      </View>

      <View style={styles.text}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={2}>
          {subtitle}
        </Text>
      </View>

      <WeekBars bars={bars} />
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.s3,
    backgroundColor: theme.colors.bg.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.s4,
    borderWidth: 1,
    borderColor: theme.colors.border.default,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.warn.pausedSurface,
  },
  text: {
    flex: 1,
    gap: theme.spacing.s1,
  },
  title: {
    fontSize: theme.typography.size.h3,
    fontWeight: theme.typography.weight.bold,
    fontFamily: theme.typography.family.bold,
    color: theme.colors.text.primary,
  },
  subtitle: {
    fontSize: theme.typography.size.caption,
    fontWeight: theme.typography.weight.medium,
    fontFamily: theme.typography.family.medium,
    color: theme.colors.text.secondary,
  },
}));
