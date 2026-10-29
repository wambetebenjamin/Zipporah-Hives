export const locales = ["en", "sw", "fr"] as const;
export type Locale = (typeof locales)[number];
export const localeCookie = "zipporah-hives-language";

export type Localized = Record<Locale, string>;
export const localize = (value: Localized, locale: Locale) => value[locale];
