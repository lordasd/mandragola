import type { Metadata } from "next";
import type { Locale, SiteContent } from "@/content/types";

// Explicit env var wins; on Vercel fall back to the project's production domain.
const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (productionHost ? `https://${productionHost}` : "https://mandragola-rebuild.vercel.app")
).replace(/\/$/, "");
export const SITE_NAME = "Mandragola Ltd";

/** Demo build: never indexed (assignment rule). Everything else is production-grade SEO. */
export const NO_INDEX: NonNullable<Metadata["robots"]> = {
  index: false,
  follow: false,
  googleBot: { index: false, follow: false },
};

const OG_LOCALE: Record<Locale, string> = { en: "en_US", he: "he_IL" };

export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`.replace(/(?<!:)\/$/, "") || SITE_URL;
}

export interface BuildMetadataInput {
  title: string;
  description: string;
  /** Route path of this page, e.g. "/expertise" */
  path: string;
  locale?: Locale;
  /** Paths of this page in each language, e.g. { en: "/", he: "/he" }. Omit if single-language. */
  alternates?: Partial<Record<Locale, string>>;
  /** Use title as-is instead of the layout's "%s — Mandragola Ltd" template. */
  absoluteTitle?: boolean;
  image?: { url: string; width?: number; height?: number; alt?: string };
}

export function buildMetadata({
  title,
  description,
  path,
  locale = "en",
  alternates,
  absoluteTitle = false,
  image,
}: BuildMetadataInput): Metadata {
  const languages: Record<string, string> = {};
  if (alternates) {
    for (const [lang, href] of Object.entries(alternates)) languages[lang] = href;
    if (alternates.en) languages["x-default"] = alternates.en;
  }
  const otherLocales = alternates
    ? (Object.keys(alternates) as Locale[]).filter((l) => l !== locale).map((l) => OG_LOCALE[l])
    : undefined;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: path,
      ...(alternates ? { languages } : {}),
    },
    openGraph: {
      type: "website",
      url: path,
      siteName: SITE_NAME,
      title,
      description,
      locale: OG_LOCALE[locale],
      ...(otherLocales?.length ? { alternateLocale: otherLocales } : {}),
      ...(image ? { images: [image] } : {}),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      ...(image ? { images: [image.url] } : {}),
    },
    robots: NO_INDEX,
  };
}

/* ---------- JSON-LD builders (render with <JsonLd data={...} />) ---------- */

type Ld = Record<string, unknown>;

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export function organizationLd(site: SiteContent): Ld {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.name,
    description: site.tagline,
    url: SITE_URL,
    logo: absoluteUrl(site.logo.src),
    email: site.contact.email,
    address: { "@type": "PostalAddress", streetAddress: site.contact.address },
    sameAs: [site.url, ...site.social.map((s) => s.href)].filter(Boolean),
  };
}

export function websiteLd({ name = SITE_NAME, locale = "en" }: { name?: string; locale?: Locale } = {}): Ld {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name,
    url: SITE_URL,
    inLanguage: locale,
    publisher: { "@id": ORG_ID },
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]): Ld {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function itemListLd(
  items: { name: string; description?: string; path?: string }[],
  name?: string,
): Ld {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    ...(name ? { name } : {}),
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.description ? { description: item.description } : {}),
      ...(item.path ? { url: absoluteUrl(item.path) } : {}),
    })),
  };
}

export function serviceLd({
  name,
  description,
  path,
  serviceType,
  areaServed,
}: {
  name: string;
  description: string;
  path?: string;
  serviceType?: string;
  areaServed?: string;
}): Ld {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    ...(serviceType ? { serviceType } : {}),
    ...(areaServed ? { areaServed } : {}),
    ...(path ? { url: absoluteUrl(path) } : {}),
    provider: { "@id": ORG_ID },
  };
}
