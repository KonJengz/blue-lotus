import en from "@/i18n/dictionaries/en";
import { absoluteUrl, localizedPath, type PublicRoute } from "@/lib/seo";
import { durations, services, site } from "@/lib/site";

// Emit a static /llms.txt at build time (GET-only, no request data).
export const dynamic = "force-static";

/**
 * llms.txt — a concise, factual summary for LLMs / answer engines (GEO).
 * Convention: https://llmstxt.org
 */
export function GET() {
  const url = (route: PublicRoute = "") => absoluteUrl(localizedPath("en", route));

  const startingPrice = (id: (typeof services)[number]["id"]) => {
    const svc = services.find((s) => s.id === id)!;
    const values = durations
      .map((d) => svc.prices[d])
      .filter((v): v is number => v != null);
    return Math.min(...values);
  };

  const serviceLines = services
    .map(
      (svc) =>
        `- ${en.services.names[svc.id]} — from ${startingPrice(svc.id)} THB (60/90/120 min)`
    )
    .join("\n");

  const body = `# Blue Lotus — Thai Therapeutic Massage

> Traditional Thai therapeutic massage studio near BTS Khlong San, Bangkok, rooted in Lanna healing wisdom. Open daily ${site.hours.open}–${site.hours.close}. Website available in Thai, English and Chinese.

## Key facts
- Business: ${site.fullName}
- Location: Soi Somdet Chao Phraya 17, Khlong San, Bangkok — near BTS Khlong San
- Opening hours: Every day, ${site.hours.open}–${site.hours.close}
- Phone / booking: ${site.phone} (Khun Krit)
- Languages: Thai, English, Chinese
- Map: ${site.mapUrl}

## Services and starting prices (Thai Baht, per person)
${serviceLines}

## Pages
- Home: ${url("")}
- Services & prices: ${url("/services")}
- Our story: ${url("/our-story")}
- Customer reviews: ${url("/reviews")}
- FAQ: ${url("/faq")}
- Contact: ${url("/contact")}

## Other languages
- Thai (default): ${absoluteUrl(localizedPath("th"))}
- Chinese: ${absoluteUrl(localizedPath("zh"))}

## Social
- Facebook: ${site.socials.facebook}
- Instagram: ${site.socials.instagram}
- TikTok: ${site.socials.tiktok}
- LINE: ${site.socials.line}

## Notes
- Informational website only; there is no online booking. Reservations are made by phone or social media.
- Massage is a wellness service for relaxation, not a substitute for medical care.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
