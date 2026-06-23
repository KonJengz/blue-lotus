/**
 * Hardcoded business data for Blue Lotus Thai Therapeutic Massage.
 * Locale-independent facts live here; translated labels live in the dictionaries.
 */

export const site = {
  name: "Blue Lotus",
  fullName: "Blue Lotus — Thai Therapeutic Massage",
  phone: "081-632-6244",
  phoneHref: "tel:+66816326244",
  hours: { open: "10:00", close: "21:00" },
  // BTS Khlong San (Soi Somdet Chao Phraya 17)
  mapUrl: "https://maps.app.goo.gl/x1ptbgRXhFzidjo1A",
  // Keyless Google Maps embed for the area.
  mapEmbedUrl:
    "https://www.google.com/maps?q=Soi%20Somdet%20Chao%20Phraya%2017%2C%20Khlong%20San%2C%20Bangkok&output=embed",
  socials: {
    facebook: "https://www.facebook.com/bluelotus.th/",
    instagram: "https://www.instagram.com/bluelotusspa.th/",
    tiktok: "https://www.tiktok.com/@bluelotus512",
  },
} as const;

/** Service durations, in minutes, shown as columns in the price table. */
export const durations = [60, 90, 120] as const;
export type Duration = (typeof durations)[number];

export type ServiceId =
  | "thai"
  | "foot"
  | "headNeckShoulder"
  | "herbalCompress"
  | "neckShoulderHot"
  | "footNeckShoulder"
  | "oilHead";

export interface Service {
  id: ServiceId;
  /** Price in THB per duration; `null` means not offered at that duration. */
  prices: Record<Duration, number | null>;
}

/** Prices transcribed from the shop's official service menu (771998.jpg). */
export const services: Service[] = [
  { id: "thai", prices: { 60: 300, 90: 450, 120: 550 } },
  { id: "foot", prices: { 60: 300, 90: 450, 120: 550 } },
  { id: "headNeckShoulder", prices: { 60: 350, 90: 550, 120: 650 } },
  { id: "herbalCompress", prices: { 60: null, 90: 800, 120: 1200 } },
  { id: "neckShoulderHot", prices: { 60: 450, 90: 800, 120: 1200 } },
  { id: "footNeckShoulder", prices: { 60: 350, 90: 500, 120: 900 } },
  { id: "oilHead", prices: { 60: 500, 90: 750, 120: 900 } },
];
