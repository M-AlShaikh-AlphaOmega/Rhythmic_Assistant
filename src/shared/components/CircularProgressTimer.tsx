import React from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export type CircularProgressTimerProps = {
  // Elapsed / total ratio (0–1) — arc fill deferred until react-native-svg is installed.
  progress: number;
  // Formatted display time, e.g. "04:50"
  timeLabel: string;
  active: boolean;
};

const RING_SIZE = 200;
const STROKE = 14;
const INNER_SIZE = RING_SIZE - STROKE * 2;

// View-based ring timer: gray/blue track circle with white inner hole and centered time display.
// TODO: arc progress fill requires react-native-svg (not yet installed).
//       Once installed, replace the plain View ring with an Svg Arc overlay.
export const CircularProgressTimer = ({ timeLabel, active }: CircularProgressTimerProps) => (
  <View style={styles.ring}>
    <View style={[styles.track, active ? styles.trackActive : styles.trackInactive]}>
      <View style={styles.inner}>
        <Text style={styles.timer}>{timeLabel}</Text>
        <Text style={styles.remainingLabel}>remaining</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create(theme => ({
  ring: {
    width: RING_SIZE,
    height: RING_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  track: {
    width: RING_SIZE,
    height: RING_SIZE,
    borderRadius: theme.radius.full,
    borderWidth: STROKE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trackActive: {
    borderColor: theme.colors.accent.info,
  },
  trackInactive: {
    borderColor: theme.colors.border.default,
  },
  inner: {
    width: INNER_SIZE,
    height: INNER_SIZE,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.bg.surface,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.s1,
  },
  timer: {
    fontSize: theme.typography.size.displayLarge,
    fontWeight: theme.typography.weight.bold,
    fontFamily: theme.typography.family.sans,
    color: theme.colors.text.primary,
    lineHeight: theme.typography.size.displayLarge * theme.typography.lineHeight.tight,
  },
  remainingLabel: {
    fontSize: theme.typography.size.caption,
    fontWeight: theme.typography.weight.regular,
    fontFamily: theme.typography.family.sans,
    color: theme.colors.text.secondary,
  },
}));
