import React from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export type HomeGreetingProps = {
  greeting: string;
  question: string;
};

// Two-line greeting block rendered inside the Home header's bottom slot.
// Lives on the red header band — text is rendered in the inverse (white) role.
export const HomeGreeting = ({ greeting, question }: HomeGreetingProps) => {
  return (
    <View style={styles.container} accessibilityRole="header">
      <Text style={styles.greeting} numberOfLines={1}>
        {greeting}
      </Text>
      <Text style={styles.question} numberOfLines={1}>
        {question}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    gap: theme.spacing.s1,
  },
  greeting: {
    fontSize: theme.typography.size.body,
    fontWeight: theme.typography.weight.semibold,
    fontFamily: theme.typography.family.semibold,
    color: theme.colors.brand.onPrimary,
    opacity: 0.85,
  },
  question: {
    fontSize: theme.typography.size.h2,
    fontWeight: theme.typography.weight.bold,
    fontFamily: theme.typography.family.bold,
    color: theme.colors.brand.onPrimary,
  },
}));
