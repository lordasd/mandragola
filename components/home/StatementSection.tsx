import type { HomeContent, Link } from "@/content/types";
import { ButtonLink } from "@/components/ui/Button";
import { Lines } from "@/components/ui/Lines";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "./SectionIntro";

/** "Capital. Access. Strategic execution." — h2 + marker line | body + optional outline button. */
export function StatementSection({ philosophy, cta }: { philosophy: HomeContent["philosophy"]; cta?: Link }) {
  const id = "statement-title";
  return (
    <Section variant="plain" tone="light" aria-labelledby={id}>
      <div className="grid gap-8 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-center lg:gap-12">
        <SectionIntro id={id} title={philosophy.title} size="h3" marker uppercase />
        <div>
          <p className="max-w-lead text-body-lg text-muted lg:max-w-none lg:text-body-md">
            <Lines text={philosophy.body} />
          </p>
          {cta && (
            <ButtonLink href={cta.href} variant="outline" arrow className="mt-8">
              {cta.label}
            </ButtonLink>
          )}
        </div>
      </div>
    </Section>
  );
}
