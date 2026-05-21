// Spatial tokens — spacing and border radius.
// All layout padding, margin, and gap values reference `spacing`.
// All corner rounding references `radius`.

// 4-pt base spacing scale (§5.3 of RhythmicGaitAssistant-Plan.md).
// Usage guide:
//   s2 (8)  — icon-to-label gap
//   s3 (12) — icon-to-label gap (wider variant), button vertical padding
//   s4 (16) — card internal padding, vertical gap between cards, screen horizontal padding
//   s5 (20) — screen horizontal padding (wider variant), card internal padding (wider variant)
//   s6 (24) — section vertical spacing
export const spacing = {
  s0: 0,
  s1: 4,
  s2: 8,
  s3: 12,
  s4: 16,
  s5: 20,
  s6: 24,
  s7: 32,
  s8: 40,
  s9: 48,
} as const;

// Border radius values (§5.4 of RhythmicGaitAssistant-Plan.md).
// sm   — duration pills, small chips
// md   — buttons (Start walking, Stop, Pause, Done, Walk again)
// lg   — all section cards (cue, pace, duration, preferences, session, result)
// xl   — hero banner (range 20–24 resolved to 24)
// full — circular badges, status pills, cue chip, progress ring
export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export type Spacing = typeof spacing;
export type Radius = typeof radius;
