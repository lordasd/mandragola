import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

const LAST_MODIFIED = "2026-11-02";

const pairs = { en: absoluteUrl("/"), he: absoluteUrl("/he") };
const a11yPairs = { en: absoluteUrl("/accessibility"), he: absoluteUrl("/he/accessibility") };

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: pairs.en, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 1, alternates: { languages: pairs } },
    { url: absoluteUrl("/expertise"), lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/transactions"), lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.8 },
    { url: a11yPairs.en, lastModified: LAST_MODIFIED, changeFrequency: "yearly", priority: 0.3, alternates: { languages: a11yPairs } },
    { url: pairs.he, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.9, alternates: { languages: pairs } },
    { url: a11yPairs.he, lastModified: LAST_MODIFIED, changeFrequency: "yearly", priority: 0.3, alternates: { languages: a11yPairs } },
  ];
}
