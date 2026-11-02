import { LegalPage, LegalSection } from "@/components/layout/LegalPage";
import { JsonLd } from "@/components/ui/JsonLd";
import { site } from "@/content/site";
import { breadcrumbLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Accessibility statement",
  description:
    "Accessibility statement for the Mandragola Ltd demo rebuild: WCAG 2.2 AA target (Israeli Standard IS 5568), measures taken, known limitations and how to report an issue.",
  path: "/accessibility",
  locale: "en",
  alternates: { en: "/accessibility", he: "/he/accessibility" },
});

const email = site.contact.email;

export default function AccessibilityPage() {
  return (
    <>
      <LegalPage
        eyebrow="Accessibility"
        title="Accessibility statement"
        intro={
          <p>
            This statement applies to this <strong>demo rebuild</strong> of the Mandragola Ltd website, made for a
            recruitment assignment. It is not the official Mandragola website and does not describe the official site.
          </p>
        }
      >
        <LegalSection id="commitment" title="Our commitment">
          <p>
            We want everyone, including people with disabilities, to be able to use this website independently and
            with dignity. Accessibility was a requirement from the start of the build, not something added afterwards.
          </p>
        </LegalSection>

        <LegalSection id="conformance" title="Conformance status">
          <p>
            The target level is <strong>WCAG 2.2 level AA</strong>, in line with Israeli Standard IS 5568 and
            regulation 35 of the Equal Rights for Persons with Disabilities (Accessibility Adjustments to Service)
            Regulations, 5773-2013. We consider the site <strong>partially conformant</strong>: most criteria are met,
            with the known limitations listed below.
          </p>
        </LegalSection>

        <LegalSection id="measures" title="Measures taken">
          <ul>
            <li>
              Semantic landmarks (header, navigation, main, footer), one main heading per page and a logical heading
              order.
            </li>
            <li>A &ldquo;Skip to main content&rdquo; link as the first focusable element.</li>
            <li>Full keyboard operation, including the mobile menu (Escape closes it and returns focus to the button).</li>
            <li>A clearly visible focus indicator that is never hidden behind the sticky header or the demo banner.</li>
            <li>Color contrast of at least 4.5:1 for text and 3:1 for controls and focus indicators.</li>
            <li>Correct page language and direction: English left-to-right, Hebrew right-to-left.</li>
            <li>Text alternatives for meaningful images; decorative images are hidden from assistive technology.</li>
            <li>Responsive layout that reflows at 320 px width and 400% zoom without horizontal scrolling.</li>
            <li>
              Form fields with visible labels, autocomplete hints and status messages announced to screen readers; no
              CAPTCHA.
            </li>
            <li>Animations reduced or removed when the &ldquo;reduce motion&rdquo; system setting is on.</li>
            <li>No accessibility overlay widget: accessibility is built into the markup itself.</li>
            <li>Automated testing (axe-core, Lighthouse) plus manual keyboard and screen reader (NVDA) checks.</li>
          </ul>
        </LegalSection>

        <LegalSection id="limitations" title="Known limitations">
          <ul>
            <li>The contact form is a demonstration only: it does not send or store messages.</li>
            <li>Some navigation links lead to pages of the original website, which are outside the scope of this statement.</li>
            <li>Partner logos are third-party images; their text alternative is the company name only.</li>
            <li>Only the home page and this statement are available in Hebrew.</li>
          </ul>
        </LegalSection>

        <LegalSection id="contact" title="Report an accessibility issue">
          <p>
            If you find an accessibility barrier or need information in an accessible format, please contact us. Tell
            us the page address, what you were trying to do and the assistive technology you use, if any.
          </p>
          <p>
            Email: <a href={`mailto:${email}`}>{email}</a>
            <br />
            Address: {site.contact.address}
          </p>
          <p>Because this is a demo, the contact details are shown as they would appear on a live site.</p>
        </LegalSection>

        <LegalSection id="date" title="Date">
          <p>
            This statement was prepared on <time dateTime="2026-11-02">2 November 2026</time>.
          </p>
        </LegalSection>
      </LegalPage>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Accessibility statement", path: "/accessibility" },
        ])}
      />
    </>
  );
}
