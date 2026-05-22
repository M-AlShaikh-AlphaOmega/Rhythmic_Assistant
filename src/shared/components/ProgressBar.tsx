import React from 'react';
import { View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

export type ProgressBarProps = {
  // 0–1 fill ratio
  progress: number;
  // Optional fill color override. Defaults to theme.colors.accent.info.
  color?: string;
};

// Thin full-width progress bar (4dp height) tracking session elapsed time.
// Color defaults to the info accent but can be overridden to match a specific
// call site (e.g., brand primary on the running screen so it matches Pause).
export const ProgressBar = ({ progress, color }: ProgressBarProps) => {
  const { theme } = useUnistyles();
  const clamped = Math.min(Math.max(progress, 0), 1);
  const percent = Math.round(clamped * 100);
  const fillColor = color ?? theme.colors.accent.info;

  return (
    <View
      style={styles.track}
      accessibilityRole="progressbar"
      accessibilityLabel="Session progress"
      accessibilityValue={{ min: 0, max: 100, now: percent }}
    >
      <View style={[styles.fill, { width: `${clamped * 100}%`, backgroundColor: fillColor }]} />
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
  },
}));
