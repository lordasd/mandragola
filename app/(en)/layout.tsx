import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "../globals.css";
import { SiteShell } from "@/components/layout/SiteShell";
import { site } from "@/content/site";
import { enFontVars } from "@/lib/fonts";
import { NO_INDEX, SITE_URL } from "@/lib/seo";
import { THEME_COLOR } from "@/lib/theme";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${site.name} — ${site.tagline}`, template: `%s — ${site.name}` },
  description: site.tagline,
  applicationName: site.name,
  robots: NO_INDEX,
};

export const viewport: Viewport = {
  themeColor: THEME_COLOR,
};

export default function EnglishRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={enFontVars}>
      <body>
        <SiteShell site={site} locale="en">
          {children}
        </SiteShell>
      </body>
    </html>
  );
}
