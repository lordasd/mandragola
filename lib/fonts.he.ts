import { Assistant, Frank_Ruhl_Libre } from "next/font/google";

/*
 * Hebrew pair. preload: false because next/font preloads fonts called from a *root* layout on every
 * route — and (he)/he/layout.tsx is a root layout, so preloading would push ~91 KB of Hebrew fonts to
 * every English page. /he still renders correctly: the files load from its CSS with display: swap.
 */
const display = Frank_Ruhl_Libre({
  subsets: ["hebrew", "latin"],
  display: "swap",
  preload: false,
  variable: "--font-display",
});
const text = Assistant({ subsets: ["hebrew", "latin"], display: "swap", preload: false, variable: "--font-text" });

export const heFontVars = `${display.variable} ${text.variable}`;
