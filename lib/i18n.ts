import type { Locale } from "@/content/types";

/** UI chrome strings (not page content). Page copy lives in content/*.ts. */
export interface UiStrings {
  skipToContent: string;
  primaryNav: string;
  openMenu: string;
  closeMenu: string;
  home: string;
  footerContact: string;
  footerQuickLinks: string;
  footerFollow: string;
  footerNav: string;
  accessibility: string;
  rights: string;
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
  transaction: { role: string; and: string; status: string; tags: string };
}

export const ui: Record<Locale, UiStrings> = {
  en: {
    skipToContent: "Skip to main content",
    primaryNav: "Main",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    home: "Mandragola Investments Limited – home",
    footerContact: "Contact",
    footerCompany: "Company",
    footerLegal: "Legal",
    demoRebuild: "Demo rebuild.",
    breadcrumb: "Breadcrumb",
    transaction: { role: "Mandragola’s role", and: "and", status: "Status:", tags: "Sector and deal type" },
    footerQuickLinks: "Quick links",
    footerFollow: "Follow",
    footerNav: "Footer",
    accessibility: "Accessibility statement",
    rights: "All rights reserved.",
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
    home: "Mandragola – דף הבית",
    footerContact: "יצירת קשר",
    footerCompany: "החברה",
    footerLegal: "מידע משפטי",
    demoRebuild: "בנייה מחדש לצורכי הדגמה.",
    breadcrumb: "פירורי לחם",
    transaction: { role: "תפקיד מנדרגולה", and: "ו־", status: "סטטוס:", tags: "תחום וסוג עסקה" },
    footerQuickLinks: "קישורים מהירים",
    footerFollow: "עקבו אחרינו",
    footerNav: "תחתית",
    accessibility: "הצהרת נגישות",
    rights: "כל הזכויות שמורות.",
    emailLabel: "דוא״ל",
    switchLanguage: { label: "English", href: "/", hrefLang: "en", lang: "en" },
    demoBanner: "אתר הדגמה למטלת גיוס — אינו האתר הרשמי של מנדרגולה",
    demoBannerLabel: "הודעת הדגמה",
    formHint: "זהו אתר הדגמה — הודעות אינן נשלחות או נשמרות.",
  },
};

/** Hebrew labels for site.nav / site.footerLinks, keyed by English label (content is English-only). */
export const heLinkLabels: Record<string, string> = {
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

/** Fixed so prerendering stays deterministic (Cache Components forbids new Date() in the static shell). */
export const COPYRIGHT_YEAR = 2026;
