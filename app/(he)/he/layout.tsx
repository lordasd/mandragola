import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "../../globals.css";
import { SiteShell } from "@/components/layout/SiteShell";
import { site, siteHe } from "@/content/site";
import { heFontVars } from "@/lib/fonts";
import { NO_INDEX, SITE_URL } from "@/lib/seo";
import { THEME_COLOR } from "@/lib/theme";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${site.name} — ${siteHe.tagline}`, template: `%s — ${site.name}` },
  description: `${site.name} — ${siteHe.tagline}`,
  applicationName: site.name,
  robots: NO_INDEX,
};

export const viewport: Viewport = {
  themeColor: THEME_COLOR,
};

export default function HebrewRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={heFontVars}>
      <body>
        <SiteShell site={site} locale="he">
          {children}
        </SiteShell>
      </body>
    </html>
  );
}
