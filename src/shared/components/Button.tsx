import { Ionicons } from '@expo/vector-icons';
import React, { ComponentProps } from 'react';
import { Pressable, Text } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

export type ButtonProps = {
  variant?: 'primary' | 'secondary';
  label: string;
  onPress: () => void;
  disabled?: boolean;
  iconName?: ComponentProps<typeof Ionicons>['name'];
  fullWidth?: boolean;
};

// Reusable button for all CTA surfaces: primary (red filled) and secondary (outlined).
// Supports optional Ionicons leading icon, full-width layout, and disabled state.
export const Button = ({
  variant = 'primary',
  label,
  onPress,
  disabled = false,
  iconName,
  fullWidth = false,
}: ButtonProps) => {
  const { theme } = useUnistyles();

  const iconColor =
    disabled
      ? theme.colors.text.disabled
      : variant === 'primary'
        ? theme.colors.brand.onPrimary
        : theme.colors.text.primary;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        styles.base,
        variant === 'primary' ? styles.primary : styles.secondary,
        pressed && !disabled && variant === 'primary' && styles.primaryPressed,
        pressed && !disabled && variant === 'secondary' && styles.secondaryPressed,
        disabled && variant === 'primary' && styles.primaryDisabled,
        disabled && variant === 'secondary' && styles.secondaryDisabled,
        fullWidth && styles.fullWidth,
      ]}
    >
      {iconName !== undefined && (
        <Ionicons name={iconName} size={theme.iconSize.button} color={iconColor} />
      )}
      <Text
        style={[
          styles.label,
          variant === 'primary' ? styles.labelPrimary : styles.labelSecondary,
          disabled && styles.labelDisabled,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create(theme => ({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
    paddingVertical: theme.spacing.s3,
    paddingHorizontal: theme.spacing.s5,
    borderRadius: theme.radius.md,
    gap: theme.spacing.s2,
  },
  primary: {
    backgroundColor: theme.colors.brand.primary,
    ...theme.shadows.md,
  },
  primaryPressed: {
    backgroundColor: theme.colors.brand.primaryPressed,
  },
  primaryDisabled: {
    backgroundColor: theme.colors.brand.primaryDisabled,
    ...theme.shadows.none,
  },
  secondary: {
    backgroundColor: theme.colors.bg.surface,
    borderWidth: 1,
    borderColor: theme.colors.border.default,
  },
  secondaryPressed: {
    opacity: 0.8,
  },
  secondaryDisabled: {
    borderColor: theme.colors.border.subtle,
  },
  fullWidth: {
    width: '100%',
  },
  label: {
    fontSize: theme.typography.size.button,
    fontWeight: theme.typography.weight.semibold,
    fontFamily: theme.typography.family.semibold,
  },
  labelPrimary: {
    color: theme.colors.brand.onPrimary,
  },
  labelSecondary: {
    color: theme.colors.text.primary,
  },
  labelDisabled: {
    color: theme.colors.text.disabled,
  },
}));
