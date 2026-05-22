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
  // Legacy label rendered below the time (e.g. "Rhythm running", "Paused").
  statusLabel?: string;
  // Optional small uppercase label rendered above the time (e.g. "ELAPSED").
  topLabel?: string;
  // Optional subtitle line rendered below the time (e.g. "of 10:00 · 45% done").
  subtitle?: string;
  // Optional pill rendered below the subtitle (e.g. "5:28 left").
  pillLabel?: string;
};

const RING_SIZE = 286;
const STROKE = 16;
const RADIUS = (RING_SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const KNOB_RADIUS = STROKE / 2 + 2;
const KNOB_INNER_RADIUS = STROKE / 2 - 2;

// SVG-based ring timer: gray track + colored progress arc with centered time display.
// The arc starts at the top (12 o'clock) and fills clockwise as progress increases.
// Optional top label, subtitle, and inset pill support the running screen's elapsed view.
export const CircularProgressTimer = ({
  progress,
  timeLabel,
  active,
  statusLabel,
  topLabel,
  subtitle,
  pillLabel,
}: CircularProgressTimerProps) => {
  const { theme } = useUnistyles();
  const clamped = Math.min(Math.max(progress, 0), 1);
  const dashOffset = CIRCUMFERENCE * (1 - clamped);
  const arcColor = active ? theme.colors.brand.primary : theme.colors.warn.paused;

  // Knob position at the tip of the progress arc.
  // Angle origin is 12 o'clock (-π/2 rad); sweeps clockwise as progress grows.
  const angle = -Math.PI / 2 + clamped * 2 * Math.PI;
  const center = RING_SIZE / 2;
  const knobX = center + RADIUS * Math.cos(angle);
  const knobY = center + RADIUS * Math.sin(angle);
  const showKnob = clamped > 0 && clamped < 1;

  const legacyStatus = statusLabel ?? (active ? undefined : 'Paused');

  return (
    <View
      style={styles.ring}
      accessibilityRole="timer"
      accessibilityLabel={`${timeLabel} ${topLabel ?? legacyStatus ?? ''}`.trim()}
      accessibilityLiveRegion="polite"
    >
      <View importantForAccessibility="no-hide-descendants">
        <Svg width={RING_SIZE} height={RING_SIZE}>
          <Circle
            cx={center}
            cy={center}
            r={RADIUS}
            stroke={theme.colors.border.default}
            strokeWidth={STROKE}
            fill="none"
          />
          <Circle
            cx={center}
            cy={center}
            r={RADIUS}
            stroke={arcColor}
            strokeWidth={STROKE}
            fill="none"
            strokeDasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            // Rotate -90° so the arc starts at the top (12 o'clock) instead of 3 o'clock.
            transform={`rotate(-90 ${center} ${center})`}
          />
          {showKnob && (
            <>
              <Circle cx={knobX} cy={knobY} r={KNOB_RADIUS} fill={arcColor} />
              <Circle
                cx={knobX}
                cy={knobY}
                r={KNOB_INNER_RADIUS}
                fill={theme.colors.bg.surface}
              />
            </>
          )}
        </Svg>
      </View>
      <View
        style={styles.center}
        pointerEvents="none"
        importantForAccessibility="no-hide-descendants"
      >
        {topLabel !== undefined && <Text style={styles.topLabel}>{topLabel}</Text>}
        <Text style={styles.timer}>{timeLabel}</Text>
        {subtitle !== undefined && <Text style={styles.subtitle}>{subtitle}</Text>}
        {pillLabel !== undefined && (
          <View style={styles.pill}>
            <View style={[styles.pillDot, { backgroundColor: arcColor }]} />
            <Text style={styles.pillLabel}>{pillLabel}</Text>
          </View>
        )}
        {pillLabel === undefined && subtitle === undefined && legacyStatus !== undefined && (
          <Text style={[styles.legacyStatus, !active && styles.pausedLabel]}>{legacyStatus}</Text>
        )}
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
  topLabel: {
    fontSize: theme.typography.size.overline,
    fontWeight: theme.typography.weight.semibold,
    fontFamily: theme.typography.family.semibold,
    color: theme.colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: theme.typography.letterSpacing.overline,
  },
  timer: {
    fontSize: 64,
    fontWeight: theme.typography.weight.bold,
    fontFamily: theme.typography.family.bold,
    color: theme.colors.text.primary,
    lineHeight: 64 * theme.typography.lineHeight.tight,
  },
  subtitle: {
    fontSize: theme.typography.size.body,
    fontWeight: theme.typography.weight.medium,
    fontFamily: theme.typography.family.medium,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.s1,
    paddingVertical: theme.spacing.s1,
    paddingHorizontal: theme.spacing.s3,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.brand.primarySurface,
    marginTop: theme.spacing.s1,
  },
  pillDot: {
    width: 6,
    height: 6,
    borderRadius: theme.radius.full,
  },
  pillLabel: {
    fontSize: theme.typography.size.caption,
    fontWeight: theme.typography.weight.semibold,
    fontFamily: theme.typography.family.semibold,
    color: theme.colors.brand.primary,
  },
  legacyStatus: {
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
