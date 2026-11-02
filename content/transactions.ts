import type { ImageAsset, Party, Transaction, TransactionsContent } from "./types";

const logo = (file: string, alt: string, width: number, height: number): ImageAsset => ({
  src: `/images/transactions/${file}`,
  alt,
  width,
  height,
});

const P = {
  dfsl: { name: "DFSL", logo: logo("dfsl.svg", "DFSL", 158, 56) },
  tessera: { name: "Tessera", logo: logo("tessera.svg", "Tessera", 266, 49) },
  zorronet: { name: "Zorronet", logo: logo("zorronet.svg", "Zorronet", 157, 58) },
  mia: { name: "MIA Dynamics", logo: logo("mia-dynamics.svg", "MIA Dynamics", 233, 27) },
  enigma: { name: "Enigma", logo: logo("enigma.svg", "Enigma, acquired by PTC Inc.", 177, 34) },
  t3: { name: "T3 Defense", logo: logo("t3-defense.svg", "T3 Defense", 275, 27) },
  star26: { name: "Star26", logo: logo("star26.svg", "Star26", 158, 37) },
  arrivair: { name: "ArrivAir II", logo: logo("arrivair-ii.svg", "ArrivAir II", 163, 97) },
  dentfreak: { name: "DentFreak", logo: logo("dentfreak.svg", "DentFreak", 158, 39) },
  omegamore: { name: "OmegaMore", logo: logo("omegamore.svg", "OmegaMore", 178, 31) },
  kochav: { name: "Kochav", logo: logo("kochav.svg", "Kochav", 153, 30) },
  continual: { name: "Continual", logo: logo("continual.svg", "Continual", 207, 37) },
  shikun: { name: "Shikun & Binui REIT", logo: logo("shikun-binui.svg", "Shikun & Binui REIT", 133, 37) },
  motomea: { name: "Motomea", logo: logo("motomea.svg", "Motomea", 242, 31) },
  versamed: { name: "VersaMed", logo: logo("versamed.svg", "VersaMed, acquired by GE HealthCare", 232, 39) },
} satisfies Record<string, Party>;

const items: Transaction[] = [
  {
    id: "dfsl-tessera",
    sectors: ["Defense"],
    type: "Mergers & Acquisitions",
    parties: [P.dfsl, P.tessera],
    summary: "DFSL has agreed to be acquired by Tessera",
    role: "Transaction M&A Consulting and Financing",
  },
  {
    id: "zorronet-tessera",
    sectors: ["Defense"],
    type: "Mergers & Acquisitions",
    parties: [P.zorronet, P.tessera],
    summary: "Zorronet has agreed to be acquired by Tessera",
    role: "Transaction M&A Consulting",
  },
  {
    id: "mia-dynamics",
    sectors: ["Defense"],
    type: "Structured Investments",
    parties: [P.mia],
    summary: "Has raised 2 rounds of financing",
    role: "Transaction M&A Consulting",
  },
  {
    id: "enigma",
    sectors: ["Aerospace", "Software"],
    type: "VC",
    parties: [P.enigma],
    summary: "Early-stage bootstrapping, fundraising, BusDev and consulting",
    role: "Strategic investment",
  },
  {
    id: "star26-t3-defense",
    sectors: ["Defense"],
    type: "Mergers & Acquisitions",
    parties: [P.t3, P.star26],
    summary: "Star26 has agreed to be acquired by T3 Defense",
    role: "Transaction M&A Consulting",
  },
  {
    id: "arrivair-ii",
    sectors: ["Aerospace"],
    type: "Joint Venture",
    parties: [P.arrivair],
    summary: "Business partners in the aviation sector",
    role: "Transaction M&A Consulting",
  },
  {
    id: "dentfreak",
    sectors: ["Healthcare"],
    type: "VC",
    parties: [P.dentfreak],
    summary: "Strategic investment, fundraising, BusDev and consulting of DentFreak (acquired by Curaprox)",
    role: "Consulting",
  },
  {
    id: "omegamore",
    sectors: ["Healthcare"],
    type: "VC",
    parties: [P.omegamore],
    summary:
      "Founded the omega3.biz e-commerce website, social media, landing pages, etc., and launched digital marketing campaigns. Secured 5 kosher brands for reselling",
    role: "Early-stage bootstrapping, funding, BusDev and consulting",
  },
  {
    id: "kochav",
    sectors: ["Defense"],
    type: "Financial Consulting",
    parties: [P.kochav],
    summary: "Kochav (NASDAQ: KVHS) has raised $253 million as a special acquisition company",
    role: "Consulting",
  },
  {
    id: "continual-shikun-binui",
    sectors: ["Defense"],
    type: "Mergers & Acquisitions",
    parties: [P.continual, P.shikun],
    summary: "Has signed a non-binding LOI",
    role: "Financing",
  },
  {
    id: "motomea",
    sectors: ["Defense", "Moto Testing"],
    type: "Structured Investments",
    parties: [P.motomea],
    // The original card shows only "Pending"; summary is built from its own type + party fields.
    summary: "Structured investment in Motomea",
    role: "Financing, M&A Consulting",
    status: "Pending",
  },
  {
    id: "versamed-ge-healthcare",
    sectors: ["Healthcare"],
    type: "VC",
    parties: [P.versamed],
    summary:
      "VersaMed Corporation, an Israeli provider of portable critical care ventilators for respiratory care, has been acquired by GE Healthcare.",
    role: "Shareholder & Consulting",
  },
];

export const transactions: TransactionsContent = {
  seo: {
    title: "Transactions & Investments — Mandragola Ltd",
    description:
      "Selected M&A, joint venture, VC, and financing transactions by Mandragola Ltd across defense, aerospace, and healthcare, including DFSL, Zorronet, and Tessera.",
    path: "/transactions",
  },
  hero: {
    title: "Our Transactions & Investments",
    body: "Some of our latest M&As, joint ventures, and financing deals. Every transaction we structure is a reflection of our core philosophy: balancing rigorous capital market discipline with the agility of high-tech entrepreneurship. We don’t merely close deals; we architect deep strategic partnerships and cross-border alliances that transform disruptive concepts in security, tech, and aerospace into institutional-grade global market leaders.",
  },
  items,
  cta: {
    // Heading present (hidden) in the original transactions page markup.
    title: "Strategic Capital, Uncompromising Alliances, and High-Impact Scale for Essential Industries.",
    body: "Connecting companies, investors, and industry leaders across international markets.",
    link: { label: "Contact us", href: "/#contact" },
  },
};
