import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

export type SettingsSummaryChipProps = {
  primary: string;   // e.g. "Steady · 96 BPM · 10 min"
  secondary: string; // e.g. "Audio cue · High volume · Strong buzz"
};

// Translucent chip rendered inside the red header band on SettingsScreen.
// Shows a live two-line summary of the user's current session configuration.
export const SettingsSummaryChip = ({ primary, secondary }: SettingsSummaryChipProps) => {
  const { theme } = useUnistyles();
  return (
    <View style={styles.chip} accessibilityRole="text" accessibilityLabel={`${primary}. ${secondary}`}>
      <View style={styles.iconWrap}>
        <Ionicons name="walk" size={20} color={theme.colors.brand.onPrimary} />
      </View>
      <View style={styles.textBlock}>
        <Text style={styles.primary} numberOfLines={1}>
          {primary}
        </Text>
        <Text style={styles.secondary} numberOfLines={1}>
          {secondary}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.s3,
    paddingVertical: theme.spacing.s3,
    paddingHorizontal: theme.spacing.s4,
    borderRadius: theme.radius.md,
    backgroundColor: 'rgba(255, 255, 255, 0.14)',
  },
  iconWrap: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBlock: {
    flex: 1,
    gap: 2,
  },
  primary: {
    fontSize: theme.typography.size.title,
    fontWeight: theme.typography.weight.semibold,
    fontFamily: theme.typography.family.semibold,
    color: theme.colors.brand.onPrimary,
  },
  secondary: {
    fontSize: theme.typography.size.caption,
    fontWeight: theme.typography.weight.regular,
    fontFamily: theme.typography.family.regular,
    color: 'rgba(255, 255, 255, 0.85)',
  },
}));
