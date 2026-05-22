import { Ionicons } from '@expo/vector-icons';
import React, { ComponentProps } from 'react';
import { Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

export type MetricTileProps = {
  icon: ComponentProps<typeof Ionicons>['name'];
  label: string;
  value: string;
  unit?: string;
};

// Compact white stat tile — icon + label header, big value + optional small unit below.
// Designed to fill equal width inside a flex-row. Used for the Running screen's
// Steps / Cadence / Distance row and similar metric strips.
export const MetricTile = ({ icon, label, value, unit }: MetricTileProps) => {
  const { theme } = useUnistyles();

  return (
    <View
      style={styles.tile}
      accessibilityRole="text"
      accessibilityLabel={`${label}: ${value}${unit ? ' ' + unit : ''}`}
    >
      <View style={styles.header}>
        <Ionicons
          name={icon}
          size={theme.iconSize.sm}
          color={theme.colors.text.secondary}
        />
        <Text style={styles.label} numberOfLines={1}>
          {label}
        </Text>
      </View>
      <View style={styles.valueRow}>
        <Text style={styles.value} numberOfLines={1}>
          {value}
        </Text>
        {unit !== undefined && (
          <Text style={styles.unit} numberOfLines={1}>
            {unit}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  tile: {
    flex: 1,
    gap: theme.spacing.s1,
    paddingVertical: theme.spacing.s3,
    paddingHorizontal: theme.spacing.s3,
    backgroundColor: theme.colors.bg.surface,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border.default,
    ...theme.shadows.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.s1,
  },
  label: {
    fontSize: theme.typography.size.caption,
    fontWeight: theme.typography.weight.medium,
    fontFamily: theme.typography.family.medium,
    color: theme.colors.text.secondary,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: theme.spacing.s1,
  },
  value: {
    fontSize: theme.typography.size.h2,
    fontWeight: theme.typography.weight.bold,
    fontFamily: theme.typography.family.bold,
    color: theme.colors.text.primary,
  },
  unit: {
    fontSize: theme.typography.size.caption,
    fontWeight: theme.typography.weight.medium,
    fontFamily: theme.typography.family.medium,
    color: theme.colors.text.secondary,
  },
}));
