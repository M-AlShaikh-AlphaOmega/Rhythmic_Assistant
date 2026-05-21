import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export type ProgressBarProps = {
  // 0–1 fill ratio
  progress: number;
};

// Thin full-width progress bar (4dp height) tracking session elapsed time.
export const ProgressBar = ({ progress }: ProgressBarProps) => {
  const clamped = Math.min(Math.max(progress, 0), 1);
  const percent = Math.round(clamped * 100);

  return (
    <View
      style={styles.track}
      accessibilityRole="progressbar"
      accessibilityLabel="Session progress"
      accessibilityValue={{ min: 0, max: 100, now: percent }}
    >
      <View style={[styles.fill, { width: `${clamped * 100}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  track: {
    width: '100%',
    height: 4,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.border.default,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.accent.info,
  },
}));
