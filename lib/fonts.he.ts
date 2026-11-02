import { Heebo } from "next/font/google";

/*
 * Hebrew: Heebo for both headings and body (one variable font file serves every weight).
 * Only --font-text is set here; globals.css maps --font-display to it under :lang(he).
 * preload: false because next/font preloads fonts called from a *root* layout on every route —
 * and (he)/he/layout.tsx is a root layout, so preloading would push the Hebrew font to every
 * English page. /he still renders correctly: the file loads from its CSS with display: swap.
 */
const heebo = Heebo({ subsets: ["hebrew", "latin"], display: "swap", preload: false, variable: "--font-text" });

export const heFontVars = heebo.variable;
