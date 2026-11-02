import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";

/** Long-form text page (accessibility statement): page head + readable column. */
export function LegalPage({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: ReactNode;
  children: ReactNode;
}) {
  return (
    <Container className="py-section-y">
      <article className="max-w-prose">
        <Eyebrow>{eyebrow}</Eyebrow>
        <Heading as="h1" size="h2" className="mt-4 text-ink">
          {title}
        </Heading>
        <div className="mt-5 text-body-lg text-muted">{intro}</div>
        <div className="mt-stack-lg space-y-10">{children}</div>
      </article>
    </Container>
  );
}

/** One titled block inside LegalPage; lists and links inside get consistent styling. */
export function LegalSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id}>
      <Heading as="h2" size="h4" id={id} className="text-ink">
        {title}
      </Heading>
      <div className="mt-3 space-y-3 [&_a]:text-gold-text [&_a]:underline [&_a:hover]:text-ink [&_li]:ms-5 [&_ul]:list-disc [&_ul]:space-y-2">
        {children}
      </div>
    </section>
  );
}
