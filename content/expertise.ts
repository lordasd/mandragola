import type { ExpertiseContent } from "./types";

export const expertise: ExpertiseContent = {
  seo: {
    title: "Investment Expertise & Services — Mandragola Ltd",
    description:
      "Capital markets, company building, strategic relationships, and opportunity sourcing: how Mandragola Ltd supports growth beyond capital in A&D and tech.",
    path: "/expertise",
  },
  hero: {
    title: "Experience that extends beyond capital",
    body: "We deliver high-fidelity forecasting and valuation frameworks that translate complex market data into actionable investment strategies. By leveraging rigorous, scenario-based modeling, we optimize capital structures and mitigate risk, providing the quantitative clarity essential for successful M&A, strategic scaling, and long-term value creation.",
  },
  areas: [
    {
      id: "capital-markets",
      title: "Capital Markets & Investment Expertise",
      body: "Deep experience across global financial markets, investment management, capital allocation, and transaction execution, helping identify opportunities and support long-term value creation.",
      icon: "capital",
      image: {
        src: "/images/expertise/capital-markets.webp",
        alt: "Manhattan skyline with the Empire State Building",
        width: 600,
        height: 595,
      },
    },
    {
      id: "company-building",
      title: "Company Building & Growth",
      body: "Supporting businesses through growth, expansion, strategic planning, and execution, with experience helping companies navigate the critical stages between opportunity and scale.",
      icon: "building",
      image: {
        src: "/images/expertise/company-building.webp",
        alt: "Colleagues working on laptops at a small table with coffee and a plant",
        width: 600,
        height: 600,
      },
    },
    {
      id: "strategic-relationships",
      title: "Strategic Relationships & Partnerships",
      body: "Connecting companies, investors, and industry leaders internationally, using trusted relationships to open doors and move opportunities forward.",
      icon: "relationships",
      image: {
        src: "/images/expertise/strategic-relationships.webp",
        alt: "Two women reviewing market charts on a laptop",
        width: 600,
        height: 600,
      },
    },
    {
      id: "opportunity-sourcing",
      title: "Opportunity Sourcing & Market Insight",
      body: "Recognizing opportunities across industries, technologies, and markets through broad relationships, informed judgment, and a long-term view of where value can be created.",
      icon: "sourcing",
      image: {
        src: "/images/expertise/opportunity-sourcing.webp",
        alt: "Open-plan office with people working at computer screens",
        width: 600,
        height: 600,
      },
    },
  ],
};
