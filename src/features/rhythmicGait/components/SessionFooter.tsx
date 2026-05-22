import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

export type SessionFooterProps = {
  overline: string;       // e.g. "Ready to start"
  summary: string;        // e.g. "Steady · 10 min"
  ctaLabel: string;       // e.g. "Start walking"
  onPress: () => void;
};

// Sticky red footer rendered at the bottom of SettingsScreen.
// Left column previews the live session config; right column is the white CTA.
export const SessionFooter = ({ overline, summary, ctaLabel, onPress }: SessionFooterProps) => {
  const { theme } = useUnistyles();
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      <View style={styles.textBlock}>
        <Text style={styles.overline}>{overline}</Text>
        <Text style={styles.summary} numberOfLines={1}>
          {summary}
        </Text>
      </View>
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={ctaLabel}
        style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
      >
        <Ionicons name="play" size={16} color={theme.colors.brand.primary} />
        <Text style={styles.ctaLabel}>{ctaLabel}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.s3,
    paddingHorizontal: theme.spacing.s4,
    paddingTop: theme.spacing.s3,
    backgroundColor: theme.colors.brand.primary,
  },
  textBlock: {
    flex: 1,
    gap: 2,
  },
  overline: {
    fontSize: theme.typography.size.overline,
    fontWeight: theme.typography.weight.semibold,
    fontFamily: theme.typography.family.semibold,
    color: 'rgba(255,255,255,0.75)',
    letterSpacing: theme.typography.letterSpacing.overline,
    textTransform: 'uppercase',
  },
  summary: {
    fontSize: theme.typography.size.title,
    fontWeight: theme.typography.weight.semibold,
    fontFamily: theme.typography.family.semibold,
    color: theme.colors.brand.onPrimary,
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.s2,
    paddingHorizontal: theme.spacing.s4,
    paddingVertical: theme.spacing.s3,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.brand.onPrimary,
  },
  ctaPressed: {
    opacity: 0.9,
  },
  ctaLabel: {
    fontSize: theme.typography.size.button,
    fontWeight: theme.typography.weight.semibold,
    fontFamily: theme.typography.family.semibold,
    color: theme.colors.brand.primary,
  },
}));
