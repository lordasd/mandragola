import type { ContactFormCopy, HomeContent, Locale } from "@/content/types";
import { site } from "@/content/site";
import { ContactForm } from "@/components/ui/ContactForm";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Lines } from "@/components/ui/Lines";
import { Section } from "@/components/ui/Section";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { MailIcon, PinIcon } from "@/components/ui/icons";
import { siteText, ui } from "@/lib/i18n";

interface ContactSectionProps {
  locale: Locale;
  copy: HomeContent["contact"];
  form: ContactFormCopy;
}

const groupTitle = "font-sans text-eyebrow uppercase text-gold";

/**
 * `id="contact"` target of the header CTA. Form column (with the section h2) comes first in the DOM, so on
 * mobile the heading + form lead and the info card (ink, from `site`) follows; on lg the card is moved to the
 * start column visually (lg:order-first). Brief §4 "Contact section".
 */
export function ContactSection({ locale, copy, form }: ContactSectionProps) {
  const t = ui[locale];
  const { address } = siteText(site, locale);
  const headingId = "contact-title";
  const socialId = `${headingId}-social`;

  return (
    <Section id="contact" tone="raised" aria-labelledby={headingId}>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <Heading as="h2" size="h3" id={headingId} className="mt-4.5 text-ink">
            {copy.title}
          </Heading>
          <p className="mt-5 max-w-lead text-body-lg text-muted">
            <Lines text={copy.body} />
          </p>
          <ContactForm copy={form} className="mt-8" />
        </div>

        <div className="on-ink rounded-card bg-ink px-6 py-8 text-on-ink md:px-10 md:py-12 lg:order-first lg:col-span-5 lg:px-12 lg:py-20">
          <address className="space-y-8 not-italic">
            <div>
              <p className={groupTitle}>{t.footerContact}</p>
              <p className="mt-3 flex items-start gap-3 text-body-md">
                <PinIcon size={22} className="mt-0.5 shrink-0 text-gold" />
                {/* Address and email isolated so bidi keeps numbers and the Latin email in order in RTL */}
                <bdi>{address}</bdi>
              </p>
              <a
                href={`mailto:${site.contact.email}`}
                className="mt-2 inline-flex min-h-11 items-center gap-3 text-body-md break-all text-on-ink underline decoration-gold underline-offset-4 hover:text-gold"
              >
                <MailIcon size={22} className="shrink-0 text-gold" />
                <span>
                  <span className="sr-only">{t.emailLabel}: </span>
                  <bdi>{site.contact.email}</bdi>
                </span>
              </a>
            </div>
            {site.social.length > 0 && (
              <div>
                <p className={groupTitle} id={socialId}>
                  {t.footerFollow}
                </p>
                <SocialLinks links={site.social} labelledBy={socialId} className="mt-3 gap-3" />
              </div>
            )}
          </address>
        </div>
      </div>
    </Section>
  );
}
