import type { Metadata } from "next";
import { RootLocaleRedirect } from "@/components/RootLocaleRedirect";
import { getDictionary } from "@/i18n/dictionaries";
import { defaultLocale } from "@/i18n/locales";
import { createPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary(defaultLocale);

  return {
    ...createPageMetadata({
      locale: defaultLocale,
      route: "",
      title: dict.meta.home.title,
      description: dict.meta.home.description,
    }),
    robots: {
      index: false,
      follow: true,
    },
  };
}

/**
 * Static export can't use middleware, so "/" redirects to the default locale on
 * the client while staying noindex to avoid duplicate locale content.
 */
export default function RootRedirect() {
  return <RootLocaleRedirect target={`/${defaultLocale}/`} />;
}
