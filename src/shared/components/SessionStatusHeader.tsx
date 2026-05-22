import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

export type SessionStatusHeaderProps = {
  activity: string;
  paceLabel: string;
  bpmLabel: string;
  inSync: boolean;
  inSyncLabel: string;
};

// Top-of-screen status row for the Running screen.
// Renders a red dot + bold activity (e.g. "Walking"), middot-separated meta
// (pace label, BPM string), and an "In sync" pill badge on the right.
export const SessionStatusHeader = ({
  activity,
  paceLabel,
  bpmLabel,
  inSync,
  inSyncLabel,
}: SessionStatusHeaderProps) => {
  const { theme } = useUnistyles();

  return (
    <View style={styles.card} accessibilityRole="header">
      <View style={styles.left}>
        <View style={styles.dot} />
        <Text style={styles.activity} numberOfLines={1}>
          {activity}
        </Text>
        <Text style={styles.meta} numberOfLines={1}>
          {` · ${paceLabel} · ${bpmLabel}`}
        </Text>
      </View>
      {inSync && (
        <View style={styles.syncPill} accessibilityLabel={inSyncLabel}>
          <Ionicons
            name="checkmark"
            size={theme.iconSize.sm}
            color={theme.colors.success.base}
          />
          <Text style={styles.syncLabel}>{inSyncLabel}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.bg.surface,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border.default,
    paddingVertical: theme.spacing.s3,
    paddingHorizontal: theme.spacing.s4,
    gap: theme.spacing.s3,
    ...theme.shadows.sm,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.brand.primary,
    marginRight: theme.spacing.s2,
  },
  activity: {
    fontSize: theme.typography.size.title,
    fontWeight: theme.typography.weight.bold,
    fontFamily: theme.typography.family.bold,
    color: theme.colors.text.primary,
  },
  meta: {
    flexShrink: 1,
    fontSize: theme.typography.size.body,
    fontWeight: theme.typography.weight.medium,
    fontFamily: theme.typography.family.medium,
    color: theme.colors.text.secondary,
  },
  syncPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.s1,
    paddingVertical: theme.spacing.s1,
    paddingHorizontal: theme.spacing.s3,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.success.surface,
  },
  syncLabel: {
    fontSize: theme.typography.size.caption,
    fontWeight: theme.typography.weight.semibold,
    fontFamily: theme.typography.family.semibold,
    color: theme.colors.success.base,
  },
}));
