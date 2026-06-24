import type { MetadataRoute } from "next";
import {
  absoluteUrl,
  languageAlternates,
  localizedPath,
  publicRoutes,
  type PublicRoute,
} from "@/lib/seo";
import { defaultLocale, locales } from "@/i18n/locales";

export const dynamic = "force-static";

const priorities: Record<PublicRoute, number> = {
  "": 1,
  "/services": 0.9,
  "/contact": 0.8,
  "/our-story": 0.7,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return publicRoutes.flatMap((route) =>
    locales.map((locale) => {
      const priority =
        locale === defaultLocale ? priorities[route] : priorities[route] - 0.05;

      return {
        url: absoluteUrl(localizedPath(locale, route)),
        lastModified,
        changeFrequency: "monthly" as const,
        priority: Number(priority.toFixed(2)),
        alternates: {
          languages: languageAlternates(route),
        },
      };
    })
  );
}
