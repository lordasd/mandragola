import { Assistant, EB_Garamond, Frank_Ruhl_Libre, Spline_Sans } from "next/font/google";

/*
 * Both locales expose the same two CSS variables (--font-display, --font-text);
 * globals.css maps them to Tailwind's font-heading / font-sans utilities.
 * Each root layout applies only its own pair, so only those files are preloaded.
 */

export const enDisplay = EB_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

export const enText = Spline_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-text",
});

export const heDisplay = Frank_Ruhl_Libre({
  subsets: ["hebrew", "latin"],
  display: "swap",
  variable: "--font-display",
});

export const heText = Assistant({
  subsets: ["hebrew", "latin"],
  display: "swap",
  variable: "--font-text",
});

export const enFontVars = `${enDisplay.variable} ${enText.variable}`;
export const heFontVars = `${heDisplay.variable} ${heText.variable}`;
