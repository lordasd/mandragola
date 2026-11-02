import type { HomeContent, ImageAsset } from "./types";

const ORIGIN = "https://mandragolaltd.com";

/** Background of the "Where capital meets opportunity" band (aerial view of the Tel Aviv–Jaffa coastline). */
export const homeAccessImage: ImageAsset = {
  src: "/images/home/coastline.webp",
  alt: "Aerial view of the Tel Aviv–Jaffa coastline",
  width: 1200,
  height: 500,
};

export const home: HomeContent = {
  seo: {
    title: "Global Investments & Partnerships — Mandragola Ltd",
    description:
      "Mandragola Ltd is an Israeli investment firm connecting capital, relationships, and opportunity across aerospace & defense (A&D) and technology.",
    path: "/",
  },
  hero: {
    eyebrow: "Mandragola",
    title: "Global Investments & Partnerships",
    subtitle: "Connecting capital, relationships, and opportunity across A&D and technology",
    // Original button pointed to /our-mission-about-new/ (404); fixed to the live page.
    cta: { label: "Our Mission", href: `${ORIGIN}/our-mission/` },
    secondaryCta: { label: "Discover Transactions", href: "/transactions" },
    // Original home hero background (re-encoded 1280px, muted; see public/video).
    video: { webm: "/video/hero.webm", mp4: "/video/hero.mp4" },
  },
  mission: {
    eyebrow: "Our Mission",
    title: "Identifying and developing high-potential growth opportunities",
    body: "With a focus on the A&D sector, we have strong relationships in the Aerospace & Aviation industry through our global partnerships, as well as across the Israeli tech ecosystem.",
  },
  stats: [
    { value: "100+", label: "Financing Transactions" },
    { value: "Billions", label: "Dollars of Capital Raised" },
    { value: "Thousands", label: "Underlying Shareholders" },
  ],
  philosophy: {
    title: "Capital. Access. Strategic execution.",
    body: "Mandragola was built on the belief that capital alone does not create lasting value. The right relationships, sound judgment, and disciplined execution are what turn opportunity into progress.",
  },
  access: {
    eyebrow: "Strategic access",
    title: "Where capital meets opportunity",
    body: "Mandragola enables access to strategically important sectors through targeted public and private investments.",
    cta: { label: "Discover More", href: `${ORIGIN}/values/` },
  },
  transactionsTeaser: {
    title: "Transactions",
    body: "Selected M&A, joint ventures, and financing transactions",
    cta: { label: "Discover Transactions", href: "/transactions" },
  },
  expertiseTeaser: {
    title: "Experience that extends beyond capital",
    items: [
      {
        id: "capital-markets",
        title: "Capital Markets",
        body: "Experience across global financial markets, investment management, and capital allocation",
        icon: "capital",
      },
      {
        id: "company-building",
        title: "Company Building",
        body: "Supporting businesses through growth, expansion, and strategic execution",
        icon: "building",
      },
      {
        id: "strategic-relationships",
        title: "Strategic Relationships",
        body: "Connecting companies, investors, and industry leaders across international markets",
        icon: "relationships",
      },
      {
        id: "opportunity-sourcing",
        title: "Opportunity Sourcing",
        body: "Recognizing and pursuing opportunities across industries, technologies, and markets",
        icon: "sourcing",
      },
    ],
    cta: { label: "Discover Expertise", href: "/expertise" },
  },
  contact: {
    eyebrow: "Contact Us",
    title: "Get in touch",
    body: "Connecting companies, investors, and industry leaders across international markets.",
  },
};

const logo = (file: string, alt: string, width: number, height: number): ImageAsset => ({
  src: `/images/transactions/${file}`,
  alt,
  width,
  height,
});

/** Logo wall shown under "Transactions" on the original home page (same order). */
export const homeClientLogos: ImageAsset[] = [
  logo("dfsl.svg", "DFSL", 158, 56),
  logo("versamed.svg", "VersaMed, acquired by GE HealthCare", 232, 39),
  logo("tessera.svg", "Tessera", 266, 49),
  logo("zorronet.svg", "Zorronet", 157, 58),
  logo("kochav.svg", "Kochav", 153, 30),
  logo("t3-defense.svg", "T3 Defense", 275, 27),
  logo("mia-dynamics.svg", "MIA Dynamics", 233, 27),
  logo("star26.svg", "Star26", 158, 37),
  logo("visionwave.svg", "VisionWave", 207, 31),
  logo("tsoock-defense.svg", "Tsoock Defense Technologies", 288, 102),
  logo("bladeranger.svg", "BladeRanger", 242, 41),
  logo("motomea.svg", "Motomea", 242, 31),
  logo("sciii.svg", "SCiiI", 381, 162),
  logo("dentfreak.svg", "DentFreak", 158, 39),
  logo("continual.svg", "Continual", 207, 37),
  logo("water-io.svg", "Water.io", 117, 23),
  logo("enigma.svg", "Enigma, acquired by PTC Inc.", 177, 34),
  logo("omegamore.svg", "OmegaMore", 178, 31),
];
