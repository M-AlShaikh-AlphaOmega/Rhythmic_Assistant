import React from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

// Static hero banner displayed at the top of HomeScreen.
// Blue card with a translucent decorative ring, bold white headline, and subtitle.
export const HeroBanner = () => (
  <View style={styles.card}>
    <View style={styles.circle} />
    <Text style={styles.headline}>Find your walking rhythm</Text>
    <Text style={styles.subtitle}>Real music matched to your pace guides every step.</Text>
  </View>
);

const styles = StyleSheet.create(theme => ({
  card: {
    backgroundColor: theme.colors.accent.info,
    borderRadius: theme.radius.xl,
    padding: theme.spacing.s6,
    gap: theme.spacing.s2,
    overflow: 'hidden',
  },
  circle: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: theme.radius.full,
    borderWidth: 32,
    borderColor: 'rgba(255,255,255,0.12)',
    right: -40,
    top: -40,
  },
  headline: {
    fontSize: theme.typography.size.h2,
    fontWeight: theme.typography.weight.bold,
    fontFamily: theme.typography.family.sans,
    color: theme.colors.text.inverse,
    lineHeight: theme.typography.size.h2 * theme.typography.lineHeight.normal,
  },
  subtitle: {
    fontSize: theme.typography.size.body,
    fontWeight: theme.typography.weight.regular,
    fontFamily: theme.typography.family.sans,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: theme.typography.size.body * theme.typography.lineHeight.relaxed,
  },
}));
