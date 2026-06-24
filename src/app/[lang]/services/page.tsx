import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, MapPin, Phone, ShieldAlert } from "lucide-react";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/locales";
import { services, durations, site } from "@/lib/site";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/services">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.meta.services.title,
    description: dict.meta.services.description,
  };
}

export default async function ServicesPage({
  params,
}: PageProps<"/[lang]/services">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const base = `/${lang}`;
  const s = dict.services;

  const priceLabel = (value: number | null) =>
    value == null ? s.notAvailable : `${value.toLocaleString()}`;

  return (
    <div>
      {/* Header */}
      <header className="border-b border-border bg-surface-muted">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {s.heading}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted">
            {s.subtitle}
          </p>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-sm text-muted">
            <Clock className="h-4 w-4" />
            {dict.hero.openDaily}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        {/* Desktop table */}
        <div className="hidden overflow-hidden rounded-lg border border-border md:block">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">{s.heading}</caption>
            <thead className="bg-surface-muted">
              <tr>
                <th scope="col" className="px-5 py-4 text-sm font-semibold text-foreground">
                  {s.serviceHeading}
                </th>
                {durations.map((d) => (
                  <th
                    key={d}
                    scope="col"
                    className="px-5 py-4 text-right text-sm font-semibold text-foreground"
                  >
                    {d} {dict.common.minutesShort}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {services.map((svc) => (
                <tr
                  key={svc.id}
                  className="border-t border-border odd:bg-surface even:bg-surface/40"
                >
                  <th
                    scope="row"
                    className="px-5 py-4 text-sm font-medium text-foreground"
                  >
                    {s.names[svc.id]}
                  </th>
                  {durations.map((d) => (
                    <td
                      key={d}
                      className="px-5 py-4 text-right text-sm tabular-nums text-muted"
                    >
                      {priceLabel(svc.prices[d])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <ul className="space-y-4 md:hidden">
          {services.map((svc) => (
            <li
              key={svc.id}
              className="rounded-lg border border-border bg-surface p-5"
            >
              <h2 className="text-base font-semibold text-foreground">
                {s.names[svc.id]}
              </h2>
              <dl className="mt-4 grid grid-cols-3 gap-3 text-center">
                {durations.map((d) => (
                  <div
                    key={d}
                    className="rounded-md bg-surface-muted px-2 py-3"
                  >
                    <dt className="text-xs text-muted">
                      {d} {dict.common.minutesShort}
                    </dt>
                    <dd className="mt-1 text-sm font-semibold tabular-nums text-foreground">
                      {priceLabel(svc.prices[d])}
                    </dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ul>

        <p className="mt-4 text-xs text-muted">{s.priceNote}</p>

        {/* Safety note */}
        <section className="mt-10 rounded-lg border border-accent/30 bg-accent/5 p-6">
          <h2 className="flex items-center gap-2 text-base font-semibold text-foreground">
            <ShieldAlert className="h-5 w-5 text-accent" strokeWidth={1.5} />
            {s.safetyTitle}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {s.safetyBody}
          </p>
        </section>

        {/* CTA */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href={site.phoneHref}
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Phone className="mr-2 h-4 w-4" />
            {dict.contact.callCta} · {site.phone}
          </a>
          <Link
            href={`${base}/contact/`}
            className="inline-flex items-center justify-center rounded-lg border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface-muted"
          >
            <MapPin className="mr-2 h-4 w-4" />
            {dict.nav.contact}
          </Link>
        </div>
      </div>
    </div>
  );
}
