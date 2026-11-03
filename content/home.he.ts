import type { HomeContent, ImageAsset } from "./types";
import { homeAccessImage, homeClientLogos } from "./home";

const ORIGIN = "https://mandragolaltd.com";

export const homeHe: HomeContent = {
  seo: {
    title: "השקעות ושותפויות גלובליות — Mandragola Ltd",
    description:
      "Mandragola Ltd היא חברת השקעות ישראלית המחברת בין הון, קשרים עסקיים והזדמנויות בתחומי התעופה, החלל והביטחון (A&D) והטכנולוגיה, עם יותר מ־100 עסקאות מימון.",
    path: "/he",
  },
  hero: {
    eyebrow: "Mandragola",
    title: "השקעות ושותפויות גלובליות",
    subtitle: "מחברים בין הון, קשרים עסקיים והזדמנויות בתחומי התעופה, החלל והביטחון (A&D) והטכנולוגיה",
    cta: { label: "החזון שלנו", href: `${ORIGIN}/our-mission/` },
    secondaryCta: { label: "לצפייה בעסקאות", href: "/transactions" },
    // Original home hero background (re-encoded 1280px, muted; see public/video).
    video: { webm: "/video/hero.webm", mp4: "/video/hero.mp4" },
  },
  mission: {
    eyebrow: "החזון שלנו",
    title: "מזהים ומפתחים הזדמנויות צמיחה בעלות פוטנציאל גבוה",
    body: "מתוך מיקוד בתחום התעופה, החלל והביטחון (A&D), אנו מקיימים קשרים הדוקים בתעשיית התעופה והחלל באמצעות שותפויותינו הגלובליות, וכן ברחבי האקוסיסטם הטכנולוגי הישראלי.",
  },
  stats: [
    { value: "100+", label: "עסקאות מימון" },
    { value: "מיליארדי", label: "דולרים בגיוסי הון" },
    { value: "אלפי", label: "בעלי מניות" },
  ],
  philosophy: {
    title: "הון. גישה.\nביצוע אסטרטגי.",
    body: "Mandragola הוקמה מתוך אמונה שהון לבדו אינו יוצר ערך מתמשך. הקשרים הנכונים, שיקול דעת מושכל וביצוע ממושמע הם אלה שהופכים הזדמנות להתקדמות.",
  },
  access: {
    eyebrow: "גישה אסטרטגית",
    title: "המקום שבו הון פוגש הזדמנות",
    body: "Mandragola מאפשרת גישה לתחומים בעלי חשיבות אסטרטגית באמצעות השקעות ממוקדות בשוק הציבורי ובשוק הפרטי.",
    cta: { label: "לפרטים נוספים", href: `${ORIGIN}/values/` },
  },
  transactionsTeaser: {
    title: "עסקאות",
    body: "מבחר עסקאות מיזוג ורכישה (M&A), מיזמים משותפים ועסקאות מימון",
    cta: { label: "לצפייה בעסקאות", href: "/transactions" },
  },
  expertiseTeaser: {
    title: "ניסיון שמעבר להון",
    items: [
      {
        id: "capital-markets",
        title: "שוקי הון",
        body: "ניסיון בשווקים פיננסיים גלובליים, בניהול השקעות ובהקצאת הון",
        icon: "capital",
      },
      {
        id: "company-building",
        title: "בניית חברות",
        body: "ליווי חברות בשלבי צמיחה והתרחבות ובביצוע אסטרטגי",
        icon: "building",
      },
      {
        id: "strategic-relationships",
        title: "קשרים אסטרטגיים",
        body: "חיבור בין חברות, משקיעים ומובילי תעשייה בשווקים בינלאומיים",
        icon: "relationships",
      },
      {
        id: "opportunity-sourcing",
        title: "איתור הזדמנויות",
        body: "זיהוי הזדמנויות ומימושן במגוון תעשיות, טכנולוגיות ושווקים",
        icon: "sourcing",
      },
    ],
    cta: { label: "לתחומי המומחיות", href: "/expertise" },
  },
  contact: {
    eyebrow: "צרו קשר",
    title: "נשמח לשמוע מכם",
    body: "מחברים בין חברות, משקיעים ומובילי תעשייה בשווקים בינלאומיים.",
  },
};

/** Same photo as /, Hebrew alt. */
export const homeAccessImageHe: ImageAsset = {
  ...homeAccessImage,
  alt: "מבט אווירי על קו החוף של תל אביב–יפו",
};

/** Hebrew wording for the descriptive part of logo alts; company names stay in Latin script. */
const logoAltHe: Record<string, string> = {
  "VersaMed, acquired by GE HealthCare": "VersaMed, נרכשה על ידי GE HealthCare",
  "Enigma, acquired by PTC Inc.": "Enigma, נרכשה על ידי PTC Inc.",
};

export const homeClientLogosHe: ImageAsset[] = homeClientLogos.map((l) => ({ ...l, alt: logoAltHe[l.alt] ?? l.alt }));
