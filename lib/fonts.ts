import { Inter, Sora } from "next/font/google";

/**
 * Body / UI typeface.
 * Exposed as `--font-inter` and consumed by the Tailwind theme in globals.css.
 */
export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  adjustFontFallback: true,
});

/**
 * Display / heading typeface.
 * Exposed as `--font-sora` and consumed by the Tailwind theme in globals.css.
 */
export const fontDisplay = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  adjustFontFallback: true,
});
