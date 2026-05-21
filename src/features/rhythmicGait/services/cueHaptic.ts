import * as Haptics from 'expo-haptics';

// Fires a light impact haptic on each beat.
// No-ops silently on web and devices without haptic support.
export const fireBeatHaptic = (): void => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
};
