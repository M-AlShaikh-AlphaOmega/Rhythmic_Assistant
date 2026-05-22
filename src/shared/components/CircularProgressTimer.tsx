import React from 'react';
import { Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

export type CircularProgressTimerProps = {
  // Elapsed / total ratio (0-1)
  progress: number;
  // Formatted display time, e.g. "04:50"
  timeLabel: string;
  active: boolean;
  statusLabel?: string;
};

const RING_SIZE = 286;
const STROKE = 16;
const RADIUS = (RING_SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// SVG-based ring timer: gray track + colored progress arc with centered time display.
// The arc starts at the top (12 o'clock) and fills clockwise as progress increases.
export const CircularProgressTimer = ({
  progress,
  timeLabel,
  active,
  statusLabel = 'remaining',
}: CircularProgressTimerProps) => {
  const { theme } = useUnistyles();
  const clamped = Math.min(Math.max(progress, 0), 1);
  const dashOffset = CIRCUMFERENCE * (1 - clamped);
  const arcColor = active ? theme.colors.brand.primary : theme.colors.warn.paused;

  return (
    <View
      style={styles.ring}
      accessibilityRole="timer"
      accessibilityLabel={`${timeLabel} remaining`}
      accessibilityLiveRegion="polite"
    >
      <View importantForAccessibility="no-hide-descendants">
        <Svg width={RING_SIZE} height={RING_SIZE}>
          <Circle
            cx={RING_SIZE / 2}
            cy={RING_SIZE / 2}
            r={RADIUS}
            stroke={theme.colors.border.default}
            strokeWidth={STROKE}
            fill="none"
          />
          <Circle
            cx={RING_SIZE / 2}
            cy={RING_SIZE / 2}
            r={RADIUS}
            stroke={arcColor}
            strokeWidth={STROKE}
            fill="none"
            strokeDasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            // Rotate -90° so the arc starts at the top (12 o'clock) instead of 3 o'clock.
            transform={`rotate(-90 ${RING_SIZE / 2} ${RING_SIZE / 2})`}
          />
        </Svg>
      </View>
      <View style={styles.center} pointerEvents="none" importantForAccessibility="no-hide-descendants">
        <Text style={styles.timer}>{timeLabel}</Text>
        <Text style={[styles.remainingLabel, !active && styles.pausedLabel]}>{statusLabel}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  ring: {
    width: RING_SIZE,
    height: RING_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.s1,
  },
  timer: {
    fontSize: 64,
    fontWeight: theme.typography.weight.bold,
    fontFamily: theme.typography.family.bold,
    color: theme.colors.text.primary,
    lineHeight: 64 * theme.typography.lineHeight.tight,
  },
  remainingLabel: {
    fontSize: theme.typography.size.body,
    fontWeight: theme.typography.weight.semibold,
    fontFamily: theme.typography.family.semibold,
    color: theme.colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: theme.typography.letterSpacing.overline,
  },
  pausedLabel: {
    color: theme.colors.warn.paused,
  },
}));
