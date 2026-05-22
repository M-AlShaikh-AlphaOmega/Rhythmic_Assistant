// Typography tokens — every text element in the app references these.
// Line heights are multipliers; compute absolute value as: fontSize * lineHeight.X
// Font family assumption: Inter (§14, assumption #1 — verify against Figma source).

// Standard scale — the default visual density.
const sizeRegular = {
  overline: 11,        // "WALKING SESSION" uppercase label
  caption: 12,         // small helper text
  body: 14,            // descriptions, hero subtitle
  bodyEmphasized: 14,  // pill labels ("5 min") — same size, heavier weight
  title: 15,           // option names ("Audio", "Steady")
  h3: 16,              // section titles ("Choose your cue", "Pick a pace")
  button: 16,          // button labels ("Start walking", "Stop", "Pause")
  h1: 18,              // screen header ("Rhythmic Gait Assistant")
  h2: 20,              // card titles ("Find your walking rhythm", "Session complete!")
  display: 40,         // countdown digit ("1", "2", "3")
  displayLarge: 44,    // session timer ("04:50") — larger for dramatic emphasis
} as const;

// Big text scale — accessibility mode, defaults ON for new users.
// Body / heading / label tokens grow ~30–40%; display tokens grow only modestly
// because they are already maxed for impact.
const sizeBig = {
  overline: 14,
  caption: 16,
  body: 19,
  bodyEmphasized: 19,
  title: 20,
  h3: 22,
  button: 22,
  h1: 24,
  h2: 28,
  display: 48,
  displayLarge: 56,
} as const;

// Shape of a size scale — both `sizeRegular` and `sizeBig` satisfy it.
type SizeScale = {
  readonly overline: number;
  readonly caption: number;
  readonly body: number;
  readonly bodyEmphasized: number;
  readonly title: number;
  readonly h3: number;
  readonly button: number;
  readonly h1: number;
  readonly h2: number;
  readonly display: number;
  readonly displayLarge: number;
};

// Builds a typography token set for the given size scale.
// Family, weights, line heights, and letter spacing are scale-invariant.
const buildTypography = (size: SizeScale) => ({
  family: { sans: 'Inter' },
  weight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  size,
  lineHeight: {
    tight: 1.1,
    normal: 1.3,
    relaxed: 1.45,
  },
  letterSpacing: {
    overline: 1.5,
  },
});

// Default typography (regular scale) — what the existing app uses.
export const typography = buildTypography(sizeRegular);

// Big text typography — selected when preferences.bigTextMode is true.
export const typographyBig = buildTypography(sizeBig);

export type Typography = typeof typography;
