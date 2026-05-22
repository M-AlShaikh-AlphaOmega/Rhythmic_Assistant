import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export type ListOptionProps = {
  emoji: string;
  title: string;
  bpm: string;
  description: string;
  rightLabel?: string;
  selected: boolean;
  onPress: () => void;
};

// Pressable row for pace selection (Gentle, Steady, Energizing).
export const ListOption = ({
  emoji,
  title,
  bpm,
  description,
  rightLabel,
  selected,
  onPress,
}: ListOptionProps) => (
  <Pressable
    onPress={onPress}
    accessibilityRole="button"
    accessibilityLabel={title}
    accessibilityState={{ selected }}
    style={[styles.container, selected ? styles.selected : styles.default]}
  >
    <Text style={styles.emoji}>{emoji}</Text>
    <View style={styles.center}>
      <View style={styles.titleRow}>
        <Text style={[styles.title, selected && styles.titleSelected]} numberOfLines={1}>
          {title}
        </Text>
        <Text style={[styles.bpm, selected && styles.bpmSelected]}>{bpm}</Text>
      </View>
      <Text style={styles.description} numberOfLines={1}>
        {description}
      </Text>
    </View>
    {rightLabel !== undefined && (
      <Text style={[styles.rightLabel, selected && styles.rightLabelSelected]}>{rightLabel}</Text>
    )}
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
    backgroundColor: theme.colors.accent.infoSurface,
    borderColor: theme.colors.accent.infoBorder,
  },
  emoji: {
    fontSize: theme.typography.size.h2,
  },
  center: {
    flex: 1,
    gap: theme.spacing.s2,
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
    color: theme.colors.accent.info,
  },
  bpm: {
    fontSize: theme.typography.size.caption,
    fontWeight: theme.typography.weight.regular,
    fontFamily: theme.typography.family.regular,
    color: theme.colors.text.secondary,
  },
  bpmSelected: {
    color: theme.colors.accent.info,
  },
  description: {
    fontSize: theme.typography.size.caption,
    fontWeight: theme.typography.weight.regular,
    fontFamily: theme.typography.family.regular,
    color: theme.colors.text.secondary,
  },
  rightLabel: {
    width: 100,
    textAlign: 'right',
    fontSize: theme.typography.size.caption,
    fontWeight: theme.typography.weight.medium,
    fontFamily: theme.typography.family.medium,
    color: theme.colors.text.secondary,
  },
  rightLabelSelected: {
    color: theme.colors.accent.info,
  },
}));
