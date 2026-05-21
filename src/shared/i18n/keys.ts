import type { en } from './en';

// Typed union of every translation key in the catalog.
export type TranslationKey = keyof typeof en;
