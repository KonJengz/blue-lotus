"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { Locale } from "@/i18n/locales";
import type { Dictionary } from "@/i18n/types";

interface NavItem {
  href: string;
  label: string;
}

export function Navbar({
  lang,
  nav,
}: {
  lang: Locale;
  nav: Dictionary["nav"];
}) {
  const pathname = usePathname() ?? `/${lang}/`;
  const [open, setOpen] = useState(false);

  const base = `/${lang}`;
  const items: NavItem[] = [
    { href: `${base}/`, label: nav.home },
    { href: `${base}/our-story/`, label: nav.story },
    { href: `${base}/services/`, label: nav.services },
    { href: `${base}/reviews/`, label: nav.reviews },
    { href: `${base}/faq/`, label: nav.faq },
    { href: `${base}/contact/`, label: nav.contact },
  ];

  // Normalize trailing slashes for a reliable active-state comparison.
  const norm = (p: string) => (p.endsWith("/") ? p : `${p}/`);
  const isActive = (href: string) => norm(pathname) === norm(href);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6"
      >
        <Link
          href={`${base}/`}
          aria-label="Blue Lotus — home"
          className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <Logo />
        </Link>

        {/* Desktop navigation */}
        <ul className="hidden items-center gap-1 lg:flex">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-accent ${
                  isActive(item.href) ? "text-accent" : "text-foreground"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <LanguageSwitcher current={lang} label={nav.language} />
          </div>
          <ThemeToggle label={nav.toggleTheme} />

          <Link
            href={`${base}/contact/`}
            className="hidden rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 lg:inline-flex"
          >
            {nav.bookNow}
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={open ? nav.closeMenu : nav.openMenu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-foreground transition-colors hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden="true">
              {open ? (
                <path d="M6 6l12 12M18 6 6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`block rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-surface-muted ${
                    isActive(item.href) ? "text-accent" : "text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 flex items-center justify-between gap-3">
              <LanguageSwitcher current={lang} label={nav.language} />
              <Link
                href={`${base}/contact/`}
                onClick={() => setOpen(false)}
                className="inline-flex flex-1 justify-center rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"
              >
                {nav.bookNow}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
