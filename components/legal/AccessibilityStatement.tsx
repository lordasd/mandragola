import { Fragment } from "react";
import { LegalPage, LegalSection } from "@/components/layout/LegalPage";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import type { A11yBlock, A11yInline, AccessibilityContent } from "@/content/accessibility";
import { site } from "@/content/site";
import type { Locale } from "@/content/types";
import { ui } from "@/lib/i18n";
import { breadcrumbLd } from "@/lib/seo";

function Inline({ parts }: { parts: A11yInline[] }) {
  return parts.map((part, i) =>
    typeof part === "string" ? <Fragment key={i}>{part}</Fragment> : <strong key={i}>{part.strong}</strong>,
  );
}

function Block({ block }: { block: A11yBlock }) {
  switch (block.kind) {
    case "p":
      return (
        <p>
          <Inline parts={block.content} />
        </p>
      );
    case "list":
      return (
        <ul>
          {block.items.map((item, i) => (
            <li key={i}>
              <Inline parts={item} />
            </li>
          ))}
        </ul>
      );
    case "contact": {
      const email = site.contact.email;
      return (
        <p>
          {block.emailLabel}{" "}
          <a href={`mailto:${email}`} dir="ltr">
            {email}
          </a>
          <br />
          {block.addressLabel} {block.address}
        </p>
      );
    }
    case "date":
      return (
        <p>
          {block.before}
          <time dateTime={block.dateTime}>{block.label}</time>
          {block.after}
        </p>
      );
  }
}

/** Accessibility statement page body, shared by /accessibility and /he/accessibility. */
export function AccessibilityStatement({ content, locale }: { content: AccessibilityContent; locale: Locale }) {
  const trail = [
    { name: content.home.label, path: content.home.href },
    { name: content.title, path: content.seo.path },
  ];
  return (
    <>
      <JsonLd data={breadcrumbLd(trail)} />
      <Container className="pt-4">
        <Breadcrumb label={ui[locale].breadcrumb} items={[{ label: trail[0].name, href: trail[0].path }, { label: trail[1].name }]} />
      </Container>
      <LegalPage
        eyebrow={content.eyebrow}
        title={content.title}
        intro={
          <p>
            <Inline parts={content.intro} />
          </p>
        }
      >
        {content.sections.map((section) => (
          <LegalSection key={section.id} id={section.id} title={section.title}>
            {section.blocks.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </LegalSection>
        ))}
      </LegalPage>
    </>
  );
}
