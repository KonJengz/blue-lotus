import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/components/Logo";
import { SocialLinks } from "@/components/SocialLinks";
import { site } from "@/lib/site";
import type { Locale } from "@/i18n/locales";
import type { Dictionary } from "@/i18n/types";

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const base = `/${lang}`;
  const { footer, nav, contact } = dict;
  const year = new Date().getFullYear();

  const quickLinks = [
    { href: `${base}/`, label: nav.home },
    { href: `${base}/our-story/`, label: nav.story },
    { href: `${base}/services/`, label: nav.services },
    { href: `${base}/reviews/`, label: nav.reviews },
    { href: `${base}/faq/`, label: nav.faq },
    { href: `${base}/contact/`, label: nav.contact },
  ];

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pt-12 pb-20 lg:pb-30 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-muted">
            {footer.tagline}
          </p>
          <SocialLinks />
        </div>

        {/* Quick links */}
        <nav aria-label={footer.quickLinks} className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
            {footer.quickLinks}
          </h2>
          <ul className="space-y-2">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-muted transition-colors hover:text-accent"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Visit us */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
            {footer.visitUs}
          </h2>
          <ul className="space-y-4 text-sm text-muted">
            <li>
              <span className="block font-medium text-foreground">
                {contact.hoursLabel}
              </span>
              {site.hours.open} – {site.hours.close}
            </li>
            <li>
              <span className="block font-medium text-foreground">
                {contact.locationLabel}
              </span>
              BTS {lang === "th" ? "คลองสาน" : "Khlong San"} ·{" "}
              {lang === "th"
                ? "ซอยสมเด็จเจ้าพระยา 17"
                : "Soi Somdet Chao Phraya 17"}
            </li>
            <li>
              <span className="block font-medium text-foreground">
                {contact.phoneLabel}
              </span>
              <a
                href={site.phoneHref}
                className="transition-colors hover:text-accent"
              >
                {site.phone}
              </a>{" "}
              · {contact.contactPerson}
            </li>
          </ul>
        </div>

        {/* Map */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
            {lang === "th" ? "แผนที่" : lang === "zh" ? "地图" : "Map"}
          </h2>
          <a
            href={site.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block overflow-hidden rounded-md border border-border transition-colors hover:border-accent"
          >
            <div className="relative aspect-square w-full">
              <Image
                src="/images/map.png"
                alt="Blue Lotus Location Map"
                fill
                className="object-cover opacity-90 transition-opacity group-hover:opacity-100"
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
              />
            </div>
          </a>
        </div>
      </div>

      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-muted sm:px-6">
          © {year} {site.name}. {footer.rights}
        </p>
      </div>
    </footer>
  );
}
