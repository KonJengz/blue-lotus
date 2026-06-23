import { Inter, Noto_Sans_Thai } from "next/font/google";

/**
 * Centralized font setup (per AGENTS.md).
 * - Inter for Latin / Chinese-fallback UI text.
 * - Noto Sans Thai for natural Thai rendering.
 * Both are exposed as CSS variables consumed by `--font-sans` in globals.css.
 */
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai"],
  variable: "--font-noto-thai",
  display: "swap",
});

/** Convenience: every font variable to drop on <html>. */
export const fontVariables = `${inter.variable} ${notoSansThai.variable}`;
