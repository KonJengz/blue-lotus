import "server-only";

import type { Locale } from "@/i18n/locales";
import type { Dictionary } from "@/i18n/types";

/**
 * Server-only dictionary loader. Dictionaries are dynamically imported so each
 * locale's copy ships only where it's rendered, keeping the client bundle lean.
 */
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  th: () => import("@/i18n/dictionaries/th").then((m) => m.default),
  en: () => import("@/i18n/dictionaries/en").then((m) => m.default),
  zh: () => import("@/i18n/dictionaries/zh").then((m) => m.default),
};

export const getDictionary = (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]();
