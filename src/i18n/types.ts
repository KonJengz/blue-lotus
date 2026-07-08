import type { ServiceId } from "@/lib/site";

/**
 * Shared shape for every locale dictionary. Each `th`/`en`/`zh` file must
 * implement this exactly, so a missing key becomes a compile-time error.
 */
export interface PageMeta {
  title: string;
  description: string;
}

export interface Dictionary {
  meta: {
    home: PageMeta;
    story: PageMeta;
    services: PageMeta;
    contact: PageMeta;
    reviews: PageMeta;
    faq: PageMeta;
  };
  nav: {
    home: string;
    story: string;
    services: string;
    contact: string;
    reviews: string;
    faq: string;
    bookNow: string;
    openMenu: string;
    closeMenu: string;
    language: string;
    toggleTheme: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    openDaily: string;
  };
  highlights: {
    heading: string;
    items: { title: string; description: string }[];
  };
  intro: {
    heading: string;
    body: string;
    values: { title: string; description: string }[];
  };
  servicesPreview: {
    heading: string;
    subtitle: string;
    viewAll: string;
  };
  faq: {
    heading: string;
    subtitle: string;
    items: { question: string; answer: string }[];
  };
  testimonials: {
    heading: string;
    readMore: string;
    readLess: string;
    source: string;
    viewAll: string;
  };
  story: {
    heading: string;
    intro: string;
    sections: { title: string; body: string }[];
  };
  services: {
    heading: string;
    subtitle: string;
    durationHeading: string;
    serviceHeading: string;
    priceNote: string;
    notAvailable: string;
    names: Record<ServiceId, string>;
    safetyTitle: string;
    safetyBody: string;
  };
  contact: {
    heading: string;
    subtitle: string;
    hoursLabel: string;
    locationLabel: string;
    phoneLabel: string;
    contactPerson: string;
    followLabel: string;
    mapCta: string;
    callCta: string;
  };
  footer: {
    tagline: string;
    quickLinks: string;
    visitUs: string;
    followUs: string;
    rights: string;
  };
  common: {
    baht: string;
    minutes: string;
    minutesShort: string;
  };
}
