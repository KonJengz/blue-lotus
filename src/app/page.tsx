import type { Metadata } from "next";
import { RootLocaleRedirect } from "@/components/RootLocaleRedirect";
import { defaultLocale } from "@/i18n/locales";
import { absoluteUrl, languageAlternates, localizedPath } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: {
    canonical: absoluteUrl(localizedPath(defaultLocale)),
    languages: languageAlternates(""),
  },
  robots: {
    index: false,
    follow: true,
  },
};

/**
 * Static export can't use middleware, so "/" redirects to the default locale on
 * the client while staying noindex to avoid duplicate locale content.
 */
export default function RootRedirect() {
  return <RootLocaleRedirect target={`/${defaultLocale}/`} />;
}
