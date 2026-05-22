import { Ionicons } from '@expo/vector-icons';
import React, { ComponentProps } from 'react';
import { Switch, Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

export type ToggleRowProps = {
  title: string;
  description?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  showDivider?: boolean;
  iconName?: ComponentProps<typeof Ionicons>['name'];
  // `primary` → soft red tint behind a red icon (default for enabled-looking rows).
  // `muted`   → subtle gray tint behind a muted icon (used for off-by-default rows).
  iconTint?: 'primary' | 'muted';
};

// Preference row with an optional tinted leading icon, title, optional description, and Switch.
// `showDivider` renders a 1dp separator below the row.
export const ToggleRow = ({
  title,
  description,
  value,
  onValueChange,
  showDivider = false,
  iconName,
  iconTint = 'primary',
}: ToggleRowProps) => {
  const { theme } = useUnistyles();

  const iconBackground =
    iconTint === 'primary' ? theme.colors.brand.primarySoft : theme.colors.border.subtle;
  const iconColor =
    iconTint === 'primary' ? theme.colors.brand.primary : theme.colors.text.tertiary;

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {iconName !== undefined && (
          <View style={[styles.iconWrap, { backgroundColor: iconBackground }]}>
            <Ionicons name={iconName} size={18} color={iconColor} />
          </View>
        )}
        <View style={styles.textBlock}>
          <Text style={styles.title}>{title}</Text>
          {description !== undefined && <Text style={styles.description}>{description}</Text>}
        </View>
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{
            false: theme.colors.border.default,
            true: theme.colors.brand.primary,
          }}
          thumbColor={theme.colors.bg.surface}
          accessibilityLabel={title}
        />
      </View>
      {showDivider && <View style={styles.divider} />}
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  wrapper: {
    gap: theme.spacing.s3,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.s3,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: theme.radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border.subtle,
  },
  textBlock: {
    flex: 1,
    gap: theme.spacing.s1,
  },
  title: {
    fontSize: theme.typography.size.title,
    fontWeight: theme.typography.weight.semibold,
    fontFamily: theme.typography.family.semibold,
    color: theme.colors.text.primary,
  },
  description: {
    fontSize: theme.typography.size.caption,
    fontWeight: theme.typography.weight.regular,
    fontFamily: theme.typography.family.regular,
    color: theme.colors.text.secondary,
  },
}));
