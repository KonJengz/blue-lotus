import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import { LotusMark } from "@/components/Logo";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/locales";
import { services, durations, site } from "@/lib/site";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.meta.home.title,
    description: dict.meta.home.description,
  };
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const base = `/${lang}`;

  // Starting price = the cheapest duration offered for each treatment.
  const startingPrice = (id: (typeof services)[number]["id"]) => {
    const svc = services.find((s) => s.id === id)!;
    const values = durations
      .map((d) => svc.prices[d])
      .filter((v): v is number => v != null);
    return Math.min(...values);
  };

  const previewServices = services.slice(0, 4);
  const treatmentRoomImage = "/images/blue-lotus-treatment-room.jpg";
  const footMassageImage = "/images/blue-lotus-foot-massage.jpg";
  const imageAlt = {
    th: {
      treatmentRoom: "ห้องนวดบลูโลตัสพร้อมเตียงนวดและม่านผ้าไทย",
      footMassage: "บรรยากาศบริการนวดเท้าที่บลูโลตัส",
    },
    en: {
      treatmentRoom: "Blue Lotus treatment room with Thai massage beds and curtains",
      footMassage: "Foot massage treatment atmosphere at Blue Lotus",
    },
    zh: {
      treatmentRoom: "Blue Lotus 按摩房，设有泰式按摩床与布帘",
      footMassage: "Blue Lotus 足部按摩服务氛围",
    },
  }[lang];
  const servicePreviewImages = {
    thai: treatmentRoomImage,
    foot: footMassageImage,
    headNeckShoulder: footMassageImage,
    herbalCompress: treatmentRoomImage,
    neckShoulderHot: treatmentRoomImage,
    footNeckShoulder: footMassageImage,
    oilHead: footMassageImage,
  } satisfies Record<(typeof services)[number]["id"], string>;

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative h-[calc(86svh-4rem)] min-h-[480px] max-h-[760px] overflow-hidden border-b border-border bg-foreground text-white">
        <Image
          src={treatmentRoomImage}
          alt={imageAlt.treatmentRoom}
          fill
          className="object-cover object-center"
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/10" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/95 to-transparent" />

        <div className="relative z-10 mx-auto flex h-full max-w-6xl items-end px-4 py-10 sm:px-6 sm:py-12 lg:items-center lg:py-16">
          <div className="max-w-2xl space-y-5">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {dict.hero.eyebrow}
            </p>
            <h1 className="text-balance text-4xl font-semibold leading-tight text-white drop-shadow-sm sm:text-5xl lg:text-6xl animate-in fade-in slide-in-from-bottom-4 duration-700">
              {dict.hero.title}
            </h1>
            <p className="max-w-xl text-pretty text-base leading-relaxed text-white/90 sm:text-lg animate-in fade-in slide-in-from-bottom-6 duration-1000">
              {dict.hero.subtitle}
            </p>
            <div className="flex flex-wrap items-center gap-3 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
              <Link
                href={`${base}/contact/`}
                className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-md transition-all duration-300 hover:scale-[1.02] hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {dict.hero.ctaPrimary}
              </Link>
              <Link
                href={`${base}/services/`}
                className="inline-flex items-center justify-center rounded-lg border border-white/35 bg-black/20 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/70 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {dict.hero.ctaSecondary} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <p className="flex items-center gap-2 text-sm text-white/85">
              <span className="h-2 w-2 rounded-full bg-accent" />
              {dict.hero.openDaily}
            </p>
          </div>
        </div>
      </section>

      {/* ---------- Highlights ---------- */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-2xl font-semibold text-foreground sm:text-3xl">
          {dict.highlights.heading}
        </h2>
        <ul className="mt-10 grid gap-6 sm:grid-cols-3">
          {dict.highlights.items.map((item) => (
            <li
              key={item.title}
              className="rounded-lg border border-border bg-surface p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-accent/50"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Intro / values ---------- */}
      <section className="border-y border-border bg-surface-muted">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="relative min-h-[320px] overflow-hidden rounded-lg border border-border bg-surface shadow-sm sm:min-h-[420px]">
            <Image
              src={footMassageImage}
              alt={imageAlt.footMassage}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
              {dict.intro.heading}
            </h2>
            <p className="text-base leading-relaxed text-muted">
              {dict.intro.body}
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {dict.intro.values.map((v) => (
              <li
                key={v.title}
                className="rounded-lg border border-border bg-surface p-5 transition-all duration-300 hover:shadow-md hover:border-accent"
              >
                <h3 className="font-semibold text-accent">{v.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  {v.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Services preview ---------- */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
              {dict.servicesPreview.heading}
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted">
              {dict.servicesPreview.subtitle}
            </p>
          </div>
          <Link
            href={`${base}/services/`}
            className="shrink-0 text-sm font-semibold text-accent hover:underline"
          >
            {dict.servicesPreview.viewAll} →
          </Link>
        </div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {previewServices.map((svc) => (
            <li
              key={svc.id}
              className="group flex flex-col gap-3 rounded-lg border border-border bg-surface p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-accent"
            >
              <div className="mb-2 overflow-hidden rounded-md relative h-32 w-full">
                 <Image
                    src={servicePreviewImages[svc.id]}
                    alt={dict.services.names[svc.id]}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                 />
              </div>
              <LotusMark className="h-8 w-8 text-accent transition-transform duration-300 group-hover:rotate-12" />
              <h3 className="font-semibold text-foreground">
                {dict.services.names[svc.id]}
              </h3>
              <p className="mt-auto text-sm text-muted">
                {lang === "th" ? "เริ่มต้น" : lang === "zh" ? "起价" : "From"}{" "}
                <span className="font-semibold text-foreground">
                  {startingPrice(svc.id)} {dict.common.baht}
                </span>
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Closing CTA ---------- */}
      <section className="border-t border-border bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-4 py-14 text-center sm:px-6">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            {dict.hero.ctaPrimary}
          </h2>
          <p className="opacity-90">{dict.hero.openDaily}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={site.phoneHref}
              className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-all duration-300 hover:opacity-90 hover:scale-105 shadow-lg"
            >
              {site.phone}
            </a>
            <Link
              href={`${base}/contact/`}
              className="inline-flex items-center justify-center rounded-lg border border-primary-foreground/30 px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary-foreground/10 hover:border-primary-foreground"
            >
              <MapPin className="mr-2 h-4 w-4" /> {dict.nav.contact}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
