import type { Link } from "@/content/types";
import { ButtonLink } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { MarkerLine } from "@/components/ui/MarkerLine";

interface CtaBandProps {
  title: string;
  body: string;
  link: Link;
  /** Heading id (names the region). Override only if a page renders two bands. */
  id?: string;
}

/** Ink section card: heading + lead at start, gold button at end (stacked below lg). Brief §4 "CTA band". */
export function CtaBand({ title, body, link, id = "cta-band-title" }: CtaBandProps) {
  return (
    <Section tone="ink" aria-labelledby={id}>
      <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-8">
          <Heading as="h2" size="h3" id={id}>
            {title}
          </Heading>
          <MarkerLine />
          <p className="mt-5 max-w-lead text-body-xl text-on-ink-muted">{body}</p>
        </div>
        <div className="lg:col-span-4 lg:flex lg:justify-end">
          <ButtonLink href={link.href} variant="gold" tone="ink" arrow>
            {link.label}
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
