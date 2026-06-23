import type { Metadata } from "next";
import "../styles/globals.css";
import { fontVariables } from "@/styles/font";
import { ThemeProvider } from "@/components/ThemeProvider";

/**
 * Root layout — the single <html>/<body> for the whole app (dev + static export).
 * `lang` defaults to "th" and is updated per-locale on the client by <HtmlLang>.
 */
export const metadata: Metadata = {
  title: {
    default: "Blue Lotus — Thai Therapeutic Massage",
    template: "%s · Blue Lotus",
  },
  description:
    "Blue Lotus — traditional Thai therapeutic massage near BTS Khlong San. Open daily 10:00–21:00.",
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
      </body>
    </html>
  );
}
