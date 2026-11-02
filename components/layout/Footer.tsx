import Image from "next/image";
import Link from "next/link";
import type { Locale, SiteContent } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { MailIcon, PinIcon } from "@/components/ui/icons";
import { COPYRIGHT_YEAR, localizeLinks, siteText, ui } from "@/lib/i18n";

interface FooterProps {
  site: SiteContent;
  locale: Locale;
}

const linkClass =
  "inline-flex min-h-11 items-center gap-2 text-on-ink-muted hover:text-on-ink hover:underline focus-visible:underline";
const headingClass = "font-sans text-body font-semibold text-on-ink";

/** Ink block with rounded top at container width (Figma 1:199). */
export function Footer({ site, locale }: FooterProps) {
  const t = ui[locale];
  const { tagline, address } = siteText(site, locale);
  const a11yHref = locale === "he" ? "/he/accessibility" : "/accessibility";
  const company = localizeLinks(site.footerLinks, locale);

  return (
    <Container as="footer" className="mt-section-gap">
      <div className="on-ink rounded-t-section bg-ink px-6 pt-12 pb-6 text-on-ink lg:px-10 lg:pt-15 lg:pb-7.5">
        <div className="grid gap-10 md:grid-cols-3 lg:grid-cols-12">
          <div className="md:col-span-3 lg:col-span-3">
            <Image src={site.logo.src} alt={site.name} width={site.logo.width} height={site.logo.height} className="h-12 w-auto" />
            <p className="mt-4 max-w-xs text-on-ink-muted">{tagline}</p>
          </div>

          <nav aria-label={t.footerNav} className="lg:col-span-3">
            <h2 className={headingClass}>{t.footerCompany}</h2>
            <ul className="mt-3">
              {company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h2 className={headingClass}>{t.footerContact}</h2>
            <address className="mt-3 not-italic">
              <p className="flex min-h-11 items-center gap-2 text-on-ink-muted">
                <PinIcon size={20} className="shrink-0 text-gold" />
                {/* Isolated so bidi keeps the street number in place in either direction */}
                <bdi>{address}</bdi>
              </p>
              <a href={`mailto:${site.contact.email}`} className={linkClass}>
                <MailIcon size={20} className="shrink-0 text-gold" />
                <span>
                  <span className="sr-only">{t.emailLabel}: </span>
                  <bdi>{site.contact.email}</bdi>
                </span>
              </a>
            </address>
            <SocialLinks links={site.social} label={t.footerFollow} className="mt-3 gap-2" />
          </div>

          <div className="lg:col-span-2">
            <h2 className={headingClass}>{t.footerLegal}</h2>
            <ul className="mt-3">
              <li>
                <Link href={a11yHref} className={linkClass}>
                  {t.accessibility}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line-on-ink pt-6 text-small text-on-ink-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {COPYRIGHT_YEAR} {site.name}. {t.demoRebuild}
          </p>
          <a
            href={t.switchLanguage.href}
            hrefLang={t.switchLanguage.hrefLang}
            lang={t.switchLanguage.lang}
            className="inline-flex min-h-11 items-center text-on-ink-muted hover:text-on-ink hover:underline"
          >
            {t.switchLanguage.label}
          </a>
        </div>
      </div>
    </Container>
  );
}
