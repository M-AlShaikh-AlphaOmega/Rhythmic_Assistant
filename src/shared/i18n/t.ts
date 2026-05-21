import { en } from './en';
import type { TranslationKey } from './keys';

// Typed translation helper. Returns the English string for the given key.
// NOTE: scaffolding only — swap with expo-localization + a real catalog when
// multi-language support is added. Call sites do not change.
export const t = <K extends TranslationKey>(key: K): (typeof en)[K] => en[key];
