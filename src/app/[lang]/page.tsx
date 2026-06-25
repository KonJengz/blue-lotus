import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  ArrowRight,
  Award,
  Clock,
  Heart,
  MapPin,
  Phone,
  Sparkles,
  Train,
} from "lucide-react";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/locales";
import { durations, services, site } from "@/lib/site";
import { createPageMetadata, localBusinessJsonLd, safeJsonLd } from "@/lib/seo";
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
    route: "",
    title: dict.meta.home.title,
    description: dict.meta.home.description,
  });
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const base = `/${lang}`;
  const reviews = allReviews.map((review) => ({
    name: review.name,
    text: review.text[lang],
  }));

  const treatmentRoomImage = "/images/blue-lotus-treatment-room.jpg";
  const footMassageImage = "/images/blue-lotus-foot-massage.jpg";

  const imageAlt = {
    th: {
      treatmentRoom: "ห้องนวดบลูโลตัสพร้อมเตียงนวดและม่านผ้าไทย",
      footMassage: "บรรยากาศบริการนวดเท้าที่บลูโลตัส",
    },
    en: {
      treatmentRoom:
        "Blue Lotus treatment room with Thai massage beds and curtains",
      footMassage: "Foot massage treatment atmosphere at Blue Lotus",
    },
    zh: {
      treatmentRoom: "Blue Lotus 按摩房，设有泰式按摩床与布帘",
      footMassage: "Blue Lotus 足部按摩服务氛围",
    },
  }[lang];

  const startingPrice = (id: (typeof services)[number]["id"]) => {
    const svc = services.find((service) => service.id === id)!;
    const values = durations
      .map((duration) => svc.prices[duration])
      .filter((value): value is number => value != null);
    return Math.min(...values);
  };

  const fromLabel =
    lang === "th" ? "เริ่มต้น" : lang === "zh" ? "起价" : "From";

  const previewServices = services.slice(0, 4);
  const serviceImages = {
    thai: `${treatmentRoomImage}?service`,
    foot: `${footMassageImage}?service`,
    headNeckShoulder: `${treatmentRoomImage}?service`,
    herbalCompress: `${treatmentRoomImage}?service`,
    neckShoulderHot: `${treatmentRoomImage}?service`,
    footNeckShoulder: `${footMassageImage}?service`,
    oilHead: `${footMassageImage}?service`,
  } satisfies Record<(typeof services)[number]["id"], string>;
  const jsonLd = localBusinessJsonLd(lang, dict);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
      {/* ── Hero ── */}
      <section className="relative min-h-[85svh] overflow-hidden">
        <Image
          src={treatmentRoomImage}
          alt={imageAlt.treatmentRoom}
          fill
          className="object-cover"
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/50 to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[85svh] max-w-6xl items-end px-6 pb-20 lg:items-center lg:pb-0">
          <div className="max-w-lg">
            <p className="text-sm font-medium tracking-wide text-accent">
              {dict.hero.eyebrow}
            </p>

            <h1 className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl">
              {dict.hero.title}
            </h1>

            <p className="mt-5 text-base leading-relaxed text-white/80">
              {dict.hero.subtitle}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`${base}/contact/`}
                className="rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
              >
                {dict.hero.ctaPrimary}
              </Link>
              <Link
                href={`${base}/services/`}
                className="inline-flex items-center rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/60"
              >
                {dict.hero.ctaSecondary}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <p className="mt-6 flex items-center gap-2 text-sm text-white/70">
              <Clock className="h-4 w-4" />
              {dict.hero.openDaily}
            </p>
          </div>
        </div>
      </section>

      {/* ── Highlights strip ── */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-6xl divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {dict.highlights.items.map((item, i) => {
            const Icon = [Award, Sparkles, Train][i];
            return (
              <div
                key={item.title}
                className="flex flex-col items-center gap-2 px-6 py-8 md:py-16 text-center"
              >
                <Icon className="h-10 w-10 text-accent" strokeWidth={1} />
                <h2 className="mt-4 text-sm font-semibold text-foreground">
                  {item.title}
                </h2>
                <p className="text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── About ── */}
      <section className="bg-background">
        <div className="mx-auto grid max-w-6xl gap-0 lg:grid-cols-2">
          <div className="flex flex-col justify-center px-6 py-20 lg:pr-16">
            <p className="text-sm font-medium text-accent">
              {dict.highlights.heading}
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-foreground">
              {dict.intro.heading}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted">
              {dict.intro.body}
            </p>

            <ul className="mt-8 space-y-4">
              {dict.intro.values.map((v, i) => {
                const VIcon = [Heart, Sparkles, Award][i];
                return (
                  <li key={v.title} className="flex gap-3">
                    <VIcon
                      className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                      strokeWidth={1.5}
                    />
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">
                        {v.title}
                      </h3>
                      <p className="mt-0.5 text-sm text-muted">
                        {v.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <Link
              href={`${base}/our-story/`}
              className="mt-10 inline-flex w-fit items-center text-sm font-semibold text-accent transition-colors hover:text-accent/80"
            >
              {dict.nav.story}
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </div>

          <div className="relative min-h-[400px]">
            <Image
              src={footMassageImage}
              alt={imageAlt.footMassage}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>
      </section>

      {/* ── Services preview ── */}
      <section className="bg-surface-muted">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-semibold text-foreground">
                {dict.servicesPreview.heading}
              </h2>
              <p className="mt-2 max-w-lg text-base text-muted">
                {dict.servicesPreview.subtitle}
              </p>
            </div>
            <Link
              href={`${base}/services/`}
              className="inline-flex items-center text-sm font-semibold text-accent hover:text-accent/80"
            >
              {dict.servicesPreview.viewAll}
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {previewServices.map((svc) => (
              <Link
                key={svc.id}
                href={`${base}/services/`}
                className="group relative overflow-hidden rounded-md"
              >
                <div className="relative aspect-3/4">
                  <Image
                    src={serviceImages[svc.id]}
                    alt={dict.services.names[svc.id]}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="text-lg font-semibold text-white">
                    {dict.services.names[svc.id]}
                  </h3>
                  <p className="mt-1 text-sm text-white/80">
                    {fromLabel} {startingPrice(svc.id)} {dict.common.baht}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-foreground">
              {dict.testimonials.heading}
            </h2>
          </div>
          <div className="mt-12">
            <ReviewsGrid
              reviews={reviews}
              limit={3}
              readMoreText={dict.testimonials.readMore}
              readLessText={dict.testimonials.readLess}
              sourceText={dict.testimonials.source}
            />
          </div>
        </div>
      </section>

      {/* ── CTA bar ── */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold">{dict.hero.ctaPrimary}</h2>
            <p className="mt-1 text-sm text-primary-foreground/70">
              {dict.hero.openDaily}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={site.phoneHref}
              className="inline-flex items-center rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
            >
              <Phone className="mr-2 h-4 w-4" />
              {site.phone}
            </a>
            <Link
              href={`${base}/contact/`}
              className="inline-flex items-center rounded-md border border-primary-foreground/25 px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              <MapPin className="mr-2 h-4 w-4" />
              {dict.nav.contact}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
