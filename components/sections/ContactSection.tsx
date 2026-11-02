import type { ContactFormCopy, HomeContent, Locale } from "@/content/types";
import { site } from "@/content/site";
import { ContactForm } from "@/components/ui/ContactForm";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { MailIcon, PinIcon, socialIcons } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { ui } from "@/lib/i18n";

/** Brand names, identical in every locale. */
const networkName = { linkedin: "LinkedIn", facebook: "Facebook", x: "X" } as const;

interface ContactSectionProps {
  locale: Locale;
  copy: HomeContent["contact"];
  form: ContactFormCopy;
  className?: string;
}

const groupTitle = "font-sans text-eyebrow uppercase text-gold";

/**
 * `id="contact"` target of the header CTA. Info column (ink card, from `site`) comes first in the DOM
 * (short; stacks above the form on mobile), form column at end on lg. Brief §4 "Contact section".
 */
export function ContactSection({ locale, copy, form, className }: ContactSectionProps) {
  const t = ui[locale];
  const headingId = "contact-title";

  return (
    <Section id="contact" tone="raised" aria-labelledby={headingId} className={className}>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="on-ink rounded-card bg-ink px-6 py-8 text-on-ink md:px-10 md:py-12 lg:col-span-5 lg:px-12 lg:py-20">
          <address className="space-y-8 not-italic">
            <div>
              <p className={groupTitle}>{t.footerContact}</p>
              <p className="mt-3 flex items-start gap-3 text-body-md">
                <PinIcon size={22} className="mt-0.5 shrink-0 text-gold" />
                <span>{site.contact.address}</span>
              </p>
              <a
                href={`mailto:${site.contact.email}`}
                className="mt-2 inline-flex min-h-11 items-center gap-3 text-body-md break-all text-on-ink underline decoration-gold underline-offset-4 hover:text-gold"
              >
                <MailIcon size={22} className="shrink-0 text-gold" />
                <span>
                  <span className="sr-only">{t.emailLabel}: </span>
                  {site.contact.email}
                </span>
              </a>
            </div>
            {site.social.length > 0 && (
              <div>
                <p className={groupTitle} id={`${headingId}-social`}>
                  {t.footerFollow}
                </p>
                <ul className="mt-3 flex flex-wrap gap-3" aria-labelledby={`${headingId}-social`}>
                  {site.social.map((s) => {
                    const Icon = socialIcons[s.network];
                    return (
                      <li key={s.href}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={networkName[s.network]}
                          className="inline-flex size-11 items-center justify-center rounded-full border border-on-ink/60 text-on-ink motion-safe:transition-colors motion-safe:duration-150 hover:border-gold hover:text-gold"
                        >
                          <Icon size={20} />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </address>
        </div>

        <div className={cn("lg:col-span-7")}>
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <Heading as="h2" size="h3" id={headingId} className="mt-4.5 text-ink">
            {copy.title}
          </Heading>
          <p className="mt-5 max-w-lead text-body-lg text-muted">{copy.body}</p>
          <ContactForm copy={form} hint={t.formHint} className="mt-8" />
        </div>
      </div>
    </Section>
  );
}
