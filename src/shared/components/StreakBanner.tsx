import React from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export type StreakBannerProps = {
  title: string;
  subtitle: string;
  emoji?: string;
};

// Amber tinted card celebrating a walking streak.
// Left: an emoji (defaults to 🔥). Right: bold amber title + secondary subtitle.
export const StreakBanner = ({ title, subtitle, emoji = '🔥' }: StreakBannerProps) => (
  <View style={styles.card} accessibilityRole="text" accessibilityLabel={`${title}. ${subtitle}`}>
    <Text style={styles.emoji}>{emoji}</Text>
    <View style={styles.body}>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <Text style={styles.subtitle} numberOfLines={1}>
        {subtitle}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create(theme => ({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.s3,
    paddingVertical: theme.spacing.s3,
    paddingHorizontal: theme.spacing.s4,
    backgroundColor: theme.colors.warn.pausedSurface,
    borderRadius: theme.radius.md,
  },
  emoji: {
    fontSize: theme.typography.size.h2,
  },
  body: {
    flex: 1,
    gap: theme.spacing.s0,
  },
  title: {
    fontSize: theme.typography.size.body,
    fontWeight: theme.typography.weight.bold,
    fontFamily: theme.typography.family.bold,
    color: theme.colors.warn.paused,
  },
  subtitle: {
    fontSize: theme.typography.size.caption,
    fontWeight: theme.typography.weight.medium,
    fontFamily: theme.typography.family.medium,
    color: theme.colors.warn.paused,
    opacity: 0.85,
  },
}));
