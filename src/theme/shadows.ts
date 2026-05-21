// Shadow and opacity tokens (§5.5, §5.6 of RhythmicGaitAssistant-Plan.md).
//
// Each shadow level includes both iOS shadow props and Android `elevation` —
// spread the token object directly into a StyleSheet style for cross-platform support.
//
// Shadow color base: #0F172A (slate-900).
// The CSS rgba alpha from the planning doc is split into `shadowOpacity` as RN requires.

const SHADOW_COLOR = '#0F172A';

export const shadows = {
  // No shadow — screen backgrounds, flat surfaces
  none: {
    shadowColor: SHADOW_COLOR,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  // Subtle lift — default cards (may rely on border instead on light backgrounds)
  sm: {
    shadowColor: SHADOW_COLOR,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  // Moderate lift — hero banner, primary buttons
  md: {
    shadowColor: SHADOW_COLOR,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  // Pronounced lift — modal and dialog surfaces
  lg: {
    shadowColor: SHADOW_COLOR,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 6,
  },
} as const;

// Opacity values for component states (§5.6).
// Apply as the `opacity` style prop on the component or its container.
export const opacity = {
  disabled: 0.5,         // disabled buttons and inactive controls
  pausedVisualizer: 0.4, // audio visualizer bars in paused state
  pressedOverlay: 0.1,   // dark overlay on pressed light surfaces (0.08–0.12 midpoint)
} as const;

export type Shadows = typeof shadows;
export type Opacity = typeof opacity;
