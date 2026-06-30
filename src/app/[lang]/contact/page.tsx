import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock, ExternalLink, MapPin, Phone, Share2 } from "lucide-react";
import { SocialLinks } from "@/components/SocialLinks";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/locales";
import { site } from "@/lib/site";
import { createPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return createPageMetadata({
    locale: lang,
    route: "/contact",
    title: dict.meta.contact.title,
    description: dict.meta.contact.description,
  });
}

export default async function ContactPage({
  params,
}: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const c = dict.contact;

  const location =
    lang === "th"
      ? "BTS คลองสาน (ซอยสมเด็จเจ้าพระยา 17)"
      : lang === "zh"
        ? "BTS 空讪站（Soi Somdet Chao Phraya 17）"
        : "BTS Khlong San (Soi Somdet Chao Phraya 17)";

  return (
    <div>
      {/* Header */}
      <header className="border-b border-border bg-surface-muted">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {c.heading}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted">
            {c.subtitle}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Info cards */}
          <div className="space-y-4">
            <InfoCard
              label={c.hoursLabel}
              icon={<Clock className="h-5 w-5 text-accent" strokeWidth={1.5} />}
            >
              {site.hours.open} – {site.hours.close}
              <span className="block text-sm text-muted">
                {dict.hero.openDaily}
              </span>
            </InfoCard>

            <InfoCard
              label={c.locationLabel}
              icon={
                <MapPin className="h-5 w-5 text-accent" strokeWidth={1.5} />
              }
            >
              {location}
            </InfoCard>

            <InfoCard
              label={c.phoneLabel}
              icon={<Phone className="h-5 w-5 text-accent" strokeWidth={1.5} />}
            >
              <a
                href={site.phoneHref}
                className="font-medium text-foreground transition-colors hover:text-accent"
              >
                {site.phone}
              </a>
              <span className="block text-sm text-muted">
                {c.contactPerson}
              </span>
            </InfoCard>

            <div className="rounded-lg border border-border bg-surface p-5">
              <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-foreground">
                <Share2 className="h-4 w-4 text-accent" strokeWidth={1.5} />
                {c.followLabel}
              </h2>
              <SocialLinks className="mt-3" />
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={site.phoneHref}
                className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Phone className="mr-2 h-4 w-4" />
                {c.callCta}
              </a>
              <a
                href={site.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface-muted"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                {c.mapCta}
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="overflow-hidden rounded-lg border border-border">
            <iframe
              title={c.locationLabel}
              src={site.mapEmbedUrl}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              className="h-80 w-full lg:h-full lg:min-h-112"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  label,
  icon,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border bg-surface p-5">
      <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted">
        {icon}
        {label}
      </h2>
      <div className="mt-2 text-lg font-medium text-foreground">{children}</div>
    </div>
  );
}
