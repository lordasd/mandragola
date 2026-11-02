import type { Metadata } from "next";
import "./globals.css";
import { SiteShell } from "@/components/layout/SiteShell";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { site } from "@/content/site";
import { enFontVars } from "@/lib/fonts";
import { NO_INDEX, SITE_URL } from "@/lib/seo";

// Unmatched URLs across both root layouts land here (experimental.globalNotFound).
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `Page not found — ${site.name}`,
  description: "The page you are looking for does not exist.",
  robots: NO_INDEX,
};

export default function GlobalNotFound() {
  return (
    <html lang="en" dir="ltr" className={enFontVars}>
      <body>
        <SiteShell site={site} locale="en">
          <Container className="py-section-y">
            <Eyebrow>Error 404</Eyebrow>
            <Heading as="h1" size="h2" className="mt-4 text-ink">
              Page not found
            </Heading>
            <p className="mt-5 max-w-lead text-body-xl text-muted">
              The page you are looking for does not exist or has moved.{" "}
              <span lang="he" dir="rtl">
                הדף שחיפשת לא נמצא.
              </span>
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href="/" arrow>
                Back to home
              </ButtonLink>
              <ButtonLink href="/he" variant="outline" lang="he">
                לדף הבית בעברית
              </ButtonLink>
            </div>
          </Container>
        </SiteShell>
      </body>
    </html>
  );
}
