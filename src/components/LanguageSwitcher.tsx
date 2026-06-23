"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { locales, localeLabels, type Locale } from "@/i18n/locales";

/**
 * Swaps the leading locale segment of the current path while keeping the rest
 * of the route, so switching language stays on the same page.
 */
function withLocale(pathname: string, next: Locale): string {
  const segments = pathname.split("/"); // ["", "en", "services", ""]
  segments[1] = next;
  return segments.join("/") || "/";
}

export function LanguageSwitcher({
  current,
  label,
}: {
  current: Locale;
  label: string;
}) {
  const pathname = usePathname() ?? `/${current}/`;
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-border bg-surface px-3 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
        </svg>
        {localeLabels[current]}
      </button>

      {open && (
        <>
          {/* click-away backdrop */}
          <button
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            className="fixed inset-0 z-10 cursor-default"
            onClick={() => setOpen(false)}
          />
          <ul
            role="menu"
            className="absolute right-0 z-20 mt-2 w-32 overflow-hidden rounded-lg border border-border bg-surface py-1 shadow-lg"
          >
            {locales.map((locale) => (
              <li key={locale} role="none">
                <Link
                  role="menuitem"
                  href={withLocale(pathname, locale)}
                  onClick={() => setOpen(false)}
                  aria-current={locale === current ? "true" : undefined}
                  className={`block px-4 py-2 text-sm transition-colors hover:bg-surface-muted ${
                    locale === current
                      ? "font-semibold text-accent"
                      : "text-foreground"
                  }`}
                >
                  {localeLabels[locale]}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
