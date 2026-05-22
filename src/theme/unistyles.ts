import { StyleSheet } from 'react-native-unistyles';

import { colors } from './colors';
import { iconSize } from './icons';
import { shadows, opacity } from './shadows';
import { spacing, radius } from './spacing';
import { typography, typographyBig } from './typography';

// Combined theme object — all token files assembled into a single runtime theme.
const defaultTheme = {
  colors,
  typography,
  spacing,
  radius,
  shadows,
  opacity,
  iconSize,
} as const;

// Big-text theme — identical to default except for the larger typography scale.
// Selected at runtime when preferences.bigTextMode is true.
const bigTheme = {
  ...defaultTheme,
  typography: typographyBig,
} as const;

// TypeScript augmentation — enables typed `theme` in StyleSheet.create callbacks.
type AppTheme = typeof defaultTheme;
type AppThemes = { default: AppTheme; big: AppTheme };

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
}

// Side-effect registration — import this file once at the app entry point (App.tsx).
StyleSheet.configure({
  themes: { default: defaultTheme, big: bigTheme },
  settings: { initialTheme: 'default' },
});

export type { AppTheme };
