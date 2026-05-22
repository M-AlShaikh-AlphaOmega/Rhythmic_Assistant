import { Ionicons } from '@expo/vector-icons';
import React, { ComponentProps } from 'react';
import { Pressable, Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export type ListOptionProps = {
  iconName: ComponentProps<typeof Ionicons>['name'];
  iconBackground: string;
  iconColor: string;
  title: string;
  bpm: string;
  description: string;
  // Optional right-side text label shown when not selected (e.g. legacy rhythm summary).
  rightLabel?: string;
  // When true, swaps `rightLabel` for the "SELECTED" red pill and applies the red theme.
  selected: boolean;
  selectedLabel?: string;
  onPress: () => void;
};

// Pressable row for pace selection (Gentle, Steady, Energizing).
// Leading tinted icon container + title/bpm/description block + optional right label or SELECTED pill.
export const ListOption = ({
  iconName,
  iconBackground,
  iconColor,
  title,
  bpm,
  description,
  rightLabel,
  selected,
  selectedLabel = 'SELECTED',
  onPress,
}: ListOptionProps) => (
  <Pressable
    onPress={onPress}
    accessibilityRole="button"
    accessibilityLabel={title}
    accessibilityState={{ selected }}
    style={[styles.container, selected ? styles.selected : styles.default]}
  >
    <View style={[styles.iconWrap, { backgroundColor: iconBackground }]}>
      <Ionicons name={iconName} size={20} color={iconColor} />
    </View>
    <View style={styles.center}>
      <View style={styles.titleRow}>
        <Text style={[styles.title, selected && styles.titleSelected]} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.bpm}>{bpm}</Text>
      </View>
      <Text style={styles.description} numberOfLines={2}>
        {description}
      </Text>
    </View>
    {selected ? (
      <View style={styles.selectedPill}>
        <Text style={styles.selectedPillText}>{selectedLabel}</Text>
      </View>
    ) : rightLabel !== undefined ? (
      <Text style={styles.rightLabel}>{rightLabel}</Text>
    ) : null}
  </Pressable>
);

const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.s4,
    borderRadius: theme.radius.md,
    borderWidth: 1.5,
    gap: theme.spacing.s3,
  },
  default: {
    backgroundColor: theme.colors.bg.surface,
    borderColor: theme.colors.border.default,
  },
  selected: {
    backgroundColor: theme.colors.brand.primarySoft,
    borderColor: theme.colors.brand.primarySoftBorder,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    gap: theme.spacing.s1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.s2,
  },
  title: {
    fontSize: theme.typography.size.title,
    fontWeight: theme.typography.weight.semibold,
    fontFamily: theme.typography.family.semibold,
    color: theme.colors.text.primary,
  },
  titleSelected: {
    color: theme.colors.brand.primary,
  },
  bpm: {
    fontSize: theme.typography.size.caption,
    fontWeight: theme.typography.weight.regular,
    fontFamily: theme.typography.family.regular,
    color: theme.colors.text.secondary,
  },
  description: {
    fontSize: theme.typography.size.caption,
    fontWeight: theme.typography.weight.regular,
    fontFamily: theme.typography.family.regular,
    color: theme.colors.text.secondary,
  },
  rightLabel: {
    maxWidth: 100,
    textAlign: 'right',
    fontSize: theme.typography.size.caption,
    fontWeight: theme.typography.weight.medium,
    fontFamily: theme.typography.family.medium,
    color: theme.colors.text.secondary,
  },
  selectedPill: {
    paddingHorizontal: theme.spacing.s2,
    paddingVertical: 4,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.brand.primary,
  },
  selectedPillText: {
    fontSize: 10,
    fontWeight: theme.typography.weight.bold,
    fontFamily: theme.typography.family.bold,
    color: theme.colors.brand.onPrimary,
    letterSpacing: 0.5,
  },
}));
