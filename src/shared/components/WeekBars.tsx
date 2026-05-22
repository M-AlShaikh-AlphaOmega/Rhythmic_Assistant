import React from 'react';
import { View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

export type WeekBarState = 'full' | 'partial' | 'empty';

export type WeekBarsProps = {
  bars: WeekBarState[];
};

// Seven-segment week visualization used on the Home streak card.
// Each bar is a thin rounded vertical pill; states are filled (success), partial
// (success surface), or empty (subtle border).
export const WeekBars = ({ bars }: WeekBarsProps) => {
  const { theme } = useUnistyles();

  const colorFor = (state: WeekBarState): string => {
    if (state === 'full') return theme.colors.success.base;
    if (state === 'partial') return theme.colors.success.surface;
    return theme.colors.border.default;
  };

  return (
    <View style={styles.row} accessibilityRole="image" accessibilityLabel="Weekly walk streak">
      {bars.map((state, i) => (
        <View key={i} style={[styles.bar, { backgroundColor: colorFor(state) }]} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.s1,
  },
  bar: {
    width: 6,
    height: 24,
    borderRadius: theme.radius.sm,
  },
}));
