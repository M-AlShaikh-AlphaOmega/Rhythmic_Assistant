import { Ionicons } from '@expo/vector-icons';
import React, { ComponentProps } from 'react';
import { Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

export type PlanStatTileProps = {
  icon: ComponentProps<typeof Ionicons>['name'];
  label: string;
  value: string;
};

// Compact tile used in the Home "Today's plan" card — light-red surface with a
// centered icon, small caption label, and a bold value beneath it.
export const PlanStatTile = ({ icon, label, value }: PlanStatTileProps) => {
  const { theme } = useUnistyles();

  return (
    <View style={styles.tile} accessibilityRole="text" accessibilityLabel={`${label}: ${value}`}>
      <Ionicons name={icon} size={theme.iconSize.button} color={theme.colors.brand.primary} />
      <Text style={styles.label} numberOfLines={1}>
        {label}
      </Text>
      <Text style={styles.value} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  tile: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.s1,
    paddingVertical: theme.spacing.s3,
    paddingHorizontal: theme.spacing.s2,
    backgroundColor: theme.colors.brand.primarySoft,
    borderRadius: theme.radius.md,
  },
  label: {
    fontSize: theme.typography.size.caption,
    fontWeight: theme.typography.weight.medium,
    fontFamily: theme.typography.family.medium,
    color: theme.colors.text.secondary,
  },
  value: {
    fontSize: theme.typography.size.title,
    fontWeight: theme.typography.weight.bold,
    fontFamily: theme.typography.family.bold,
    color: theme.colors.text.primary,
  },
}));
