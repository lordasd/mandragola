import type { ReactNode } from "react";
import type { Locale, SiteContent } from "@/content/types";
import { DemoBanner } from "@/components/ui/DemoBanner";
import { SkipLink } from "@/components/ui/SkipLink";
import { ui } from "@/lib/i18n";
import { Footer } from "./Footer";
import { Header } from "./Header";

/** Body contents shared by both root layouts: skip link, demo banner, header, main, footer. Organization/WebSite JSON-LD belongs on the home pages. */
export function SiteShell({ site, locale, children }: { site: SiteContent; locale: Locale; children: ReactNode }) {
  const t = ui[locale];
  return (
    <>
      <SkipLink label={t.skipToContent} />
      {/* One sticky bar: demo banner (always visible) + header */}
      <div className="sticky top-0 z-50">
        <DemoBanner text={locale === "en" ? site.demoBanner : t.demoBanner} label={t.demoBannerLabel} />
        <Header site={site} locale={locale} />
      </div>
      {/* tabIndex -1: skip-link target; programmatic focus on <main> needs no ring (not interactive) */}
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer site={site} locale={locale} />
    </>
  );
}
