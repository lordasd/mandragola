import Image from "next/image";
import Link from "next/link";
import type { Locale, SiteContent } from "@/content/types";
import { buttonClass } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { localizeLinks, ui } from "@/lib/i18n";
import { MobileNav } from "./MobileNav";
import { LanguageLink } from "./LanguageLink";
import { NavLink } from "./NavLink";

interface HeaderProps {
  site: SiteContent;
  locale: Locale;
}

/**
 * Sticky below the fixed demo banner. Ink bar (white logo) inside the container.
 * Uses logical properties only, so it mirrors automatically under dir="rtl".
 */
export function Header({ site, locale }: HeaderProps) {
  const t = ui[locale];
  const homeHref = locale === "he" ? "/he" : "/";
  const items = localizeLinks(site.nav, locale);
  const [action] = localizeLinks([site.primaryCta], locale);

  return (
    <header className="on-ink pt-2 pb-2 lg:pt-4">
      <Container className="relative">
        {/* Hairline + shadow: the bar is ink like the section cards it scrolls over, so it needs an edge. */}
        <div className="flex min-h-16 items-center justify-between gap-6 rounded-nav border border-line-on-ink bg-ink px-4 py-2.5 shadow-lg shadow-ink/25 lg:min-h-21 lg:px-10">
          <Link href={homeHref} className="inline-flex min-h-11 shrink-0 items-center rounded-control">
            <Image
              src={site.logo.src}
              alt={t.home}
              width={site.logo.width}
              height={site.logo.height}
              loading="eager"
              className="h-9 w-auto lg:h-11"
            />
          </Link>

          <nav aria-label={t.primaryNav} className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {items.map((item) => (
                <li key={item.href}>
                  <NavLink
                    href={item.href}
                    hrefLang={item.hrefLang}
                    className="inline-flex min-h-11 items-center text-body text-on-ink decoration-gold decoration-2 underline-offset-6 hover:text-gold hover:underline aria-[current=page]:underline"
                  >
                    {item.label}
                    {item.srSuffix && <span className="sr-only">{item.srSuffix}</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <LanguageLink
              locale={locale}
              language={t.switchLanguage}
              className="inline-flex min-h-11 items-center text-body text-on-ink hover:text-gold hover:underline"
            />
            {/* Hash link to the contact section is never the current page, so a plain Link (no client NavLink). */}
            <Link href={action.href} className={buttonClass("outline", "ink")}>
              {action.label}
            </Link>
          </div>

          <MobileNav
            items={items}
            cta={action}
            navLabel={t.primaryNav}
            openLabel={t.openMenu}
            closeLabel={t.closeMenu}
            language={t.switchLanguage}
            locale={locale}
          />
        </div>
      </Container>
    </header>
  );
}
