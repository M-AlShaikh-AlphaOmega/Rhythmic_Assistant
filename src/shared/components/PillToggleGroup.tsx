import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export type PillOption = {
  label: string;
  value: string;
};

export type PillToggleGroupProps = {
  options: PillOption[];
  value: string;
  onChange: (value: string) => void;
};

// Controlled single-select row of pill buttons for duration selection.
export const PillToggleGroup = ({ options, value, onChange }: PillToggleGroupProps) => (
  <View style={styles.row}>
    {options.map(option => {
      const selected = option.value === value;
      return (
        <Pressable
          key={option.value}
          onPress={() => onChange(option.value)}
          accessibilityRole="button"
          accessibilityLabel={option.label}
          accessibilityState={{ selected }}
          style={[styles.pill, selected ? styles.pillSelected : styles.pillDefault]}
        >
          <Text style={[styles.label, selected ? styles.labelSelected : styles.labelDefault]}>
            {option.label}
          </Text>
        </Pressable>
      );
    })}
  </View>
);

const styles = StyleSheet.create(theme => ({
  row: {
    flexDirection: 'row',
    gap: theme.spacing.s2,
  },
  pill: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.s3,
    paddingHorizontal: theme.spacing.s4,
    borderRadius: theme.radius.full,
    borderWidth: 1.5,
  },
  pillDefault: {
    backgroundColor: theme.colors.bg.surface,
    borderColor: theme.colors.border.default,
  },
  pillSelected: {
    backgroundColor: theme.colors.accent.infoSurface,
    borderColor: theme.colors.accent.infoBorder,
  },
  label: {
    fontSize: theme.typography.size.bodyEmphasized,
    fontWeight: theme.typography.weight.semibold,
    fontFamily: theme.typography.family.semibold,
  },
  labelDefault: {
    color: theme.colors.text.primary,
  },
  labelSelected: {
    color: theme.colors.accent.info,
  },
}));
