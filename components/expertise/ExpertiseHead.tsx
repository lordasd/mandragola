import Image from "next/image";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import type { ImageAsset } from "@/content/types";

/** Page head on the plain surface (no card): breadcrumb, eyebrow, h1, decorative marker line, lead. */
export function ExpertiseHead({
  breadcrumb,
  eyebrow,
  title,
  body,
  marker,
  titleId,
}: {
  breadcrumb?: ReactNode;
  eyebrow?: string;
  title: string;
  body: string;
  marker: ImageAsset;
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
        {/* Decorative gold brush line (brief §4): 200 -> 280px wide, 8px below the heading. */}
        <Image
          src={marker.src}
          alt=""
          aria-hidden="true"
          width={marker.width}
          height={marker.height}
          sizes="280px"
          className="mt-2 h-auto w-50 lg:w-70"
        />
        <p className="mt-6 text-body-xl text-muted">{body}</p>
      </div>
    </Container>
  );
}
