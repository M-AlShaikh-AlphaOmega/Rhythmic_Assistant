import React from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export type ResultHeroCardProps = {
  emoji: string;
  title: string;
  subtitle: string;
};

// Centered hero section for the session result screen: badge emoji, title, subtitle.
export const ResultHeroCard = ({ emoji, title, subtitle }: ResultHeroCardProps) => (
  <View style={styles.container}>
    <View style={styles.badge}>
      <Text style={styles.emoji}>{emoji}</Text>
    </View>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.subtitle}>{subtitle}</Text>
  </View>
);

const styles = StyleSheet.create(theme => ({
  container: {
    alignItems: 'center',
    gap: theme.spacing.s3,
  },
  badge: {
    width: 72,
    height: 72,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.success.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: theme.typography.size.display,
  },
  title: {
    fontSize: theme.typography.size.h2,
    fontWeight: theme.typography.weight.bold,
    fontFamily: theme.typography.family.bold,
    color: theme.colors.text.primary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: theme.typography.size.body,
    fontWeight: theme.typography.weight.regular,
    fontFamily: theme.typography.family.regular,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
}));
