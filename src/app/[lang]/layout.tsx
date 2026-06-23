import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HtmlLang } from "@/components/HtmlLang";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, locales } from "@/i18n/locales";

/** Prerender one route tree per locale (required for `output: 'export'`). */
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

/** Only the known locales are valid — anything else 404s at build/runtime. */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    description: dict.meta.home.description,
    alternates: {
      languages: {
        th: "/th",
        en: "/en",
        zh: "/zh",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <>
      <HtmlLang lang={lang} />
      <Navbar lang={lang} nav={dict.nav} />
      <main className="flex-1">{children}</main>
      <Footer lang={lang} dict={dict} />
    </>
  );
}
