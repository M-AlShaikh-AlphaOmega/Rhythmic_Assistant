import { getLocales } from 'expo-localization';
import { strings as en } from './locales/en';
import { strings as ar } from './locales/ar';

const localeMap = { en, ar } as const;
type SupportedLocale = keyof typeof localeMap;

const deviceLocale = getLocales()[0]?.languageCode ?? 'en';
const locale: SupportedLocale =
  deviceLocale in localeMap ? (deviceLocale as SupportedLocale) : 'en';

export const t = localeMap[locale];
export const currentLocale = locale;
export const isRTL = getLocales()[0]?.textDirection === 'rtl';
