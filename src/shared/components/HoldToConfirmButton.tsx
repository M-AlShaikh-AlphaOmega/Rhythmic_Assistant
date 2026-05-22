import React, { useCallback, useEffect, useRef } from 'react';
import { Animated, Easing, Pressable, Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

export type HoldToConfirmButtonProps = {
  label: string;
  hint?: string;
  holdDurationMs?: number;
  onConfirm: () => void;
  accessibilityLabel?: string;
  testID?: string;
};

// A button that fires `onConfirm` only after a sustained press of `holdDurationMs`.
// Shows a progress bar filling during the hold; resets cleanly if the touch is lifted
// or cancelled before the threshold. Designed to prevent accidental tremor taps from
// triggering destructive actions like "End walk".
export const HoldToConfirmButton = ({
  label,
  hint,
  holdDurationMs = 2000,
  onConfirm,
  accessibilityLabel,
  testID,
}: HoldToConfirmButtonProps) => {
  const { theme } = useUnistyles();
  const progress = useRef(new Animated.Value(0)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);
  const firedRef = useRef(false);

  const cancelHold = useCallback(() => {
    if (animationRef.current !== null) {
      animationRef.current.stop();
      animationRef.current = null;
    }
    Animated.timing(progress, {
      toValue: 0,
      duration: 180,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const handlePressIn = useCallback(() => {
    firedRef.current = false;
    progress.setValue(0);
    const anim = Animated.timing(progress, {
      toValue: 1,
      duration: holdDurationMs,
      easing: Easing.linear,
      useNativeDriver: false,
    });
    animationRef.current = anim;
    anim.start(({ finished }) => {
      if (finished && !firedRef.current) {
        firedRef.current = true;
        onConfirm();
      }
    });
  }, [progress, holdDurationMs, onConfirm]);

  const handlePressOut = useCallback(() => {
    if (!firedRef.current) {
      cancelHold();
    }
  }, [cancelHold]);

  useEffect(() => {
    return () => {
      if (animationRef.current !== null) {
        animationRef.current.stop();
        animationRef.current = null;
      }
    };
  }, []);

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityHint={hint}
      testID={testID}
      style={styles.base}
    >
      <View style={styles.content}>
        <Text style={styles.label}>{label}</Text>
        {hint !== undefined && <Text style={styles.hint}>{hint}</Text>}
      </View>
      <View style={styles.progressTrack}>
        <Animated.View
          style={[
            styles.progressFill,
            {
              width: progressWidth,
              backgroundColor: theme.colors.brand.primary,
            },
          ]}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create(theme => ({
  base: {
    width: '100%',
    minHeight: 56,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.bg.surface,
    borderWidth: 1,
    borderColor: theme.colors.border.default,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.s3,
    paddingHorizontal: theme.spacing.s4,
    gap: theme.spacing.s1,
  },
  label: {
    fontSize: theme.typography.size.button,
    fontWeight: theme.typography.weight.semibold,
    fontFamily: theme.typography.family.semibold,
    color: theme.colors.text.primary,
  },
  hint: {
    fontSize: theme.typography.size.caption,
    fontWeight: theme.typography.weight.regular,
    fontFamily: theme.typography.family.regular,
    color: theme.colors.text.secondary,
  },
  progressTrack: {
    height: 4,
    width: '100%',
    backgroundColor: theme.colors.border.subtle,
  },
  progressFill: {
    height: '100%',
  },
}));
