import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookOpen } from "lucide-react";
import { LotusMark } from "@/components/Logo";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/locales";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/our-story">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.meta.story.title,
    description: dict.meta.story.description,
  };
}

export default async function OurStoryPage({
  params,
}: PageProps<"/[lang]/our-story">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <article>
      {/* Page header */}
      <header className="border-b border-border bg-surface-muted">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
          <LotusMark className="mx-auto h-12 w-12 text-accent" />
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {dict.story.heading}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted">
            {dict.story.intro}
          </p>
        </div>
      </header>

      {/* Timeline */}
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <ol className="relative space-y-12 border-s border-border ps-8">
          {dict.story.sections.map((section, i) => (
            <li key={section.title} className="relative">
              <span
                aria-hidden="true"
                className="absolute -inset-s-12 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface text-sm font-semibold text-accent"
              >
                {i === 0 ? (
                  <BookOpen className="h-4 w-4" strokeWidth={1.5} />
                ) : (
                  i + 1
                )}
              </span>
              <h2 className="text-xl font-semibold text-foreground">
                {section.title}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted">
                {section.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </article>
  );
}
