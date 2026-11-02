import type { ImageAsset, SiteContent } from "./types";

const ORIGIN = "https://mandragolaltd.com";

export const site: SiteContent = {
  name: "Mandragola Ltd",
  tagline: "Global Investments & Partnerships",
  url: ORIGIN,
  logo: {
    src: "/images/brand/mandragola-logo-white.svg",
    alt: "Mandragola Ltd",
    width: 121,
    height: 78,
  },
  nav: [
    { label: "Our Mission", href: `${ORIGIN}/our-mission/` },
    { label: "Expertise", href: "/expertise" },
    { label: "Transactions", href: "/transactions" },
    { label: "Values", href: `${ORIGIN}/values/` },
    { label: "Articles", href: `${ORIGIN}/articles/` },
  ],
  primaryCta: { label: "Contact us", href: "/#contact" },
  contact: {
    address: "8 HaGavish, Netanya, Israel",
    email: "info@mandragolaltd.com",
  },
  social: [
    // Original href repeats the URL three times; cleaned to the canonical company page.
    { network: "linkedin", href: "https://www.linkedin.com/company/mandragola-ltd/" },
    { network: "facebook", href: "https://www.facebook.com/profile.php?id=100057343732850" },
    { network: "x", href: "https://x.com/MandragolaLtd" },
  ],
  // "Quick Access" footer column. The original "Privacy Policy" / "Terms of Use" items are plain text, not links.
  footerLinks: [
    { label: "Home", href: "/" },
    { label: "Our Mission", href: `${ORIGIN}/our-mission/` },
    { label: "Expertise", href: "/expertise" },
    { label: "Transactions", href: "/transactions" },
    { label: "Values", href: `${ORIGIN}/values/` },
    { label: "Articles", href: `${ORIGIN}/articles/` },
  ],
  demoBanner: "Demo for a recruitment assignment — not the official Mandragola website",
};

/** Dark "A Segal Company" lockup used in the original footer (for light backgrounds). */
export const footerLogo: ImageAsset = {
  src: "/images/brand/mandragola-logo-segal.svg",
  alt: "Mandragola Ltd — A Segal Company",
  width: 480,
  height: 311,
};

/** Gold brush underline used under section headings on the original. Decorative. */
export const markerLine: ImageAsset = {
  src: "/images/brand/marker-line.svg",
  alt: "",
  width: 454,
  height: 19,
};
