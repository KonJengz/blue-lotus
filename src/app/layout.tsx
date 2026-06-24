import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../styles/globals.css";
import { fontVariables } from "@/styles/font";
import { ThemeProvider } from "@/components/ThemeProvider";
import { siteOrigin } from "@/lib/seo";

/**
 * Root layout — the single <html>/<body> for the whole app (dev + static export).
 * `lang` defaults to "th" and is updated per-locale on the client by <HtmlLang>.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  applicationName: "Blue Lotus",
  title: {
    default: "Blue Lotus | Thai Therapeutic Massage",
    template: "%s",
  },
  description:
    "Blue Lotus — traditional Thai therapeutic massage near BTS Khlong San. Open daily 10:00–21:00.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="th"
      className={`${fontVariables} h-full antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
