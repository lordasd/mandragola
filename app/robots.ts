import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Demo build: block all crawling (assignment rule). Sitemap is still published so the SEO setup can be reviewed.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
