// Typography tokens — every text element in the app references these.
// Line heights are multipliers; compute absolute value as: fontSize * lineHeight.X
// Font family assumption: Inter (§14, assumption #1 — verify against Figma source).
export const typography = {
  // Font family
  family: {
    sans: 'Inter',
  },

  // Font weights — React Native requires string values
  weight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },

  // Font sizes in dp (density-independent pixels)
  // Roles and values derived from §5.2 of RhythmicGaitAssistant-Plan.md.
  // Ranges (e.g., 18–20) are resolved to a single concrete value.
  size: {
    overline: 11,        // "WALKING SESSION" uppercase label
    caption: 12,         // "Follow each cue with a comfortable, steady step."
    body: 14,            // descriptions, hero subtitle
    bodyEmphasized: 14,  // pill labels ("5 min") — same size, heavier weight
    title: 15,           // option names ("Audio", "Steady")
    h3: 16,              // section titles ("Choose your cue", "Pick a pace")
    button: 16,          // button labels ("Start walking", "Stop", "Pause")
    h1: 18,              // screen header ("Rhythmic Gait Assistant")
    h2: 20,              // card titles ("Find your walking rhythm", "Session complete!")
    display: 40,         // countdown digit ("1", "2", "3")
    displayLarge: 44,    // session timer ("04:50") — larger for dramatic emphasis
  },

  // Line height multipliers — multiply by the corresponding fontSize to get absolute lineHeight
  lineHeight: {
    tight: 1.1,    // display / timer — compact, high-impact text
    normal: 1.3,   // headers (h1, h2, h3, title) — standard reading rhythm
    relaxed: 1.45, // body text and captions — comfortable paragraph reading
  },

  // Letter spacing in dp — only the overline role uses non-default tracking
  letterSpacing: {
    overline: 1.5, // "WALKING SESSION" — wide tracking for all-caps labels
  },
} as const;

export type Typography = typeof typography;
