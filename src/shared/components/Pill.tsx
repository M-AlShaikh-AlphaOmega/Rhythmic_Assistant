import React from 'react';
import { Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

export type PillTone = 'red' | 'blue' | 'amber' | 'green' | 'neutral';

export type PillProps = {
  tone?: PillTone;
  label: string;
};

// Small tinted chip used to surface short categorical values (e.g. "Gentle", "Audio").
// Tone selects a paired background + foreground from the semantic palette.
export const Pill = ({ tone = 'neutral', label }: PillProps) => {
  const { theme } = useUnistyles();

  const palette: Record<PillTone, { bg: string; fg: string }> = {
    red: { bg: theme.colors.brand.primarySurface, fg: theme.colors.brand.primary },
    blue: { bg: theme.colors.accent.infoSurface, fg: theme.colors.accent.info },
    amber: { bg: theme.colors.warn.pausedSurface, fg: theme.colors.warn.paused },
    green: { bg: theme.colors.success.surface, fg: theme.colors.success.base },
    neutral: { bg: theme.colors.border.subtle, fg: theme.colors.text.secondary },
  };

  const { bg, fg } = palette[tone];

  return (
    <View style={[styles.pill, { backgroundColor: bg }]} accessibilityRole="text">
      <Text style={[styles.label, { color: fg }]} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  pill: {
    alignSelf: 'flex-start',
    paddingVertical: theme.spacing.s1,
    paddingHorizontal: theme.spacing.s3,
    borderRadius: theme.radius.full,
  },
  label: {
    fontSize: theme.typography.size.caption,
    fontWeight: theme.typography.weight.semibold,
    fontFamily: theme.typography.family.semibold,
  },
}));
