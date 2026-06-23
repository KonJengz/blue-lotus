<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project Brief

This project is a Next.js 16 App Router website for a Thai traditional massage shop. It is an informational marketing website only. Keep the product surface focused on presenting the business, services, opening hours, location, contact details, prices or packages, safety notes, FAQs, and trust-building content.

The site must support Thai, English, and Simplified Chinese content. Use `th`, `en`, and `zh` as the supported locales, with Thai as the default unless the user asks otherwise. Keep the supported locale list in `src/i18n/locales.ts` as the single source of truth. Do not add booking, payments, account, ecommerce, auth, dashboards, CMS, or form submission flows unless the user explicitly requests them.

# Tooling

- Use Bun for all package and script operations.
- Use `bun install` for dependency installation.
- Use `bun add <package>` and `bun add -d <package>` for new dependencies.
- Use `bun dev`, `bun run build`, and `bun run lint` for development, production validation, and linting.
- Do not create or update `package-lock.json`, `yarn.lock`, or `pnpm-lock.yaml`. Keep `bun.lock` as the lockfile.
- Prefer no new dependencies for a static informational site. Add packages only when they clearly reduce complexity or match an existing project pattern.

# Next.js 16 Practices

- Before editing Next.js code, read the relevant docs in `node_modules/next/dist/docs/`, especially App Router, routing conventions, Server and Client Components, loading UI, metadata, images, fonts, and internationalization.
- Use the App Router under `src/app`. Do not add the Pages Router.
- Keep pages and layouts as Server Components by default. Add `"use client"` only to small leaf components that need state, event handlers, effects, browser APIs, or custom client hooks.
- In this Next.js version, route `params` and `searchParams` are promises in App Router examples. Await them or use the typed helpers such as `PageProps<'/[lang]'>` and `LayoutProps<'/[lang]'>` where appropriate.
- Use `next/link` for internal navigation and locale switching.
- Use `next/image` for real site imagery. Provide meaningful `alt`, stable dimensions or `fill` with a stable parent size, and narrow `remotePatterns` in `next.config.ts` if remote images are needed.
- Use `next/font` for fonts and keep font setup centralized, currently via `src/styles/font.ts`.
- Use the Metadata API (`metadata` or `generateMetadata`) for titles, descriptions, Open Graph data, and locale alternates. Metadata exports are Server Component only.
- Avoid runtime APIs such as `cookies()`, `headers()`, and uncached fetches in layouts unless required. They can make routes dynamic and can bypass segment-level `loading.tsx` fallbacks.

# Internationalization

- Prefer route-based localization with `src/app/[lang]/...`.
- Validate locales with a shared source such as `src/i18n/locales.ts`. Invalid locales should call `notFound()`.
- Keep translations in server-loaded dictionaries, for example `src/i18n/dictionaries/th.ts`, `src/i18n/dictionaries/en.ts`, and `src/i18n/dictionaries/zh.ts`, or JSON dictionary files if the project moves that direction.
- Do not hard-code user-facing copy directly inside reusable components when it needs translation. Pass translated strings from the page or dictionary layer.
- Generate static locale params for public routes from the shared `locales` array, not from hard-coded duplicated arrays.
- Set `<html lang={lang}>` from the active locale. Use `zh` for Simplified Chinese unless the project later needs region-specific tags such as `zh-CN`.
- Use localized metadata. Include canonical and alternate language URLs when routes are locale-specific.
- Thai copy should sound natural and respectful. English copy should be clear and not overly literal. Chinese copy should read naturally for travelers and avoid machine-translated phrasing. Keep claims factual and avoid medical cure guarantees.

# Recommended Site Content

- Include a complete services and price table with duration, price, and a short explanation of who each massage is suitable for.
- Add a clear contact section with phone, map link, opening hours, nearby landmark or transit details, and social links.
- Add a concise FAQ covering walk-ins, reservations, what to prepare before massage, payment methods, language support, and safety limitations.
- Add a safety and suitability section that explains when customers should inform staff before massage.
- Add trust signals only when true: therapist experience, training, hygiene standards, real shop photos, reviews, official social links, and business registration or certification details.
- Add practical visitor information for tourists: location directions, parking or transit notes, accepted payment methods, and whether staff can communicate in Thai, English, or Chinese.
- Add a gallery only with real shop, room, treatment, or atmosphere images. Avoid generic stock photos when the user needs to assess the actual place.
- If collecting any personal data in the future, add a privacy policy before launching that feature.

# SEO And Structured Data

- Add localized page titles and descriptions for every public route.
- Add `alternates.languages` metadata for `th`, `en`, and `zh` routes so search engines can connect equivalent pages.
- Add `robots.ts` and `sitemap.ts` when the public route set is stable.
- Consider JSON-LD structured data for `LocalBusiness` or `HealthAndBeautyBusiness`, including name, address, phone, opening hours, geo, sameAs social links, and supported languages when real details are available.
- Keep NAP information (name, address, phone) consistent across every language.

# Content Scope

- Treat the business as a wellness and Thai traditional massage service, not a medical diagnosis platform.
- Avoid claims that massage cures diseases or replaces professional medical care.
- Include practical safety notes where relevant, such as asking customers with pregnancy, acute injury, fever, major medical conditions, or recent surgery to consult staff or a healthcare professional before massage.
- Prefer contact links such as phone, map, email, or chat links over collecting sensitive health information on the site.
- If the user provides real business details, use them exactly. If details are missing, use clearly replaceable placeholders rather than inventing addresses, phone numbers, certifications, or opening hours.

# UI And Styling

- Build mobile-first, responsive pages with semantic sections and clear hierarchy.
- Use Tailwind CSS v4 patterns already present in the project.
- Keep the visual direction calm, polished, and trustworthy: Thai wellness, lotus-inspired accents, warm natural materials, readable contrast, and generous spacing.
- Use real or generated bitmap images for hero, space, treatment, or atmosphere sections when building visible website pages. Avoid decorative-only SVG hero art for this domain.
- Do not create landing-page filler. The first screen should immediately communicate the business name, Thai massage service, primary contact action, language switch, and a hint of the next section.
- Keep repeated item cards simple with radius `8px` or less unless the existing design system requires otherwise.
- Avoid nested cards, overlapping text, viewport-scaled font sizes, and layout shifts. Use stable dimensions for fixed-format elements.
- Use semantic HTML landmarks (`header`, `main`, `section`, `nav`, `footer`) and keep heading order logical.
- Ensure all interactive controls have accessible names, visible focus states, and sufficient color contrast.

# Loading States

- If a route or component can suspend or wait for dynamic data, use skeleton UI. Do not use a plain "Loading..." message or spinner as the primary fallback.
- Prefer route-level `loading.tsx` files for page-level loading states and `Suspense` with a skeleton fallback for smaller async regions.
- Skeletons should match the final layout dimensions closely to prevent layout shift.
- Keep skeleton components lightweight and accessible. Use `aria-busy` or `role="status"` when helpful, but avoid noisy screen-reader output.
- Do not put slow runtime work in `layout.tsx` if the corresponding `loading.tsx` is expected to cover it. Move that work into `page.tsx` or wrap it in a local `Suspense` boundary.

# Static Site And Performance

- Favor static rendering and prerendered locale routes for this informational website.
- Keep data local where possible: dictionaries, service lists, FAQs, testimonials, and contact details can live in typed constants or JSON files.
- Use `fetch` only when there is a real external data source. If fetching duplicated data for metadata and page content, use React `cache` or Next.js memoization patterns from the docs.
- Keep client JavaScript minimal. Static content, dictionaries, service lists, and SEO content should render on the server.
- Optimize images, avoid oversized assets, and provide stable image sizes to prevent Cumulative Layout Shift.

# Verification

- After code changes, run `bun run lint`.
- Run `bun run build` before handing off user-facing page, routing, metadata, or i18n changes.
- For visual changes, inspect the page at desktop and mobile widths and verify there is no text overlap, broken responsive layout, missing images, or inaccessible contrast.
- If a validation command cannot run, report the exact command and the reason.
