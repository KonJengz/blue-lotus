import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Gift,
  Heart,
  Leaf,
  MapPin,
  Phone,
} from "lucide-react";
import { LotusMark } from "@/components/Logo";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/locales";
import { durations, services, site } from "@/lib/site";

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

  const startingPrice = (id: (typeof services)[number]["id"]) => {
    const svc = services.find((service) => service.id === id)!;
    const values = durations
      .map((duration) => svc.prices[duration])
      .filter((value): value is number => value != null);
    return Math.min(...values);
  };

  const fromLabel =
    lang === "th" ? "เริ่มต้น" : lang === "zh" ? "起价" : "From";

  const heroFacts = [
    { icon: Leaf, title: dict.highlights.items[0].title, body: dict.highlights.items[0].description },
    { icon: Clock, title: dict.hero.openDaily, body: dict.highlights.items[1].description },
    { icon: Heart, title: dict.highlights.items[1].title, body: dict.highlights.items[1].description },
    { icon: Gift, title: dict.highlights.items[2].title, body: dict.highlights.items[2].description },
  ];

  const previewServices = services.slice(0, 4);
  const serviceImages = {
    thai: `${treatmentRoomImage}?service`,
    foot: `${footMassageImage}?service`,
    headNeckShoulder: `${footMassageImage}?service`,
    herbalCompress: `${treatmentRoomImage}?service`,
    neckShoulderHot: `${treatmentRoomImage}?service`,
    footNeckShoulder: `${footMassageImage}?service`,
    oilHead: `${footMassageImage}?service`,
  } satisfies Record<(typeof services)[number]["id"], string>;

  return (
    <>
      <section className="relative min-h-[calc(100svh-5rem)] overflow-hidden border-b border-border bg-primary text-white">
        <Image
          src={treatmentRoomImage}
          alt={imageAlt.treatmentRoom}
          fill
          className="object-cover object-center"
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/35 to-black/5" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-linear-to-t from-background via-background/40 to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-5rem)] max-w-7xl items-end px-4 py-10 sm:px-6 lg:items-center lg:py-16">
          <div className="max-w-2xl pb-8 lg:pb-0">
            <p className="flex items-center gap-2 text-sm font-semibold text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {dict.hero.eyebrow}
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-tight text-white drop-shadow-sm sm:text-5xl lg:text-6xl">
              {dict.hero.title}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
              {dict.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`${base}/contact/`}
                className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-md transition-all hover:translate-y-[-1px] hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {dict.hero.ctaPrimary}
              </Link>
              <Link
                href={`${base}/services/`}
                className="inline-flex items-center justify-center rounded-md border border-white/35 bg-black/20 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/70 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {dict.hero.ctaSecondary}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <ul className="mx-auto grid max-w-7xl divide-y divide-border px-4 sm:px-6 md:grid-cols-4 md:divide-x md:divide-y-0">
          {heroFacts.map((item) => (
            <li key={item.title} className="flex items-center gap-4 py-7 md:px-6">
              <item.icon className="h-8 w-8 shrink-0 text-primary" strokeWidth={1.5} />
              <div>
                <h2 className="text-sm font-semibold text-foreground">
                  {item.title}
                </h2>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        <div className="grid gap-4 md:grid-cols-4">
          {previewServices.map((service) => (
            <Link
              key={service.id}
              href={`${base}/services/`}
              className="group relative min-h-[260px] overflow-hidden rounded-md bg-primary text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <Image
                src={serviceImages[service.id]}
                alt={dict.services.names[service.id]}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(min-width: 768px) 25vw, 100vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-center">
                <h2 className="text-2xl font-semibold">
                  {dict.services.names[service.id]}
                </h2>
                <p className="mx-auto mt-3 inline-flex rounded-md bg-primary/90 px-4 py-2 text-xs font-semibold text-primary-foreground">
                  {fromLabel} {startingPrice(service.id)} {dict.common.baht}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-7xl md:grid-cols-[1fr_1fr_0.54fr]">
          <div className="flex flex-col justify-center px-4 py-14 sm:px-8 lg:px-12">
            <p className="text-sm font-semibold text-accent">
              {dict.highlights.heading}
            </p>
            <h2 className="mt-4 max-w-md text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
              {dict.intro.heading}
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted">
              {dict.intro.body}
            </p>
            <Link
              href={`${base}/our-story/`}
              className="mt-8 inline-flex w-fit items-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:translate-y-[-1px] hover:opacity-95"
            >
              {dict.nav.story}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="relative min-h-[360px] border-y border-border md:border-x md:border-y-0">
            <Image
              src={footMassageImage}
              alt={imageAlt.footMassage}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 40vw, 100vw"
            />
          </div>

          <aside className="flex flex-col items-center justify-center gap-5 bg-surface-muted px-4 py-12 text-center sm:px-6">
            <LotusMark className="h-14 w-14 text-accent" />
            <h2 className="text-2xl font-semibold text-foreground">
              Blue Lotus
            </h2>
            <ul className="space-y-4">
              {dict.intro.values.map((value) => (
                <li
                  key={value.title}
                  className="mx-auto flex h-28 w-28 flex-col items-center justify-center rounded-full bg-surface px-4 shadow-sm"
                >
                  <CheckCircle2 className="h-6 w-6 text-accent" strokeWidth={1.5} />
                  <span className="mt-2 text-sm font-semibold text-foreground">
                    {value.title}
                  </span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">
              {dict.hero.ctaPrimary}
            </h2>
            <p className="mt-1 text-sm text-primary-foreground/75">
              {dict.hero.openDaily}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={site.phoneHref}
              className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-all hover:translate-y-[-1px] hover:opacity-95"
            >
              <Phone className="mr-2 h-4 w-4" />
              {site.phone}
            </a>
            <Link
              href={`${base}/contact/`}
              className="inline-flex items-center justify-center rounded-md border border-primary-foreground/25 px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
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
