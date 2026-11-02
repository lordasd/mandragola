import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "../../globals.css";
import { SiteShell } from "@/components/layout/SiteShell";
import { site } from "@/content/site";
import { heFontVars } from "@/lib/fonts";
import { NO_INDEX, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${site.name} — השקעות ושותפויות גלובליות`, template: `%s — ${site.name}` },
  description: "Mandragola Ltd — השקעות ושותפויות גלובליות",
  applicationName: site.name,
  robots: NO_INDEX,
};

export const viewport: Viewport = {
  themeColor: "#0b1b2e",
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
