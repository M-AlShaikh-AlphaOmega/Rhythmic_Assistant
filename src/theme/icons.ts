// Icon and emoji asset registry (§5.7, §4 of RhythmicGaitAssistant-Plan.md).
// This file is the single source of truth for all icon identifiers and sizes.
// No library is imported here — components pass these values to the icon renderer.

// Icon size tokens in dp, by usage context (§5.7).
export const iconSize = {
  sm: 16,     // small inline icons (e.g., status badge icon)
  md: 22,     // header back chevron (range 20–24, midpoint)
  button: 19, // button leading icons (range 18–20, midpoint)
  tile: 30,   // option tile icons (range 28–32, midpoint)
} as const;

// Unicode emoji constants — pace identity and result celebration (§3, §4).
// Platform-rendered characters; no icon library or asset file required.
export const emojis = {
  paceGentle: '🍃',      // Gentle pace — leaf
  paceSteady: '💙',      // Steady pace — blue heart
  paceEnergizing: '🔥',  // Energizing pace — fire
  sessionComplete: '🎉', // Result hero card — party popper / confetti
} as const;

// Stroke icon identifiers — Ionicons naming convention.
// @expo/vector-icons (Ionicons) ships with Expo SDK 54; no additional install needed.
// If the library changes, only the string values here need updating.
export const iconNames = {
  back: 'chevron-back',       // ScreenHeader back chevron
  musicNote: 'musical-notes', // CueChip, Audio option tile
  vibration: 'pulse',         // Vibration option tile
  layers: 'layers',           // Combined option tile
  play: 'play',               // StatusBadge Active, SecondaryButton Resume
  pause: 'pause',             // PrimaryButton Pause, StatusBadge Paused
  stop: 'stop',               // PrimaryButton Stop (stop-square glyph)
  checkmark: 'checkmark',     // future use — confirmations, success states
} as const;

export type IconSize = typeof iconSize;
export type Emojis = typeof emojis;
export type IconKey = keyof typeof iconNames;
export type IconName = (typeof iconNames)[IconKey];
