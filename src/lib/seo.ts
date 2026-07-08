import type { Metadata } from "next";
import type { Dictionary } from "@/i18n/types";
import { type Locale, locales, defaultLocale } from "@/i18n/locales";
import { durations, services, site } from "@/lib/site";
import { allReviews } from "@/lib/reviews";

export type PublicRoute =
  | ""
  | "/services"
  | "/our-story"
  | "/contact"
  | "/reviews"
  | "/faq";

export const publicRoutes: PublicRoute[] = [
  "",
  "/services",
  "/our-story",
  "/contact",
  "/reviews",
  "/faq",
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
    th: "ห้องนวดไทยภายในร้านบลูโลตัส",
    en: "Thai massage treatment room at Blue Lotus",
    zh: "Blue Lotus 店内的泰式按摩房",
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
          type: "image/jpeg",
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

export function localBusinessJsonLd(
  locale: Locale,
  dict: Dictionary,
  options: { includeReviews?: boolean } = {}
) {
  const url = absoluteUrl(localizedPath(locale));
  const image = absoluteUrl("/images/blue-lotus-logo-icon-mask.png");

  const reviewCount = allReviews.length;
  const ratingValue =
    reviewCount === 0
      ? 0
      : allReviews.reduce((sum, review) => sum + review.rating, 0) / reviewCount;

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
      postalCode: "10600",
      addressCountry: "TH",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
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
      site.socials.line,
      site.socials.instagram,
      site.socials.tiktok,
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: Number(ratingValue.toFixed(1)),
      reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    // Individual reviews are only marked up where they are actually shown (the
    // Reviews page), per structured-data guidelines.
    ...(options.includeReviews
      ? {
          review: allReviews.map((review) => ({
            "@type": "Review",
            author: { "@type": "Person", name: review.name },
            reviewRating: {
              "@type": "Rating",
              ratingValue: review.rating,
              bestRating: 5,
              worstRating: 1,
            },
            reviewBody: review.text[locale],
          })),
        }
      : {}),
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

export function faqPageJsonLd(locale: Locale, dict: Dictionary) {
  const url = absoluteUrl(localizedPath(locale, "/faq"));

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    url,
    inLanguage: locale,
    mainEntity: dict.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(
  locale: Locale,
  crumbs: { name: string; route: PublicRoute }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(localizedPath(locale, crumb.route)),
    })),
  };
}

export function servicesJsonLd(locale: Locale, dict: Dictionary) {
  const businessId = `${absoluteUrl(localizedPath(locale))}#business`;

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: dict.services.heading,
    itemListElement: services.map((service, index) => {
      const values = durations
        .map((duration) => service.prices[duration])
        .filter((value): value is number => value != null);

      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Service",
          name: dict.services.names[service.id],
          serviceType: dict.services.names[service.id],
          provider: { "@id": businessId },
          areaServed: "Bangkok",
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "THB",
            lowPrice: Math.min(...values),
            highPrice: Math.max(...values),
            offerCount: values.length,
            availability: "https://schema.org/InStock",
          },
        },
      };
    }),
  };
}

export function safeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
