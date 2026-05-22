import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export type BigActionButtonVariant = 'primary' | 'rescue';

export type BigActionButtonProps = {
  variant?: BigActionButtonVariant;
  label: string;
  subLabel?: string;
  onPress: () => void;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  testID?: string;
};

// Oversized home action button — ~160dp minimum height, full width.
// Two variants: `primary` (brand-filled, Start walk) and `rescue` (warm calm, Help me start).
// Used only on the Home screen; everywhere else uses the standard `Button`.
export const BigActionButton = ({
  variant = 'primary',
  label,
  subLabel,
  onPress,
  accessibilityLabel,
  accessibilityHint,
  testID,
}: BigActionButtonProps) => (
  <Pressable
    onPress={onPress}
    accessibilityRole="button"
    accessibilityLabel={accessibilityLabel ?? label}
    accessibilityHint={accessibilityHint}
    testID={testID}
    style={({ pressed }) => [
      styles.base,
      variant === 'primary' ? styles.primary : styles.rescue,
      variant === 'rescue' && styles.rescueBase,
      pressed && variant === 'primary' && styles.primaryPressed,
      pressed && variant === 'rescue' && styles.rescuePressed,
    ]}
  >
    <View style={styles.content}>
      <Text
        style={[styles.label, variant === 'primary' ? styles.labelPrimary : styles.labelRescue]}
      >
        {label}
      </Text>
      {subLabel !== undefined && (
        <Text
          style={[
            styles.subLabel,
            variant === 'primary' ? styles.subLabelPrimary : styles.subLabelRescue,
          ]}
        >
          {subLabel}
        </Text>
      )}
    </View>
  </Pressable>
);

const styles = StyleSheet.create(theme => ({
  base: {
    width: '100%',
    minHeight: 148,
    paddingVertical: theme.spacing.s5,
    paddingHorizontal: theme.spacing.s5,
    borderRadius: theme.radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.md,
  },
  rescueBase: {
    minHeight: 184,
  },
  primary: {
    backgroundColor: theme.colors.brand.primary,
  },
  primaryPressed: {
    backgroundColor: theme.colors.brand.primaryPressed,
  },
  rescue: {
    backgroundColor: theme.colors.brand.primarySurface,
    borderWidth: 2,
    borderColor: theme.colors.brand.primary,
  },
  rescuePressed: {
    opacity: 0.85,
  },
  content: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.s2,
  },
  label: {
    fontSize: 32,
    fontWeight: theme.typography.weight.bold,
    fontFamily: theme.typography.family.bold,
    textAlign: 'center',
  },
  labelPrimary: {
    color: theme.colors.brand.onPrimary,
  },
  labelRescue: {
    color: theme.colors.brand.primary,
  },
  subLabel: {
    fontSize: theme.typography.size.body,
    fontWeight: theme.typography.weight.medium,
    fontFamily: theme.typography.family.medium,
    textAlign: 'center',
  },
  subLabelPrimary: {
    color: theme.colors.brand.onPrimary,
    opacity: 0.85,
  },
  subLabelRescue: {
    color: theme.colors.text.secondary,
  },
}));
