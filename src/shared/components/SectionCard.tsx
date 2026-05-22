import React from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export type SectionCardProps = {
  title?: string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

// Reusable white rounded card used for every home-screen section and the session card.
// Pass `title` to render a semibold section heading above the card's children.
export const SectionCard = ({ title, children, style }: SectionCardProps) => (
  <View style={[styles.card, style]}>
    {title !== undefined && <Text style={styles.title}>{title}</Text>}
    {children}
  </View>
);

const styles = StyleSheet.create(theme => ({
  card: {
    backgroundColor: theme.colors.bg.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border.default,
    padding: theme.spacing.s4,
    gap: theme.spacing.s3,
    ...theme.shadows.sm,
  },
  title: {
    fontSize: theme.typography.size.h3,
    fontWeight: theme.typography.weight.semibold,
    fontFamily: theme.typography.family.semibold,
    color: theme.colors.text.primary,
  },
}));
