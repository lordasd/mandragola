// Shared content contract. Content agent fills content/*.ts; UI reads only through these types.

export type Locale = "en" | "he";

export interface Link {
  label: string;
  href: string;
  /** Language of the target page when it differs from the current page (e.g. English-only pages linked from /he). */
  hrefLang?: Locale;
  /** Screen-reader-only suffix announcing that language, e.g. " (באנגלית)". Render inside the link in an sr-only span. */
  srSuffix?: string;
}

export interface ImageAsset {
  /** Path under /public, e.g. "/images/transactions/tessera.webp" */
  src: string;
  /** Empty string = decorative */
  alt: string;
  width: number;
  height: number;
}

export interface PageSeo {
  title: string;
  description: string;
  /** Route path, e.g. "/expertise" */
  path: string;
}

export interface Stat {
  value: string; // "100+"
  label: string; // "Financing Transactions"
}

export interface Feature {
  /** Anchor id of the matching row on /expertise ("capital-markets"); shared by the home teaser cards. */
  id: string;
  title: string;
  body: string;
  /** lucide-style icon key chosen by UI, optional */
  icon?: "capital" | "building" | "relationships" | "sourcing";
}

export interface SiteContent {
  name: string; // "Mandragola Ltd"
  tagline: string;
  url: string; // canonical production URL of the original
  logo: ImageAsset;
  nav: Link[];
  primaryCta: Link; // Contact
  contact: {
    address: string;
    email: string;
  };
  social: { network: "linkedin" | "facebook" | "x"; href: string }[];
  footerLinks: Link[];
  demoBanner: string;
}

export interface HomeContent {
  seo: PageSeo;
  hero: { eyebrow?: string; title: string; subtitle: string; cta: Link; secondaryCta?: Link };
  mission: { eyebrow: string; title: string; body: string; image?: ImageAsset };
  stats: Stat[];
  philosophy: { title: string; body: string };
  access: { eyebrow: string; title: string; body: string; cta: Link };
  transactionsTeaser: { title: string; body: string; cta: Link };
  expertiseTeaser: { title: string; items: Feature[]; cta: Link };
  contact: { eyebrow: string; title: string; body: string };
}

export interface ExpertiseContent {
  seo: PageSeo;
  hero: { title: string; body: string; image?: ImageAsset };
  areas: (Feature & { image?: ImageAsset })[];
  cta: { title: string; body: string; link: Link };
}

export interface Party {
  name: string;
  logo?: ImageAsset;
}

export interface Transaction {
  id: string; // slug
  sectors: string[]; // ["Defense"]
  type: string; // "Mergers & Acquisitions" | "VC" | "Joint Venture" | ...
  parties: Party[]; // 1 or 2 (acquirer & target)
  summary: string; // "DFSL has agreed to be acquired by Tessera"
  role: string; // "Transaction M&A Consulting and Financing"
  status?: string; // "Pending"
}

export interface TransactionsContent {
  seo: PageSeo;
  hero: { title: string; body: string };
  items: Transaction[];
  cta: { title: string; body: string; link: Link };
}

export interface NotFoundContent {
  eyebrow: string;
  title: string;
  body: string;
  homeLink: Link;
  /** Hebrew line + link shown alongside the English copy (unmatched URLs have no locale). */
  he: { body: string; homeLink: Link };
}

export interface ContactFormCopy {
  nameLabel: string;
  emailLabel: string;
  messageLabel: string;
  submitLabel: string;
  requiredNote: string;
  demoNotice: string; // shown after "submit": nothing was sent
  /** Inline validation messages, shown as text under the field (WCAG 3.3.1/3.3.3). */
  errors: { nameRequired: string; emailRequired: string; emailInvalid: string; messageRequired: string };
}
