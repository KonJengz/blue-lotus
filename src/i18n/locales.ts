/** Supported locales. Thai is the default per the brand (Bangkok shop). */
export const locales = ["th", "en", "zh"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "th";

/** Native label shown in the language switcher. */
export const localeLabels: Record<Locale, string> = {
  th: "ไทย",
  en: "EN",
  zh: "中文",
};

/** Runtime + type guard so a bad URL segment can `notFound()`. */
export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
