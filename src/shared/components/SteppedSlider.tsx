import { Ionicons } from '@expo/vector-icons';
import React, { ComponentProps, useMemo } from 'react';
import { Pressable, Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

export type SteppedSliderOption = {
  value: string;
  label: string;
};

export type SteppedSliderProps = {
  label: string;
  iconName?: ComponentProps<typeof Ionicons>['name'];
  options: SteppedSliderOption[]; // expected length: 2..5
  value: string;
  onChange: (value: string) => void;
};

// Tap-only discrete slider with N stops. Shows a header row (icon + label, current label right),
// a filled progress bar that snaps to the selected stop, a knob over the active stop,
// and a row of N stop labels beneath the track. No drag — tap a stop label or the track region.
export const SteppedSlider = ({
  label,
  iconName,
  options,
  value,
  onChange,
}: SteppedSliderProps) => {
  const { theme } = useUnistyles();
  const selectedIndex = useMemo(
    () => Math.max(0, options.findIndex(o => o.value === value)),
    [options, value],
  );
  const lastIndex = options.length - 1;
  // Progress 0..1 — anchors the knob to the stop. For length=3 → 0, 0.5, 1.
  const progress = lastIndex === 0 ? 0 : selectedIndex / lastIndex;
  const currentLabel = options[selectedIndex]?.label ?? '';

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          {iconName !== undefined && (
            <Ionicons name={iconName} size={16} color={theme.colors.brand.primary} />
          )}
          <Text style={styles.label}>{label}</Text>
        </View>
        <Text style={styles.currentLabel}>{currentLabel}</Text>
      </View>

      <View style={styles.trackRow}>
        <View style={styles.track}>
          <View style={[styles.trackFill, { width: `${progress * 100}%` }]} />
          <View style={[styles.knob, { left: `${progress * 100}%` }]} />
        </View>
      </View>

      <View style={styles.stopRow}>
        {options.map((option, index) => {
          const isActive = index === selectedIndex;
          // Justify first label left, last right, middle ones centered to match track geometry.
          const align =
            index === 0 ? 'flex-start' : index === lastIndex ? 'flex-end' : 'center';
          return (
            <Pressable
              key={option.value}
              onPress={() => onChange(option.value)}
              accessibilityRole="button"
              accessibilityLabel={`${label} ${option.label}`}
              accessibilityState={{ selected: isActive }}
              style={[styles.stopHit, { alignItems: align }]}
            >
              <Text style={[styles.stopLabel, isActive && styles.stopLabelActive]}>
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    gap: theme.spacing.s2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.s2,
  },
  label: {
    fontSize: theme.typography.size.title,
    fontWeight: theme.typography.weight.semibold,
    fontFamily: theme.typography.family.semibold,
    color: theme.colors.text.primary,
  },
  currentLabel: {
    fontSize: theme.typography.size.bodyEmphasized,
    fontWeight: theme.typography.weight.semibold,
    fontFamily: theme.typography.family.semibold,
    color: theme.colors.brand.primary,
  },
  trackRow: {
    paddingVertical: theme.spacing.s2,
    justifyContent: 'center',
  },
  track: {
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.border.subtle,
    overflow: 'visible',
  },
  trackFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: theme.colors.brand.primary,
  },
  knob: {
    position: 'absolute',
    top: -5,
    width: 16,
    height: 16,
    marginLeft: -8,
    borderRadius: 8,
    backgroundColor: theme.colors.brand.primary,
    borderWidth: 2,
    borderColor: theme.colors.brand.onPrimary,
  },
  stopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stopHit: {
    flex: 1,
    paddingVertical: theme.spacing.s1,
  },
  stopLabel: {
    fontSize: theme.typography.size.caption,
    fontWeight: theme.typography.weight.regular,
    fontFamily: theme.typography.family.regular,
    color: theme.colors.text.secondary,
  },
  stopLabelActive: {
    color: theme.colors.brand.primary,
    fontWeight: theme.typography.weight.semibold,
    fontFamily: theme.typography.family.semibold,
  },
}));
