import type { Metadata } from "next";
import type { Dictionary } from "@/i18n/types";
import { type Locale, locales, defaultLocale } from "@/i18n/locales";
import { durations, services, site } from "@/lib/site";

export type PublicRoute = "" | "/services" | "/our-story" | "/contact";

export const publicRoutes: PublicRoute[] = [
  "",
  "/services",
  "/our-story",
  "/contact",
];

export const siteOrigin = site.url.replace(/\/+$/, "");

export function localizedPath(locale: Locale, route: PublicRoute = "") {
  return `/${locale}${route}/`;
}

export function absoluteUrl(path: string) {
  return new URL(path, `${siteOrigin}/`).toString();
}

export function languageAlternates(route: PublicRoute) {
  return {
    ...Object.fromEntries(
      locales.map((locale) => [locale, absoluteUrl(localizedPath(locale, route))])
    ),
    "x-default": absoluteUrl(localizedPath(defaultLocale, route)),
  };
}

function ogLocale(locale: Locale) {
  const map: Record<Locale, string> = {
    th: "th_TH",
    en: "en_US",
    zh: "zh_CN",
  };
  return map[locale];
}

function imageAlt(locale: Locale) {
  const map: Record<Locale, string> = {
    th: "ห้องนวดบลูโลตัสพร้อมเตียงนวดและม่านผ้าไทย",
    en: "Blue Lotus treatment room with Thai massage beds and curtains",
    zh: "Blue Lotus 按摩房，设有泰式按摩床与布帘",
  };
  return map[locale];
}

export function createPageMetadata({
  locale,
  route,
  title,
  description,
}: {
  locale: Locale;
  route: PublicRoute;
  title: string;
  description: string;
}): Metadata {
  const url = absoluteUrl(localizedPath(locale, route));
  const image = absoluteUrl("/images/blue-lotus-treatment-room.jpg");

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(route),
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      title,
      description,
      url,
      locale: ogLocale(locale),
      alternateLocale: locales
        .filter((item) => item !== locale)
        .map((item) => ogLocale(item)),
      images: [
        {
          url: image,
          width: 2400,
          height: 1600,
          alt: imageAlt(locale),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function localBusinessJsonLd(locale: Locale, dict: Dictionary) {
  const url = absoluteUrl(localizedPath(locale));
  const image = absoluteUrl("/images/blue-lotus-treatment-room.jpg");

  return {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "@id": `${url}#business`,
    name: site.fullName,
    alternateName: site.name,
    url,
    image,
    description: dict.meta.home.description,
    telephone: site.phone,
    priceRange: "฿฿",
    currenciesAccepted: "THB",
    hasMap: site.mapUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Soi Somdet Chao Phraya 17",
      addressLocality: "Khlong San",
      addressRegion: "Bangkok",
      addressCountry: "TH",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: site.hours.open,
        closes: site.hours.close,
      },
    ],
    sameAs: [
      site.socials.facebook,
      site.socials.instagram,
      site.socials.tiktok,
    ],
    makesOffer: services.map((service) => {
      const values = durations
        .map((duration) => service.prices[duration])
        .filter((value): value is number => value != null);

      return {
        "@type": "AggregateOffer",
        itemOffered: {
          "@type": "Service",
          name: dict.services.names[service.id],
          serviceType: dict.services.names[service.id],
        },
        priceCurrency: "THB",
        lowPrice: Math.min(...values),
        highPrice: Math.max(...values),
        offerCount: values.length,
        availability: "https://schema.org/InStock",
      };
    }),
  };
}

export function safeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
