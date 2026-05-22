import { Ionicons } from '@expo/vector-icons';
import React, { ComponentProps } from 'react';
import { Pressable, Text } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

export type DashedActionTileProps = {
  iconName: ComponentProps<typeof Ionicons>['name'];
  label: string;
  onPress: () => void;
};

// Pressable empty-state CTA with a dashed border — used for "Add a trusted contact".
export const DashedActionTile = ({ iconName, label, onPress }: DashedActionTileProps) => {
  const { theme } = useUnistyles();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [styles.tile, pressed && styles.tilePressed]}
    >
      <Ionicons name={iconName} size={18} color={theme.colors.text.secondary} />
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create(theme => ({
  tile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.s2,
    paddingVertical: theme.spacing.s4,
    paddingHorizontal: theme.spacing.s4,
    borderRadius: theme.radius.md,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: theme.colors.border.default,
    backgroundColor: theme.colors.bg.app,
  },
  tilePressed: {
    backgroundColor: theme.colors.border.subtle,
  },
  label: {
    fontSize: theme.typography.size.title,
    fontWeight: theme.typography.weight.medium,
    fontFamily: theme.typography.family.medium,
    color: theme.colors.text.secondary,
  },
}));
