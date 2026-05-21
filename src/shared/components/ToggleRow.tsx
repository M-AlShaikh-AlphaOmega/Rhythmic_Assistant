import React from 'react';
import { Switch, Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

export type ToggleRowProps = {
  title: string;
  description?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  showDivider?: boolean;
};

// Preference row with a title, optional description, and a right-aligned Switch.
// `showDivider` renders a 1dp separator below the row — used to delimit stacked rows
// inside a SectionCard (e.g. Preferences on HomeScreen).
export const ToggleRow = ({
  title,
  description,
  value,
  onValueChange,
  showDivider = false,
}: ToggleRowProps) => {
  const { theme } = useUnistyles();

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
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
    gap: theme.spacing.s4,
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
    fontWeight: theme.typography.weight.medium,
    fontFamily: theme.typography.family.sans,
    color: theme.colors.text.primary,
  },
  description: {
    fontSize: theme.typography.size.caption,
    fontWeight: theme.typography.weight.regular,
    fontFamily: theme.typography.family.sans,
    color: theme.colors.text.secondary,
  },
}));
