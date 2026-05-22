import { Ionicons } from '@expo/vector-icons';
import React, { ComponentProps } from 'react';
import { Pressable, Text } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

export type OptionTileProps = {
  iconName: ComponentProps<typeof Ionicons>['name'];
  title: string;
  description: string;
  selected: boolean;
  onPress: () => void;
};

// Pressable vertical tile for cue-type selection (Audio, Vibration, Combined).
export const OptionTile = ({ iconName, title, description, selected, onPress }: OptionTileProps) => {
  const { theme } = useUnistyles();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ selected }}
      style={[styles.container, selected ? styles.selected : styles.default]}
    >
      <Ionicons
        name={iconName}
        size={theme.iconSize.tile}
        color={selected ? theme.colors.accent.info : theme.colors.text.primary}
      />
      <Text style={[styles.title, selected && styles.titleSelected]}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: theme.spacing.s4,
    borderRadius: theme.radius.lg,
    borderWidth: 1.5,
    gap: theme.spacing.s2,
  },
  default: {
    backgroundColor: theme.colors.bg.surface,
    borderColor: theme.colors.border.default,
  },
  selected: {
    backgroundColor: theme.colors.accent.infoSurface,
    borderColor: theme.colors.accent.infoBorder,
  },
  title: {
    fontSize: theme.typography.size.title,
    fontWeight: theme.typography.weight.semibold,
    fontFamily: theme.typography.family.semibold,
    color: theme.colors.text.primary,
    textAlign: 'center',
  },
  titleSelected: {
    color: theme.colors.accent.info,
  },
  description: {
    fontSize: theme.typography.size.caption,
    fontWeight: theme.typography.weight.regular,
    fontFamily: theme.typography.family.regular,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
}));
