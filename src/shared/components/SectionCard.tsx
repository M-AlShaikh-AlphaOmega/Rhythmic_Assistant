import React from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export type SectionCardProps = {
  title?: string;
  headerRight?: React.ReactNode;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

// Reusable white rounded card used for every home-screen section and the session card.
// Pass `title` to render a semibold section heading above the card's children.
// Pass `headerRight` to render content on the right of the header row (subtitle, pill, icon).
export const SectionCard = ({ title, headerRight, children, style }: SectionCardProps) => {
  const hasHeader = title !== undefined || headerRight !== undefined;
  return (
    <View style={[styles.card, style]}>
      {hasHeader && (
        <View style={styles.headerRow}>
          {title !== undefined ? <Text style={styles.title}>{title}</Text> : <View />}
          {headerRight !== undefined && <View style={styles.headerRight}>{headerRight}</View>}
        </View>
      )}
      {children}
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  card: {
    backgroundColor: theme.colors.bg.surface,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border.default,
    padding: theme.spacing.s4,
    gap: theme.spacing.s3,
    ...theme.shadows.sm,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.s3,
  },
  headerRight: {
    flexShrink: 0,
  },
  title: {
    flexShrink: 1,
    fontSize: theme.typography.size.h3,
    fontWeight: theme.typography.weight.semibold,
    fontFamily: theme.typography.family.semibold,
    color: theme.colors.text.primary,
  },
}));
