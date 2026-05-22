// Raw primitive palette — every hex value in the app originates here.
// No component ever references the palette directly; use semantic tokens below.
const palette = {
  red700: '#8B1529',
  red600: '#A41E37',
  blue600: '#2563EB',
  blue500: '#5B8DEF',
  blue200: '#BFD3FF',
  blue50: '#EFF4FF',
  sky200: '#BFD7FE',
  rose400: '#D88B8B',
  rose100: '#FCE9E9',
  amber700: '#B45309',
  amber100: '#FEF3C7',
  green600: '#3F9D6F',
  green100: '#D8EBD9',
  gray900: '#1F2937',
  gray500: '#6B7280',
  gray400: '#9CA3AF',
  gray300: '#D1D5DB',
  gray200: '#E5E7EB',
  gray100: '#F3F4F6',
  gray50: '#F6F7F9',
  white: '#FFFFFF',
  overlayDark: 'rgba(15, 23, 42, 0.5)',
} as const;

// Semantic color tokens — all components and stylesheets reference these.
// Token groups map to §6 of RhythmicGaitAssistant-Plan.md.
export const colors = {
  // Primary brand color (red CTAs: Start walking, Stop, Walk again)
  brand: {
    primary: palette.red600,
    primaryPressed: palette.red700,
    primaryDisabled: palette.gray300,
    onPrimary: palette.white,
  },
  // Accent / information (selected states, hero banner, Active badge, ring progress)
  accent: {
    info: palette.blue600,
    infoSurface: palette.blue50,
    infoBorder: palette.blue200,
  },
  // Warning — used exclusively for the Paused session badge
  warn: {
    paused: palette.amber700,
    pausedSurface: palette.amber100,
  },
  // Success — result hero badge (mint green)
  success: {
    base: palette.green600,
    surface: palette.green100,
  },
  // Rose — countdown screen digit and ring border
  rose: {
    base: palette.rose400,
    surface: palette.rose100,
  },
  // Background layers
  bg: {
    app: palette.gray50,
    surface: palette.white,
    overlay: palette.overlayDark,
  },
  // Borders and dividers
  border: {
    default: palette.gray200,   // card and tile borders
    subtle: palette.gray100,    // inner dividers (slightly lighter)
  },
  // Text roles
  text: {
    primary: palette.gray900,
    secondary: palette.gray500,
    tertiary: palette.gray400,
    inverse: palette.white,
    disabled: palette.gray300,
  },
  // Audio visualizer bar tones
  viz: {
    barLow: palette.sky200,
    barMid: palette.blue500,
    barHigh: palette.blue600,
    barIdle: palette.sky200,
  },
} as const;

// Exported type — used by the Unistyles theme registration and typed stylesheets.
export type Colors = typeof colors;
