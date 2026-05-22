import { Ionicons } from '@expo/vector-icons';
import React, { ComponentProps } from 'react';
import { Pressable, Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

export type QuickActionTileVariant = 'primary' | 'default';

export type QuickActionTileProps = {
  icon: ComponentProps<typeof Ionicons>['name'];
  label: string;
  onPress?: () => void;
  variant?: QuickActionTileVariant;
  disabled?: boolean;
  testID?: string;
};

// Bottom-row action tile on the Home screen. White card with a centered icon
// above a label. `variant: 'primary'` paints the icon and label in brand red
// (used for the prominent "Help me start" action).
export const QuickActionTile = ({
  icon,
  label,
  onPress,
  variant = 'default',
  disabled = false,
  testID,
}: QuickActionTileProps) => {
  const { theme } = useUnistyles();

  const isPrimary = variant === 'primary';
  const isDisabled = disabled || onPress === undefined;

  const contentColor = isDisabled
    ? theme.colors.text.disabled
    : isPrimary
      ? theme.colors.brand.primary
      : theme.colors.text.primary;

  const Container = isDisabled ? View : Pressable;
  const containerProps = isDisabled
    ? { style: [styles.tile, styles.tileDisabled] }
    : {
        onPress,
        accessibilityRole: 'button' as const,
        accessibilityLabel: label,
        testID,
        style: ({ pressed }: { pressed: boolean }) => [
          styles.tile,
          pressed && styles.tilePressed,
        ],
      };

  return (
    <Container {...containerProps}>
      <Ionicons name={icon} size={theme.iconSize.button} color={contentColor} />
      <Text style={[styles.label, { color: contentColor }]} numberOfLines={1}>
        {label}
      </Text>
    </Container>
  );
};

const styles = StyleSheet.create(theme => ({
  tile: {
    flex: 1,
    minHeight: 72,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.s2,
    paddingVertical: theme.spacing.s3,
    paddingHorizontal: theme.spacing.s2,
    backgroundColor: theme.colors.bg.surface,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border.default,
  },
  tilePressed: {
    backgroundColor: theme.colors.border.subtle,
  },
  tileDisabled: {
    opacity: 0.55,
  },
  label: {
    fontSize: theme.typography.size.body,
    fontWeight: theme.typography.weight.semibold,
    fontFamily: theme.typography.family.semibold,
    textAlign: 'center',
  },
}));
