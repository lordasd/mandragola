import type { HomeContent } from "./types";

const ORIGIN = "https://mandragolaltd.com";

export const homeHe: HomeContent = {
  seo: {
    title: "השקעות ושותפויות גלובליות — Mandragola Ltd",
    description:
      "Mandragola Ltd היא חברת השקעות ישראלית המחברת בין הון, קשרים והזדמנויות בתחומי האווירונאוטיקה והביטחון (A&D) והטכנולוגיה, עם יותר מ־100 עסקאות מימון.",
    path: "/he",
  },
  hero: {
    eyebrow: "Mandragola",
    title: "השקעות ושותפויות גלובליות",
    subtitle: "מחברים בין הון, קשרים והזדמנויות בתחומי האווירונאוטיקה והביטחון (A&D) והטכנולוגיה",
    cta: { label: "החזון שלנו", href: `${ORIGIN}/our-mission/` },
    secondaryCta: { label: "לעסקאות שלנו", href: "/transactions" },
    image: {
      src: "/images/home/hero-gradient.webp",
      alt: "",
      width: 1920,
      height: 445,
    },
  },
  mission: {
    eyebrow: "החזון שלנו",
    title: "מזהים ומפתחים הזדמנויות צמיחה בעלות פוטנציאל גבוה",
    body: "מתוך מיקוד בתחום האווירונאוטיקה והביטחון (A&D), אנו מקיימים קשרים חזקים בתעשיית התעופה והחלל באמצעות השותפויות הגלובליות שלנו, וכן ברחבי האקוסיסטם הטכנולוגי הישראלי.",
  },
  stats: [
    { value: "100+", label: "עסקאות מימון" },
    { value: "מיליארדי", label: "דולרים בגיוסי הון" },
    { value: "אלפי", label: "בעלי מניות" },
  ],
  philosophy: {
    title: "הון. נגישות. ביצוע אסטרטגי.",
    body: "Mandragola הוקמה מתוך אמונה שהון לבדו אינו יוצר ערך מתמשך. הקשרים הנכונים, שיקול דעת מושכל וביצוע ממושמע הם שהופכים הזדמנות להתקדמות.",
  },
  access: {
    eyebrow: "גישה אסטרטגית",
    title: "היכן שהון פוגש הזדמנות",
    body: "Mandragola מאפשרת גישה לתחומים בעלי חשיבות אסטרטגית באמצעות השקעות ממוקדות בשוק הציבורי ובשוק הפרטי.",
    cta: { label: "לפרטים נוספים", href: `${ORIGIN}/values/` },
  },
  transactionsTeaser: {
    title: "עסקאות",
    body: "מבחר עסקאות מיזוגים ורכישות (M&A), מיזמים משותפים ועסקאות מימון",
    cta: { label: "לכל העסקאות", href: "/transactions" },
  },
  expertiseTeaser: {
    title: "ניסיון שמעבר להון",
    items: [
      {
        title: "שוקי הון",
        body: "ניסיון בשווקים פיננסיים גלובליים, בניהול השקעות ובהקצאת הון",
        icon: "capital",
      },
      {
        title: "בניית חברות",
        body: "ליווי עסקים בצמיחה, בהתרחבות ובביצוע אסטרטגי",
        icon: "building",
      },
      {
        title: "קשרים אסטרטגיים",
        body: "חיבור בין חברות, משקיעים ומובילי תעשייה בשווקים בינלאומיים",
        icon: "relationships",
      },
      {
        title: "איתור הזדמנויות",
        body: "זיהוי הזדמנויות וקידומן בתעשיות, בטכנולוגיות ובשווקים שונים",
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
