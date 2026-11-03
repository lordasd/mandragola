import { site, siteHe } from "@/content/site";
import type { Link, Locale, SiteContent } from "@/content/types";

/** UI chrome strings (not page content). Page copy lives in content/*.ts. */
export interface UiStrings {
  skipToContent: string;
  primaryNav: string;
  openMenu: string;
  closeMenu: string;
  home: string;
  footerContact: string;
  footerFollow: string;
  footerNav: string;
  accessibility: string;
  emailLabel: string;
  switchLanguage: { label: string; hrefLang: Locale; lang: Locale };
  /** Banner text for locales whose site content is English-only. */
  demoBanner: string;
  demoBannerLabel: string;
  /** Static hint for ContactForm's `hint` prop. */
  footerCompany: string;
  footerLegal: string;
  demoRebuild: string;
  breadcrumb: string;
  transaction: { role: string; status: string; tags: string };
  /** Accessible names of the home hero video's pause/play toggle (WCAG 2.2.2). */
  heroVideo: { pause: string; play: string };
}

export const ui: Record<Locale, UiStrings> = {
  en: {
    skipToContent: "Skip to main content",
    primaryNav: "Main",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    home: "Mandragola Ltd — home",
    footerContact: "Contact",
    footerCompany: "Company",
    footerLegal: "Legal",
    demoRebuild: "Demo rebuild.",
    breadcrumb: "Breadcrumb",
    transaction: { role: "Mandragola’s role", status: "Status:", tags: "Sector and deal type" },
    heroVideo: { pause: "Pause background video", play: "Play background video" },
    footerFollow: "Follow",
    footerNav: "Footer",
    accessibility: "Accessibility statement",
    emailLabel: "Email",
    switchLanguage: { label: "עברית", hrefLang: "he", lang: "he" },
    demoBanner: "Demo for a recruitment assignment — not the official Mandragola website",
    demoBannerLabel: "Demo notice",
  },
  he: {
    skipToContent: "דילוג לתוכן הראשי",
    primaryNav: "ראשי",
    openMenu: "פתיחת תפריט",
    closeMenu: "סגירת תפריט",
    home: "מנדרגולה בע״מ — דף הבית",
    footerContact: "יצירת קשר",
    footerCompany: "החברה",
    footerLegal: "מידע משפטי",
    demoRebuild: "בנייה מחדש לצורכי הדגמה.",
    breadcrumb: "פירורי לחם",
    transaction: { role: "תפקיד מנדרגולה", status: "סטטוס:", tags: "תחום וסוג עסקה" },
    heroVideo: { pause: "השהיית סרטון הרקע", play: "הפעלת סרטון הרקע" },
    footerFollow: "עקבו אחרינו",
    footerNav: "תחתית",
    accessibility: "הצהרת נגישות",
    emailLabel: "דוא״ל",
    switchLanguage: { label: "English", hrefLang: "en", lang: "en" },
    demoBanner: "אתר הדגמה למטלת גיוס — אינו האתר הרשמי של מנדרגולה",
    demoBannerLabel: "הודעת הדגמה",
  },
};

/** Hebrew labels for site.nav / site.footerLinks, keyed by English label (content is English-only). */
const heLinkLabels: Record<string, string> = {
  Home: "דף הבית",
  "Our Mission": "החזון שלנו",
  Expertise: "תחומי מומחיות",
  Transactions: "עסקאות",
  Values: "ערכים",
  Articles: "מאמרים",
  "Contact us": "צרו קשר",
  Contact: "צרו קשר",
};

/** sr-only suffix for /he links whose target page is English-only (labels stay clean visually). */
const EN_ONLY_SUFFIX = " (באנגלית)";

/**
 * Hebrew labels/hrefs for site.nav / site.footerLinks. Links that stay English-only from /he
 * (Expertise, Transactions and the original-site pages) get `hrefLang: "en"` + `srSuffix`.
 */
export function localizeLinks<T extends Link>(links: T[], locale: Locale): T[] {
  if (locale === "en") return links;
  return links.map((l) => {
    const href = l.href === "/" ? "/he" : l.href === "/#contact" ? "/he#contact" : l.href;
    const englishOnly = !(href === "/he" || href.startsWith("/he/") || href.startsWith("/he#"));
    return {
      ...l,
      label: heLinkLabels[l.label] ?? l.label,
      href,
      ...(englishOnly && { hrefLang: "en" as const, srSuffix: EN_ONLY_SUFFIX }),
    };
  });
}

/** Label of an internal site link (site.footerLinks / site.nav) by href, e.g. for breadcrumbs. Falls back to the href. */
export function linkLabel(href: string, locale: Locale = "en"): string {
  const link = [...site.footerLinks, ...site.nav].find((l) => l.href === href);
  if (!link) return href;
  return locale === "he" ? (heLinkLabels[link.label] ?? link.label) : link.label;
}

/** Site strings that have a Hebrew version (site content is otherwise English-only). */
export function siteText(content: SiteContent, locale: Locale): { tagline: string; address: string } {
  return locale === "he" ? siteHe : { tagline: content.tagline, address: content.contact.address };
}

/** Fixed so prerendering stays deterministic (Cache Components forbids new Date() in the static shell). */
export const COPYRIGHT_YEAR = 2026;
