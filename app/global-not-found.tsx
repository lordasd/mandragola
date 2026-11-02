import type { Metadata, Viewport } from "next";
import "./globals.css";
import { NotFoundBody } from "@/components/layout/NotFoundBody";
import { SiteShell } from "@/components/layout/SiteShell";
import { notFound } from "@/content/not-found";
import { site } from "@/content/site";
import { enFontVars } from "@/lib/fonts";
import { NO_INDEX, SITE_URL } from "@/lib/seo";
import { THEME_COLOR } from "@/lib/theme";

// Unmatched URLs across both root layouts land here (experimental.globalNotFound).
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${notFound.title} — ${site.name}`,
  description: notFound.body,
  robots: NO_INDEX,
};

export const viewport: Viewport = {
  themeColor: THEME_COLOR,
};

export default function GlobalNotFound() {
  return (
    <html lang="en" dir="ltr" className={enFontVars}>
      <body>
        <SiteShell site={site} locale="en">
          <NotFoundBody />
        </SiteShell>
      </body>
    </html>
  );
}
