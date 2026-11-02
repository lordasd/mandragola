import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { MarkerLine } from "@/components/ui/MarkerLine";

/** Page head on the plain surface (no card): breadcrumb, eyebrow, h1, decorative marker line, lead. */
export function ExpertiseHead({
  breadcrumb,
  eyebrow,
  title,
  body,
  titleId,
}: {
  breadcrumb?: ReactNode;
  eyebrow?: string;
  title: string;
  body: string;
  titleId: string;
}) {
  return (
    <Container className="pt-8 pb-section-y lg:pt-12">
      {breadcrumb}
      <div className="mt-section-gap max-w-4xl">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <Heading as="h1" id={titleId} className="mt-4.5 text-ink uppercase">
          {title}
        </Heading>
        <MarkerLine />
        <p className="mt-6 text-body-xl text-muted">{body}</p>
      </div>
    </Container>
  );
}
