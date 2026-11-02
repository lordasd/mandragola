import { EB_Garamond, Spline_Sans } from "next/font/google";

/*
 * English pair (preloaded — most routes are English). Hebrew fonts live in lib/fonts.he.ts.
 * Both locales expose the same CSS variables (--font-display, --font-text); globals.css maps
 * them to Tailwind's font-heading / font-sans utilities.
 */
const display = EB_Garamond({ subsets: ["latin"], display: "swap", variable: "--font-display" });
const text = Spline_Sans({ subsets: ["latin"], display: "swap", variable: "--font-text" });

export const enFontVars = `${display.variable} ${text.variable}`;
