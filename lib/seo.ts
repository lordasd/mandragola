import type { Metadata } from "next";
import { site as siteContent } from "@/content/site";
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

type OgImage = { url: string; width?: number; height?: number; alt?: string };

/** Static 1200×630 share images (public/og, generated with sharp — see report / scratchpad script). */
export const DEFAULT_OG: Record<Locale, Required<OgImage>> = {
  en: {
    url: "/og/og-en.png",
    width: 1200,
    height: 630,
    alt: `${SITE_NAME} — Global Investments & Partnerships`,
  },
  he: {
    url: "/og/og-he.png",
    width: 1200,
    height: 630,
    alt: `${SITE_NAME} — השקעות ושותפויות גלובליות`,
  },
};

/** "@MandragolaLtd", derived from the X profile URL in content/site. */
const xHref = siteContent.social.find((s) => s.network === "x")?.href;
export const TWITTER_SITE = xHref ? `@${new URL(xHref).pathname.replace(/^\/+|\/+$/g, "")}` : undefined;

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
  /** Defaults to the locale's static OG image (DEFAULT_OG). */
  image?: OgImage;
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
  const ogImage = image ?? DEFAULT_OG[locale];
  // og/twitter titles don't get the layout's title template, so add the brand here.
  const socialTitle = absoluteTitle ? title : `${title} — ${SITE_NAME}`;
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
      title: socialTitle,
      description,
      locale: OG_LOCALE[locale],
      ...(otherLocales?.length ? { alternateLocale: otherLocales } : {}),
      images: [{ ...ogImage, url: absoluteUrl(ogImage.url) }],
    },
    twitter: {
      card: "summary_large_image",
      ...(TWITTER_SITE ? { site: TWITTER_SITE } : {}),
      title: socialTitle,
      description,
      images: [{ url: absoluteUrl(ogImage.url), ...(ogImage.alt ? { alt: ogImage.alt } : {}) }],
    },
    robots: NO_INDEX,
  };
}

/* ---------- JSON-LD builders (render with <JsonLd data={...} />) ---------- */

type Ld = Record<string, unknown>;

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const WEBSITE_ID_HE = `${SITE_URL}/he#website`;

/** Raster logo on a solid ink background (Google wants ≥112×112, non-SVG). */
const ORG_LOGO = { url: "/og/logo-512.png", width: 512, height: 512 };

/**
 * Structured form of site.contact.address ("8 HaGavish, Netanya, Israel").
 * Kept here so content/site.ts stays a plain display string.
 */
const ORG_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "8 HaGavish",
  addressLocality: "Netanya",
  addressCountry: "IL",
};

export function organizationLd(site: SiteContent): Ld {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.name,
    description: site.tagline,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      "@id": `${SITE_URL}/#logo`,
      url: absoluteUrl(ORG_LOGO.url),
      contentUrl: absoluteUrl(ORG_LOGO.url),
      width: ORG_LOGO.width,
      height: ORG_LOGO.height,
      caption: site.name,
    },
    image: { "@id": `${SITE_URL}/#logo` },
    email: site.contact.email,
    address: ORG_ADDRESS,
    sameAs: [site.url, ...site.social.map((s) => s.href)].filter(Boolean),
  };
}

export function websiteLd({ name = SITE_NAME, locale = "en" }: { name?: string; locale?: Locale } = {}): Ld {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": locale === "he" ? WEBSITE_ID_HE : WEBSITE_ID,
    name,
    url: locale === "he" ? absoluteUrl("/he") : SITE_URL,
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
    // Self-contained so the Service node validates on pages without the Organization block (e.g. /expertise).
    provider: { "@type": "Organization", "@id": ORG_ID, name: SITE_NAME, url: SITE_URL },
  };
}
