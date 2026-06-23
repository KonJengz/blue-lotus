# Blue Lotus — Thai Therapeutic Massage

Static informational website for **Blue Lotus**, a Thai traditional massage shop
near BTS Khlong San. Built with Next.js 16 (App Router), TypeScript, Tailwind CSS
v4, and exported as a fully static site.

## Tech stack

- **Framework:** Next.js 16 (App Router) — `output: 'export'`
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Theme:** light/dark via `next-themes`
- **i18n:** route-based locales `th` (default), `en`, `zh`
- **Package manager:** Bun

## Getting started

```bash
bun install      # install dependencies
bun dev          # start the dev server → http://localhost:3000
bun run lint     # lint
bun run build    # static export → ./out
```

The dev server opens at `/` and redirects to `/th/`. The static export writes
HTML/CSS/JS into `out/`, which can be hosted on any static host.

## Project structure

```
src/
  app/
    layout.tsx             # root layout: <html>/<body> + ThemeProvider
    page.tsx               # bare "/" → redirects to /th/ (dev + export)
    [lang]/                # locale layout (Navbar/Footer) + pages
      page.tsx             # Home (hero, highlights, intro, services preview)
      our-story/page.tsx   # Our Story (Lanna heritage timeline)
      services/
        page.tsx           # Services price table
        loading.tsx        # skeleton (animate-pulse) for client navigation
      contact/page.tsx     # Contact info, socials, embedded map
    favicon.ico
  components/               # Navbar, Footer, ThemeToggle, LanguageSwitcher, HtmlLang, …
  i18n/
    locales.ts             # supported locales + guards
    types.ts               # Dictionary shape (keeps all locales in sync)
    dictionaries.ts        # server-only loader
    dictionaries/{th,en,zh}.ts
  lib/site.ts              # hardcoded business data + service prices
  styles/                  # globals.css (theme tokens) + font.ts
public/
  images/                  # drop real brand photos here (see below)
```

## How localization works

Every page lives under `src/app/[lang]/`. `generateStaticParams` prerenders one
route tree per locale, and `dynamicParams = false` 404s unknown locales. Copy lives
in server-loaded dictionaries (`src/i18n/dictionaries/*`), typed against
`Dictionary`, so a missing translation is a compile error. Because static export
has no middleware, the bare `/` redirects to `/th/` via a client redirect in
`src/app/page.tsx` (works in dev and in the export). The `<html lang>` defaults to
`th` and is synced per-locale on the client by `HtmlLang`.

## Replacing placeholder assets

The brand mark is currently a lightweight inline SVG (`src/components/Logo.tsx`).
To use the real artwork, drop the files into `public/images/` and swap the
`<LotusMark>` / hero panel for `next/image`:

- `public/images/logo.png` — official Blue Lotus logo (785836.jpg)
- `public/images/hero.jpg` — atmosphere/treatment photo for the home hero

`next.config.ts` already sets `images: { unoptimized: true }`, so local images
work without an image-optimization server.
