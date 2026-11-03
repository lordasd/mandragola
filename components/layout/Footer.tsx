import Image from "next/image";
import Link from "next/link";
import type { Locale, SiteContent } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { COPYRIGHT_YEAR, localizeLinks, siteText, ui } from "@/lib/i18n";
import { LanguageLink } from "./LanguageLink";

interface FooterProps {
  site: SiteContent;
  locale: Locale;
}

const linkClass =
  "inline-flex min-h-9 items-center gap-2 text-on-ink-muted hover:text-on-ink hover:underline focus-visible:underline";
const headingClass = "font-sans text-body font-semibold text-on-ink";

/** Ink block with rounded top at container width (Figma 1:199). */
export function Footer({ site, locale }: FooterProps) {
  const t = ui[locale];
  const { tagline } = siteText(site, locale);
  const a11yHref = locale === "he" ? "/he/accessibility" : "/accessibility";
  const company = localizeLinks(site.footerLinks, locale);

  return (
    <Container as="footer" className="mt-section-gap">
      <div className="on-ink rounded-t-section bg-ink px-6 pt-8 pb-4 text-on-ink lg:px-10 lg:pt-10 lg:pb-5">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <Image src={site.logo.src} alt={site.name} width={site.logo.width} height={site.logo.height} className="h-16 w-auto lg:h-24" />
            <p className="mt-3 max-w-xs text-on-ink-muted">{tagline}</p>
          </div>

          <div className="flex flex-wrap gap-x-12 gap-y-6">
            <nav aria-label={t.footerNav}>
              <h2 className={headingClass}>{t.footerCompany}</h2>
              {/* 2 columns (3 at sm+): six links in 3 (2) short rows instead of one tall stack. */}
              <ul className="mt-2 grid grid-cols-2 gap-x-8 sm:grid-cols-3">
                {company.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} hrefLang={link.hrefLang} className={linkClass}>
                      {link.label}
                      {link.srSuffix && <span className="sr-only">{link.srSuffix}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className={headingClass}>{t.footerLegal}</h2>
              <ul className="mt-2">
                <li>
                  <Link href={a11yHref} className={linkClass}>
                    {t.accessibility}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-1 border-t border-line-on-ink pt-4 text-small text-on-ink-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {COPYRIGHT_YEAR} {site.name}. {t.demoRebuild}
          </p>
          <LanguageLink
            locale={locale}
            language={t.switchLanguage}
            className="inline-flex min-h-9 items-center text-on-ink-muted hover:text-on-ink hover:underline"
          />
        </div>
      </div>
    </Container>
  );
}
