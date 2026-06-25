import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/locales";
import { createPageMetadata } from "@/lib/seo";
import { allReviews } from "@/lib/reviews";
import { ReviewsGrid } from "@/components/ReviewsGrid";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return createPageMetadata({
    locale: lang,
    route: "/reviews",
    title: dict.meta.reviews.title,
    description: dict.meta.reviews.description,
  });
}

export default async function ReviewsPage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const reviews = allReviews.map((review) => ({
    name: review.name,
    text: review.text[lang],
  }));

  return (
    <>
      <div className="bg-surface-muted px-6 py-16 text-center sm:py-24">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {dict.nav.reviews}
        </h1>
        <p className="mt-4 text-base text-muted max-w-2xl mx-auto">
          {dict.meta.reviews.description}
        </p>
      </div>

      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <ReviewsGrid
            reviews={reviews}
            readMoreText={dict.testimonials.readMore}
            readLessText={dict.testimonials.readLess}
            sourceText={dict.testimonials.source}
          />
        </div>
      </section>
    </>
  );
}
