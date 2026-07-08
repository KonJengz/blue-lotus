import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/locales";
import {
  breadcrumbJsonLd,
  createPageMetadata,
  faqPageJsonLd,
} from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/faq">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return createPageMetadata({
    locale: lang,
    route: "/faq",
    title: dict.meta.faq.title,
    description: dict.meta.faq.description,
  });
}

export default async function FaqPage({ params }: PageProps<"/[lang]/faq">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const base = `/${lang}`;

  // FAQPage structured data — derived from the same dictionary content so the
  // answers stay in sync and are extractable by search / answer engines.
  const jsonLd = faqPageJsonLd(lang, dict);

  const ctaLead =
    lang === "th"
      ? "ยังมีคำถามอื่นอีกไหม? ทักหาเราได้เลย"
      : lang === "zh"
        ? "还有其他问题吗？欢迎联系我们。"
        : "Still have a question? Get in touch.";

  return (
    <div>
      <JsonLd data={jsonLd} />
      <JsonLd
        data={breadcrumbJsonLd(lang, [
          { name: dict.nav.home, route: "" },
          { name: dict.nav.faq, route: "/faq" },
        ])}
      />

      {/* Header */}
      <header className="border-b border-border bg-surface-muted">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {dict.faq.heading}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted">
            {dict.faq.subtitle}
          </p>
        </div>
      </header>

      {/* Accordion. Answers live in the DOM (collapsed, not removed) so crawlers
          and answer engines can read every one. */}
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="space-y-4">
          {dict.faq.items.map((item) => (
            <details
              key={item.question}
              className="group rounded-lg border border-border bg-surface p-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
                <h2 className="text-base font-semibold text-foreground">
                  {item.question}
                </h2>
                <ChevronDown
                  className="h-5 w-5 shrink-0 text-accent transition-transform group-open:rotate-180"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {item.answer}
              </p>
            </details>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-10 rounded-lg border border-accent/30 bg-accent/5 p-6 text-center">
          <p className="text-sm text-muted">{ctaLead}</p>
          <Link
            href={`${base}/contact/`}
            className="mt-4 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            {dict.nav.contact}
          </Link>
        </div>
      </section>
    </div>
  );
}
