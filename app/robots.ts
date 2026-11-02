import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Crawling is allowed on purpose: a crawler blocked by robots.txt never sees the page's noindex
// (meta robots + X-Robots-Tag), and can still index the bare URL from external links.
// Letting it fetch the page is what actually keeps this demo out of search results.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
