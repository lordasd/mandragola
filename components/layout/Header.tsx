import Image from "next/image";
import Link from "next/link";
import type { Locale, SiteContent } from "@/content/types";
import { buttonClass } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { localizeLinks, ui } from "@/lib/i18n";
import { MobileNav } from "./MobileNav";
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
    <header className="on-ink sticky top-(--banner-h) z-50 pt-2 pb-2 lg:pt-4">
      <Container className="relative">
        <div className="flex min-h-16 items-center justify-between gap-6 rounded-nav bg-ink px-4 py-2.5 lg:min-h-21 lg:px-10">
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
                    className="inline-flex min-h-11 items-center text-body text-on-ink decoration-gold decoration-2 underline-offset-6 hover:text-gold hover:underline aria-[current=page]:underline"
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <a
              href={t.switchLanguage.href}
              hrefLang={t.switchLanguage.hrefLang}
              lang={t.switchLanguage.lang}
              className="inline-flex min-h-11 items-center text-body text-on-ink hover:text-gold hover:underline"
            >
              {t.switchLanguage.label}
            </a>
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
          />
        </div>
      </Container>
    </header>
  );
}
