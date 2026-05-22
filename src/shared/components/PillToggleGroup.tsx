import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export type PillOption = {
  label: string;
  value: string;
  // Optional secondary line shown beneath `label` in the stacked variant only.
  subLabel?: string;
};

export type PillToggleGroupProps = {
  options: PillOption[];
  value: string;
  onChange: (value: string) => void;
  // `inline` (default) — rounded-full single-line pills used in toolbars.
  // `stacked` — square tiles with `label` large and `subLabel` underneath (Duration card).
  variant?: 'inline' | 'stacked';
};

// Controlled single-select row of pill buttons. Selected state uses the red brand theme.
export const PillToggleGroup = ({
  options,
  value,
  onChange,
  variant = 'inline',
}: PillToggleGroupProps) => {
  const stacked = variant === 'stacked';
  return (
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
            style={[
              stacked ? styles.tile : styles.pill,
              selected ? styles.pillSelected : styles.pillDefault,
            ]}
          >
            <Text
              style={[
                stacked ? styles.tileLabel : styles.label,
                selected ? styles.labelSelected : styles.labelDefault,
              ]}
            >
              {option.label}
            </Text>
            {stacked && option.subLabel !== undefined && (
              <Text style={[styles.subLabel, selected && styles.subLabelSelected]}>
                {option.subLabel}
              </Text>
            )}
          </Pressable>
        );
      })}
    </View>
  );
};

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
  tile: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.s3,
    borderRadius: theme.radius.md,
    borderWidth: 1.5,
    gap: 2,
  },
  pillDefault: {
    backgroundColor: theme.colors.bg.surface,
    borderColor: theme.colors.border.default,
  },
  pillSelected: {
    backgroundColor: theme.colors.brand.primarySoft,
    borderColor: theme.colors.brand.primarySoftBorder,
  },
  label: {
    fontSize: theme.typography.size.bodyEmphasized,
    fontWeight: theme.typography.weight.semibold,
    fontFamily: theme.typography.family.semibold,
  },
  tileLabel: {
    fontSize: theme.typography.size.h2,
    fontWeight: theme.typography.weight.semibold,
    fontFamily: theme.typography.family.semibold,
  },
  subLabel: {
    fontSize: theme.typography.size.caption,
    fontWeight: theme.typography.weight.regular,
    fontFamily: theme.typography.family.regular,
    color: theme.colors.text.secondary,
  },
  subLabelSelected: {
    color: theme.colors.brand.primary,
  },
  labelDefault: {
    color: theme.colors.text.primary,
  },
  labelSelected: {
    color: theme.colors.brand.primary,
  },
}));
