import Image from "next/image";
import type { HomeContent, ImageAsset } from "@/content/types";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "./SectionIntro";

/**
 * "Where capital meets opportunity": ink image card (lazy photo) under an ink overlay.
 * Overlay >= ink/80 behind text keeps gold eyebrow >= 4.5:1 even over a white pixel (computed 4.78:1).
 */
export function AccessBand({ access, image }: { access: HomeContent["access"]; image: ImageAsset }) {
  const id = "access-title";
  return (
    <Section tone="ink" aria-labelledby={id} innerClassName="relative isolate overflow-hidden">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(min-width: 1440px) 1360px, 100vw"
        className="-z-20 object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-ink/80 lg:bg-transparent lg:from-ink/90 lg:via-ink/80 lg:to-ink/40 ltr:lg:bg-linear-to-r rtl:lg:bg-linear-to-l"
      />
      <div className="max-w-180 py-6 lg:py-12">
        <SectionIntro
          id={id}
          eyebrow={access.eyebrow}
          title={access.title}
          lead={access.body}
          size="h3"
          tone="ink"
          uppercase
        />
        <ButtonLink href={access.cta.href} variant="gold" tone="ink" arrow className="mt-8">
          {access.cta.label}
        </ButtonLink>
      </div>
    </Section>
  );
}
