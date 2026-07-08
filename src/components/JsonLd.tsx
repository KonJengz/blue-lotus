import { safeJsonLd } from "@/lib/seo";

/**
 * Renders a JSON-LD structured-data script. Server component; the object is
 * serialized with `<` escaped so it is safe to inline.
 */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(data) }}
    />
  );
}
