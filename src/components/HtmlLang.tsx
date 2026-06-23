"use client";

import { useEffect } from "react";
import type { Locale } from "@/i18n/locales";

/**
 * Keeps the document's <html lang> in sync with the active locale.
 * The root layout renders a default `lang="th"`; this updates it on the client
 * for `/en` and `/zh` so assistive tech and translation tools see the right one.
 */
export function HtmlLang({ lang }: { lang: Locale }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}
