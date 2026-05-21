import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

export type AudioVisualizerProps = {
  active: boolean;
};

const BAR_COUNT = 11;

// Per-bar min/max height ranges that produce a natural staggered wave effect.
const BAR_HEIGHTS: Array<[number, number]> = [
  [8, 20],
  [12, 32],
  [16, 44],
  [20, 52],
  [24, 60],
  [28, 64],
  [24, 60],
  [20, 52],
  [16, 44],
  [12, 32],
  [8, 20],
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
// Uses core Animated.Value (JS thread) — upgrade to Reanimated worklets when available.
// PERF: each bar drives one Animated.Value; no React state changes per frame.
export const AudioVisualizer = ({ active }: AudioVisualizerProps) => {
  const { theme } = useUnistyles();
  const animatedValues = useRef<Animated.Value[]>(
    Array.from({ length: BAR_COUNT }, () => new Animated.Value(BAR_HEIGHTS[0]![0]))
  ).current;

  useEffect(() => {
    if (!active) {
      const stops = animatedValues.map(val =>
        Animated.timing(val, {
          toValue: 8,
          duration: 200,
          useNativeDriver: false,
        })
      );
      Animated.parallel(stops).start();
      return;
    }

    const loops = animatedValues.map((val, i) => {
      const [minH, maxH] = BAR_HEIGHTS[i]!;
      const delay = i * 60;
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(val, {
            toValue: maxH,
            duration: 350,
            useNativeDriver: false,
          }),
          Animated.timing(val, {
            toValue: minH,
            duration: 350,
            useNativeDriver: false,
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
              height: val,
              backgroundColor: active ? barColor(theme, i) : theme.colors.viz.barIdle,
              opacity: active ? 1 : theme.opacity.pausedVisualizer,
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
    alignItems: 'center',
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
    borderRadius: theme.radius.full,
  },
}));
