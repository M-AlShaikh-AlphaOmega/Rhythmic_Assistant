import { Ionicons } from '@expo/vector-icons';
import React, { ComponentProps } from 'react';
import { Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

export type SummaryRowTone = 'red' | 'blue' | 'amber' | 'green';

export type SummaryRowProps = {
  iconName: ComponentProps<typeof Ionicons>['name'];
  iconTone: SummaryRowTone;
  label: string;
  right: React.ReactNode;
  showDivider?: boolean;
};

const DISC_SIZE = 36;

// Single row used inside a session-summary card.
// Renders a colored circular icon disc on the left, a label in the middle, and a
// caller-supplied right slot (plain text, Pill, etc.). A subtle bottom divider is
// rendered by default — pass `showDivider={false}` on the last row to omit it.
export const SummaryRow = ({
  iconName,
  iconTone,
  label,
  right,
  showDivider = true,
}: SummaryRowProps) => {
  const { theme } = useUnistyles();

  const palette: Record<SummaryRowTone, { bg: string; fg: string }> = {
    red: { bg: theme.colors.brand.primarySurface, fg: theme.colors.brand.primary },
    blue: { bg: theme.colors.accent.infoSurface, fg: theme.colors.accent.info },
    amber: { bg: theme.colors.warn.pausedSurface, fg: theme.colors.warn.paused },
    green: { bg: theme.colors.success.surface, fg: theme.colors.success.base },
  };

  const { bg, fg } = palette[iconTone];

  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        <View style={[styles.disc, { backgroundColor: bg }]}>
          <Ionicons name={iconName} size={theme.iconSize.button} color={fg} />
        </View>
        <Text style={styles.label} numberOfLines={1}>
          {label}
        </Text>
        <View style={styles.right}>{right}</View>
      </View>
      {showDivider && <View style={styles.divider} />}
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  wrapper: {
    gap: theme.spacing.s0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.s3,
    gap: theme.spacing.s3,
  },
  disc: {
    width: DISC_SIZE,
    height: DISC_SIZE,
    borderRadius: theme.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    flex: 1,
    fontSize: theme.typography.size.body,
    fontWeight: theme.typography.weight.medium,
    fontFamily: theme.typography.family.medium,
    color: theme.colors.text.primary,
  },
  right: {
    flexShrink: 0,
    alignItems: 'flex-end',
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border.subtle,
  },
}));
