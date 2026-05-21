import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

export type AudioVisualizerProps = {
  active: boolean;
};

const BAR_COUNT = 11;
const BAR_MAX_HEIGHT = 64;
const BAR_IDLE_HEIGHT_RATIO = 8 / BAR_MAX_HEIGHT;

// Per-bar min/max scaleY ratios (relative to BAR_MAX_HEIGHT) that produce the
// natural staggered wave effect. Heights from the original spec are divided by
// BAR_MAX_HEIGHT to obtain the equivalent scaleY range.
const BAR_SCALE: Array<[number, number]> = [
  [8 / BAR_MAX_HEIGHT, 20 / BAR_MAX_HEIGHT],
  [12 / BAR_MAX_HEIGHT, 32 / BAR_MAX_HEIGHT],
  [16 / BAR_MAX_HEIGHT, 44 / BAR_MAX_HEIGHT],
  [20 / BAR_MAX_HEIGHT, 52 / BAR_MAX_HEIGHT],
  [24 / BAR_MAX_HEIGHT, 60 / BAR_MAX_HEIGHT],
  [28 / BAR_MAX_HEIGHT, 1],
  [24 / BAR_MAX_HEIGHT, 60 / BAR_MAX_HEIGHT],
  [20 / BAR_MAX_HEIGHT, 52 / BAR_MAX_HEIGHT],
  [16 / BAR_MAX_HEIGHT, 44 / BAR_MAX_HEIGHT],
  [12 / BAR_MAX_HEIGHT, 32 / BAR_MAX_HEIGHT],
  [8 / BAR_MAX_HEIGHT, 20 / BAR_MAX_HEIGHT],
];

// Color assignment by bar index position (low → mid → high → mid → low).
const barColor = (theme: ReturnType<typeof useUnistyles>['theme'], index: number): string => {
  const center = Math.floor(BAR_COUNT / 2);
  const distance = Math.abs(index - center);
  if (distance <= 1) return theme.colors.viz.barHigh;
  if (distance <= 3) return theme.colors.viz.barMid;
  return theme.colors.viz.barLow;
};

// 11-bar animated visualizer for rhythm feedback during active/paused session states.
// Animates `transform: scaleY` (native-driver eligible) instead of `height` so the
// entire animation runs on the UI thread — no JS-thread work per frame.
export const AudioVisualizer = ({ active }: AudioVisualizerProps) => {
  const { theme } = useUnistyles();
  const animatedValues = useRef<Animated.Value[]>(
    Array.from({ length: BAR_COUNT }, () => new Animated.Value(BAR_IDLE_HEIGHT_RATIO))
  ).current;

  useEffect(() => {
    if (!active) {
      const stops = animatedValues.map(val =>
        Animated.timing(val, {
          toValue: BAR_IDLE_HEIGHT_RATIO,
          duration: 200,
          useNativeDriver: true,
        })
      );
      Animated.parallel(stops).start();
      return;
    }

    const loops = animatedValues.map((val, i) => {
      const [minScale, maxScale] = BAR_SCALE[i]!;
      const delay = i * 60;
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(val, {
            toValue: maxScale,
            duration: 350,
            useNativeDriver: true,
          }),
          Animated.timing(val, {
            toValue: minScale,
            duration: 350,
            useNativeDriver: true,
          }),
        ])
      );
    });

    loops.forEach(loop => loop.start());
    return () => loops.forEach(loop => loop.stop());
  }, [active, animatedValues]);

  return (
    <View style={styles.container}>
      {animatedValues.map((val, i) => (
        <Animated.View
          key={i}
          style={[
            styles.bar,
            {
              backgroundColor: active ? barColor(theme, i) : theme.colors.viz.barIdle,
              opacity: active ? 1 : theme.opacity.pausedVisualizer,
              transform: [{ scaleY: val }],
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: theme.spacing.s1,
    paddingVertical: theme.spacing.s3,
    paddingHorizontal: theme.spacing.s4,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.accent.infoSurface,
    height: 80,
  },
  bar: {
    width: 4,
    height: BAR_MAX_HEIGHT,
    borderRadius: theme.radius.full,
  },
}));
