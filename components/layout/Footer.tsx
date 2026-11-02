import Image from "next/image";
import Link from "next/link";
import type { Link as NavItem, Locale, SiteContent } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { MailIcon, PinIcon, socialIcons } from "@/components/ui/icons";
import { COPYRIGHT_YEAR, localizeLinks, ui } from "@/lib/i18n";

const networkName = { linkedin: "LinkedIn", facebook: "Facebook", x: "X" } as const;

interface FooterProps {
  site: SiteContent;
  locale: Locale;
  /** Override "Company" links; defaults to site.footerLinks (labels localized for he). */
  links?: NavItem[];
}

const linkClass =
  "inline-flex min-h-11 items-center gap-2 text-on-ink-muted hover:text-on-ink hover:underline focus-visible:underline";
const headingClass = "font-sans text-body font-semibold text-on-ink";

/** Ink block with rounded top at container width (Figma 1:199). */
export function Footer({ site, locale, links }: FooterProps) {
  const t = ui[locale];
  const a11yHref = locale === "he" ? "/he/accessibility" : "/accessibility";
  const company = links ?? localizeLinks(site.footerLinks, locale);

  return (
    <Container as="footer" className="mt-section-gap">
      <div className="on-ink rounded-t-section bg-ink px-6 pt-12 pb-6 text-on-ink lg:px-10 lg:pt-15 lg:pb-7.5">
        <div className="grid gap-10 md:grid-cols-3 lg:grid-cols-12">
          <div className="md:col-span-3 lg:col-span-3">
            <Image src={site.logo.src} alt={site.name} width={site.logo.width} height={site.logo.height} className="h-12 w-auto" />
            <p className="mt-4 max-w-xs text-on-ink-muted">{site.tagline}</p>
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
                <span>{site.contact.address}</span>
              </p>
              <a href={`mailto:${site.contact.email}`} className={linkClass}>
                <MailIcon size={20} className="shrink-0 text-gold" />
                <span>
                  <span className="sr-only">{t.emailLabel}: </span>
                  {site.contact.email}
                </span>
              </a>
            </address>
            {site.social.length > 0 && (
              <ul className="mt-3 flex gap-2" aria-label={t.footerFollow}>
                {site.social.map((s) => {
                  const Icon = socialIcons[s.network];
                  return (
                    <li key={s.href}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex size-11 items-center justify-center rounded-full border border-on-ink/60 text-on-ink hover:border-gold hover:text-gold"
                      >
                        <Icon size={20} />
                        <span className="sr-only">{networkName[s.network]}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
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
