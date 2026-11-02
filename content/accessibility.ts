import { site } from "./site";
import type { Link, Locale, PageSeo } from "./types";

/*
 * Accessibility statement copy (EN + HE). Rendered by components/legal/AccessibilityStatement.tsx.
 * Types are local for now; candidates to move into content/types.ts.
 */

/** Inline run: plain text or emphasized text. */
export type A11yInline = string | { strong: string };

export type A11yBlock =
  | { kind: "p"; content: A11yInline[] }
  | { kind: "list"; items: A11yInline[][] }
  /** Email (from site.contact) + postal address, one per line. */
  | { kind: "contact"; emailLabel: string; addressLabel: string; address: string }
  /** Sentence with a machine-readable date: `${before}<time>${label}</time>${after}` */
  | { kind: "date"; before: string; dateTime: string; label: string; after: string };

export interface A11ySection {
  id: string;
  title: string;
  blocks: A11yBlock[];
}

export interface AccessibilityContent {
  seo: PageSeo;
  eyebrow: string;
  /** h1, breadcrumb current item and BreadcrumbList name. */
  title: string;
  /** Home link for the breadcrumb trail. */
  home: Link;
  intro: A11yInline[];
  sections: A11ySection[];
}

const UPDATED = "2026-11-02";

export const accessibility: AccessibilityContent = {
  seo: {
    title: "Accessibility statement",
    description:
      "Accessibility statement for the Mandragola Ltd demo rebuild: WCAG 2.2 AA target (IS 5568), measures taken, known limitations and how to report an issue.",
    path: "/accessibility",
  },
  eyebrow: "Accessibility",
  title: "Accessibility statement",
  home: { label: site.footerLinks.find((l) => l.href === "/")?.label ?? "Home", href: "/" },
  intro: [
    "This statement applies to this ",
    { strong: "demo rebuild" },
    " of the Mandragola Ltd website, made for a recruitment assignment. It is not the official Mandragola website and does not describe the official site.",
  ],
  sections: [
    {
      id: "commitment",
      title: "Our commitment",
      blocks: [
        {
          kind: "p",
          content: [
            "We want everyone, including people with disabilities, to be able to use this website independently and with dignity. Accessibility was a requirement from the start of the build, not something added afterwards.",
          ],
        },
      ],
    },
    {
      id: "conformance",
      title: "Conformance status",
      blocks: [
        {
          kind: "p",
          content: [
            "The target level is ",
            { strong: "WCAG 2.2 level AA" },
            ", in line with Israeli Standard IS 5568 and regulation 35 of the Equal Rights for Persons with Disabilities (Accessibility Adjustments to Service) Regulations, 5773-2013. We consider the site ",
            { strong: "partially conformant" },
            ": most criteria are met, with the known limitations listed below.",
          ],
        },
      ],
    },
    {
      id: "measures",
      title: "Measures taken",
      blocks: [
        {
          kind: "list",
          items: [
            ["Semantic landmarks (header, navigation, main, footer), one main heading per page and a logical heading order."],
            ["A “Skip to main content” link as the first focusable element."],
            ["Full keyboard operation, including the mobile menu (Escape closes it and returns focus to the button)."],
            ["A clearly visible focus indicator that is never hidden behind the sticky header or the demo banner."],
            ["Color contrast of at least 4.5:1 for text and 3:1 for controls and focus indicators."],
            ["Correct page language and direction: English left-to-right, Hebrew right-to-left."],
            ["Text alternatives for meaningful images; decorative images are hidden from assistive technology."],
            ["Responsive layout that reflows at 320 px width and 400% zoom without horizontal scrolling."],
            ["Form fields with visible labels and autocomplete hints. Errors are described in text next to the field, linked to it for screen readers, and focus moves to the first field that needs attention. Status messages are announced; no CAPTCHA."],
            ["No carousels or parallax. On larger screens the home page shows a muted, decorative background video that starts only after the page has loaded, has a visible pause button, and never plays when the “reduce motion” system setting is on. Other motion is limited to smooth scrolling and short transitions, also turned off under “reduce motion”."],
            ["No accessibility overlay widget: accessibility is built into the markup itself."],
          ],
        },
      ],
    },
    {
      id: "limitations",
      title: "Known limitations",
      blocks: [
        {
          kind: "list",
          items: [
            ["The contact form is a demonstration only: it does not send or store messages."],
            ["Some navigation links lead to pages of the original website, which are outside the scope of this statement."],
            ["Partner logos are third-party images. Where a logo stands alone its text alternative is the company name; on transaction cards the logos are decorative because the card heading already names the parties."],
            ["Only the home page and this statement are available in Hebrew."],
          ],
        },
      ],
    },
    {
      id: "contact",
      title: "Report an accessibility issue",
      blocks: [
        {
          kind: "p",
          content: [
            "If you find an accessibility barrier or need information in an accessible format, please contact us. Tell us the page address, what you were trying to do and the assistive technology you use, if any.",
          ],
        },
        { kind: "contact", emailLabel: "Email:", addressLabel: "Address:", address: site.contact.address },
      ],
    },
    {
      id: "coordinator",
      title: "Accessibility coordinator",
      blocks: [
        {
          kind: "p",
          content: ["Accessibility inquiries are handled through the company’s general contact details:"],
        },
        { kind: "contact", emailLabel: "Email:", addressLabel: "Address:", address: site.contact.address },
        {
          kind: "p",
          content: [
            "This is a demo rebuild, so no named accessibility coordinator or phone number is published here. The operator of the official website should add the coordinator’s name, phone number and email.",
          ],
        },
      ],
    },
    {
      id: "testing",
      title: "How this site was tested",
      blocks: [
        {
          kind: "list",
          items: [
            ["Automated axe-core scan (WCAG 2.2 AA rules) of every page at 375 px and 1440 px width, plus Lighthouse accessibility audits of the main pages."],
            ["Manual keyboard walkthrough of every page, including the mobile menu and the contact form."],
            ["Reflow check at 320 px width, and a check with the WCAG text-spacing override applied."],
            ["Check with the “reduce motion” system setting turned on."],
          ],
        },
      ],
    },
    {
      id: "date",
      title: "Date",
      blocks: [{ kind: "date", before: "Last updated: ", dateTime: UPDATED, label: "2 November 2026", after: "" }],
    },
  ],
};

export const accessibilityHe: AccessibilityContent = {
  seo: {
    title: "הצהרת נגישות",
    description:
      "הצהרת הנגישות של אתר ההדגמה של Mandragola Ltd: יעד WCAG 2.2 ברמה AA לפי תקן ישראלי 5568, אמצעי הנגישות שננקטו, מגבלות ידועות ודרכי פנייה בנושא נגישות.",
    path: "/he/accessibility",
  },
  eyebrow: "נגישות",
  title: "הצהרת נגישות",
  home: { label: "דף הבית", href: "/he" },
  intro: [
    "הצהרה זו חלה על ",
    { strong: "אתר ההדגמה" },
    " של Mandragola Ltd, שנבנה כחלק ממטלת גיוס. זה אינו האתר הרשמי של מנדרגולה, וההצהרה אינה מתייחסת לאתר הרשמי.",
  ],
  sections: [
    {
      id: "commitment",
      title: "המחויבות שלנו",
      blocks: [
        {
          kind: "p",
          content: [
            "אנו רוצים שכל אדם, לרבות אנשים עם מוגבלות, יוכל להשתמש באתר באופן עצמאי, שוויוני ומכבד. הנגישות הוגדרה כדרישה כבר משלב התכנון ולא נוספה בדיעבד.",
          ],
        },
      ],
    },
    {
      id: "conformance",
      title: "רמת ההתאמה",
      blocks: [
        {
          kind: "p",
          content: [
            "האתר מכוון לעמידה ב־",
            { strong: "WCAG 2.2 ברמה AA" },
            ", בהתאם לתקן הישראלי ת\"י 5568 ולתקנה 35 לתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע\"ג–2013. האתר נמצא ב",
            { strong: "התאמה חלקית" },
            ": רוב הקריטריונים מתקיימים, למעט המגבלות המפורטות להלן.",
          ],
        },
      ],
    },
    {
      id: "measures",
      title: "אמצעי הנגישות שננקטו",
      blocks: [
        {
          kind: "list",
          items: [
            ["מבנה HTML סמנטי עם אזורים מוגדרים (כותרת עליונה, ניווט, תוכן ראשי, כותרת תחתונה), כותרת ראשית אחת בכל עמוד וסדר כותרות הגיוני."],
            ["קישור \"דילוג לתוכן הראשי\" כרכיב הראשון שמקבל מיקוד."],
            ["תפעול מלא באמצעות המקלדת, כולל התפריט בנייד (מקש Escape סוגר אותו ומחזיר את המיקוד לכפתור)."],
            ["סימון מיקוד בולט שאינו מוסתר על ידי הכותרת הנצמדת או פס ההדגמה."],
            ["ניגודיות צבעים של 4.5:1 לפחות לטקסט ו־3:1 לפחות לרכיבי ממשק ולסימון המיקוד."],
            ["הגדרת שפה וכיווניות נכונות: עברית מימין לשמאל, אנגלית משמאל לימין."],
            ["טקסט חלופי לתמונות בעלות משמעות; תמונות דקורטיביות מוסתרות מטכנולוגיות מסייעות."],
            ["תצוגה רספונסיבית המתאימה את עצמה לרוחב 320 פיקסלים ולהגדלה של 400% ללא גלילה אופקית."],
            ["שדות טופס עם תוויות גלויות והשלמה אוטומטית. שגיאות מתוארות בטקסט ליד השדה, מקושרות אליו עבור קוראי מסך, והמיקוד עובר לשדה הראשון שדורש תיקון. הודעות סטטוס מוקראות; ללא CAPTCHA."],
            ["ללא קרוסלות או אפקט פרלקסה. במסכים גדולים מוצג בדף הבית סרטון רקע דקורטיבי ללא קול, שמתחיל רק לאחר טעינת הדף, כולל כפתור השהיה גלוי, ואינו פועל כאשר הגדרת \"הפחתת תנועה\" פעילה במערכת. שאר התנועה מוגבלת לגלילה חלקה ולמעברים קצרים, שגם הם מבוטלים תחת \"הפחתת תנועה\"."],
            ["ללא תוסף נגישות חיצוני: הנגישות מובנית בקוד האתר עצמו."],
          ],
        },
      ],
    },
    {
      id: "limitations",
      title: "מגבלות ידועות",
      blocks: [
        {
          kind: "list",
          items: [
            ["טופס יצירת הקשר הוא להדגמה בלבד: הודעות אינן נשלחות ואינן נשמרות."],
            ["חלק מקישורי הניווט מובילים לעמודים באתר המקורי, שאינם כלולים בהצהרה זו."],
            ["לוגואים של שותפים הם תמונות של צד שלישי. כאשר לוגו מופיע לבדו, הטקסט החלופי שלו הוא שם החברה; בכרטיסי העסקאות הלוגואים דקורטיביים, משום שכותרת הכרטיס כבר מציינת את הצדדים."],
            ["בעברית זמינים רק דף הבית והצהרה זו; שאר העמודים זמינים באנגלית."],
          ],
        },
      ],
    },
    {
      id: "contact",
      title: "פנייה בנושא נגישות",
      blocks: [
        {
          kind: "p",
          content: [
            "נתקלתם בבעיית נגישות או שאתם זקוקים למידע בפורמט נגיש? נשמח לשמוע. אנא ציינו את כתובת העמוד, את הפעולה שניסיתם לבצע ואת הטכנולוגיה המסייעת שבה אתם משתמשים, אם יש כזו.",
          ],
        },
        { kind: "contact", emailLabel: "דוא\"ל:", addressLabel: "כתובת:", address: "הגביש 8, נתניה" },
      ],
    },
    {
      id: "coordinator",
      title: "רכז/ת נגישות",
      blocks: [
        { kind: "p", content: ["פניות בנושא נגישות מטופלות דרך פרטי הקשר הכלליים של החברה:"] },
        { kind: "contact", emailLabel: "דוא\"ל:", addressLabel: "כתובת:", address: "הגביש 8, נתניה" },
        {
          kind: "p",
          content: [
            "זהו אתר הדגמה, ולכן לא מפורסמים כאן שם של רכז/ת נגישות או מספר טלפון. על מפעיל האתר הרשמי להוסיף את שם הרכז/ת, מספר הטלפון וכתובת הדוא\"ל.",
          ],
        },
      ],
    },
    {
      id: "testing",
      title: "כיצד נבדק האתר",
      blocks: [
        {
          kind: "list",
          items: [
            ["סריקה אוטומטית ב־axe-core (כללי WCAG 2.2 AA) של כל העמודים ברוחב 375 ו־1440 פיקסלים, וכן בדיקות נגישות של Lighthouse בעמודים המרכזיים."],
            ["מעבר ידני במקלדת בכל העמודים, כולל התפריט בנייד וטופס יצירת הקשר."],
            ["בדיקת התאמה לרוחב 320 פיקסלים, ובדיקה עם הגדרות ריווח הטקסט של WCAG."],
            ["בדיקה כאשר הגדרת \"הפחתת תנועה\" פעילה במערכת."],
          ],
        },
      ],
    },
    {
      id: "date",
      title: "תאריך",
      blocks: [{ kind: "date", before: "עדכון אחרון: ", dateTime: UPDATED, label: "2 בנובמבר 2026", after: "" }],
    },
  ],
};

/** Both language versions of the statement, for hreflang alternates. */
export const accessibilityAlternates: Record<Locale, string> = {
  en: accessibility.seo.path,
  he: accessibilityHe.seo.path,
};
