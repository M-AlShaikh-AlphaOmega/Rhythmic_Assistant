import React, { useEffect, useRef } from 'react';
import { Animated, Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export type CountdownBadgeProps = {
  value: number;
};

const BADGE_SIZE = 140;

// Circular countdown digit badge for the pre-session countdown screen (3, 2, 1).
// Animates scale 1.2→1 and opacity 0→1 on each value change via core Animated.
export const CountdownBadge = ({ value }: CountdownBadgeProps) => {
  const scale = useRef(new Animated.Value(1.2)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    scale.setValue(1.2);
    opacity.setValue(0);
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [value, scale, opacity]);

  return (
    <Animated.View style={[styles.badge, { transform: [{ scale }], opacity }]}>
      <Text style={styles.digit}>{value}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create(theme => ({
  badge: {
    width: BADGE_SIZE,
    height: BADGE_SIZE,
    borderRadius: theme.radius.full,
    borderWidth: 3,
    borderColor: theme.colors.rose.base,
    backgroundColor: theme.colors.rose.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  digit: {
    fontSize: theme.typography.size.display,
    fontWeight: theme.typography.weight.bold,
    fontFamily: theme.typography.family.sans,
    color: theme.colors.rose.base,
    lineHeight: theme.typography.size.display * theme.typography.lineHeight.tight,
  },
}));
