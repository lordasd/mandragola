import Link from "next/link";
import type { HomeContent } from "@/content/types";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { featureIcons } from "@/components/ui/icons";
import { SectionIntro } from "./SectionIntro";

/**
 * Ink card with centered intro + 2x2 raised cards. Each card is an <article> whose title link is stretched
 * over the card; the focus ring is drawn around the card (offset onto the ink bg, gold = 9.09:1).
 */
export function ExpertiseCards({ teaser }: { teaser: HomeContent["expertiseTeaser"] }) {
  const id = "expertise-title";
  return (
    <Section tone="ink" aria-labelledby={id}>
      <SectionIntro id={id} title={teaser.title} size="h2" tone="ink" align="center" marker uppercase />
      <ul className="mt-stack-lg grid gap-4 md:grid-cols-2 md:gap-7.5">
        {teaser.items.map((item) => {
          const Icon = item.icon ? featureIcons[item.icon] : null;
          return (
            <li key={item.id} className="flex">
              <Card
                as="article"
                className="relative flex w-full flex-col items-center px-6 py-10 text-center text-text motion-safe:transition-colors motion-safe:duration-150 hover:border-gold-text has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-3 has-[a:focus-visible]:outline-(--focus-ring) has-[a:focus-visible]:outline-solid md:px-12 md:py-16"
              >
                {Icon && <Icon size={48} strokeWidth={1.5} className="text-gold-text" />}
                <h3 className="mt-5 font-heading text-h4 text-ink">
                  {/* Ring drawn on the card (has-[]), so the link itself needs none. */}
                  <Link
                    href={`/expertise#${item.id}`}
                    className="after:absolute after:inset-0 after:rounded-card hover:underline focus-visible:outline-none"
                  >
                    {item.title}
                  </Link>
                </h3>
                <p className="mt-3 max-w-prose text-body-md text-muted">{item.body}</p>
              </Card>
            </li>
          );
        })}
      </ul>
      <div className="mt-stack-lg flex justify-center">
        <ButtonLink href={teaser.cta.href} variant="outline" tone="ink" arrow>
          {teaser.cta.label}
        </ButtonLink>
      </div>
    </Section>
  );
}
