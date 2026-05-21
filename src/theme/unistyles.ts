import { StyleSheet } from 'react-native-unistyles';

import { colors } from './colors';
import { iconSize } from './icons';
import { shadows, opacity } from './shadows';
import { spacing, radius } from './spacing';
import { typography } from './typography';

// Combined theme object — all token files assembled into a single runtime theme.
const theme = {
  colors,
  typography,
  spacing,
  radius,
  shadows,
  opacity,
  iconSize,
} as const;

// TypeScript augmentation — enables typed `theme` in StyleSheet.create callbacks.
type AppTheme = typeof theme;
type AppThemes = { default: AppTheme };

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
}

// Side-effect registration — import this file once at the app entry point (App.tsx).
StyleSheet.configure({
  themes: { default: theme },
  settings: { initialTheme: 'default' },
});

export type { AppTheme };
