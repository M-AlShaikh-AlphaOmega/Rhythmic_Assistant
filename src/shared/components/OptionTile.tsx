import { Ionicons } from '@expo/vector-icons';
import React, { ComponentProps } from 'react';
import { Pressable, Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

export type OptionTileProps = {
  iconName: ComponentProps<typeof Ionicons>['name'];
  title: string;
  description: string;
  selected: boolean;
  onPress: () => void;
};

// Pressable vertical tile for cue-type selection (Audio, Vibration, Combined).
// Selected state uses the brand-red soft theme and shows a small check badge top-right.
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
      {selected && (
        <View style={styles.checkBadge}>
          <Ionicons name="checkmark" size={12} color={theme.colors.brand.onPrimary} />
        </View>
      )}
      <Ionicons
        name={iconName}
        size={theme.iconSize.tile}
        color={selected ? theme.colors.brand.primary : theme.colors.text.primary}
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
    borderRadius: theme.radius.md,
    borderWidth: 1.5,
    gap: theme.spacing.s2,
  },
  default: {
    backgroundColor: theme.colors.bg.surface,
    borderColor: theme.colors.border.default,
  },
  selected: {
    backgroundColor: theme.colors.brand.primarySoft,
    borderColor: theme.colors.brand.primarySoftBorder,
  },
  checkBadge: {
    position: 'absolute',
    top: theme.spacing.s2,
    right: theme.spacing.s2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: theme.colors.brand.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: theme.typography.size.title,
    fontWeight: theme.typography.weight.semibold,
    fontFamily: theme.typography.family.semibold,
    color: theme.colors.text.primary,
    textAlign: 'center',
  },
  titleSelected: {
    color: theme.colors.brand.primary,
  },
  description: {
    fontSize: theme.typography.size.caption,
    fontWeight: theme.typography.weight.regular,
    fontFamily: theme.typography.family.regular,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
}));
