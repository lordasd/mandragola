import { site, siteHe } from "@/content/site";
import type { Locale, SiteContent } from "@/content/types";

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
  switchLanguage: { label: string; href: string; hrefLang: Locale; lang: Locale };
  /** Banner text for locales whose site content is English-only. */
  demoBanner: string;
  demoBannerLabel: string;
  /** Static hint for ContactForm's `hint` prop. */
  formHint: string;
  footerCompany: string;
  footerLegal: string;
  demoRebuild: string;
  breadcrumb: string;
  transaction: { role: string; status: string; tags: string };
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
    footerFollow: "Follow",
    footerNav: "Footer",
    accessibility: "Accessibility statement",
    emailLabel: "Email",
    switchLanguage: { label: "עברית", href: "/he", hrefLang: "he", lang: "he" },
    demoBanner: "Demo for a recruitment assignment — not the official Mandragola website",
    demoBannerLabel: "Demo notice",
    formHint: "This is a demo — messages are not sent or stored.",
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
    footerFollow: "עקבו אחרינו",
    footerNav: "תחתית",
    accessibility: "הצהרת נגישות",
    emailLabel: "דוא״ל",
    switchLanguage: { label: "English", href: "/", hrefLang: "en", lang: "en" },
    demoBanner: "אתר הדגמה למטלת גיוס — אינו האתר הרשמי של מנדרגולה",
    demoBannerLabel: "הודעת הדגמה",
    formHint: "זהו אתר הדגמה — הודעות אינן נשלחות או נשמרות.",
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

export function localizeLinks<T extends { label: string; href: string }>(links: T[], locale: Locale): T[] {
  if (locale === "en") return links;
  return links.map((l) => ({
    ...l,
    label: heLinkLabels[l.label] ?? l.label,
    href: l.href === "/" ? "/he" : l.href === "/#contact" ? "/he#contact" : l.href,
  }));
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
