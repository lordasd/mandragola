import Image from "next/image";
import type { HomeContent, ImageAsset } from "@/content/types";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "./SectionIntro";

/** Transactions teaser: sunken card, heading + lead + button, then a grayscale logo list (alt = company name). */
export function LogoWall({ teaser, logos }: { teaser: HomeContent["transactionsTeaser"]; logos: ImageAsset[] }) {
  const id = "transactions-title";
  return (
    <Section tone="sunken" aria-labelledby={id}>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionIntro id={id} title={teaser.title} lead={teaser.body} size="h3" uppercase />
        <ButtonLink href={teaser.cta.href} variant="outline" arrow className="self-start md:self-auto">
          {teaser.cta.label}
        </ButtonLink>
      </div>
      {/* Flex-wrap + centered rows: an incomplete last row sits in the middle, not at the start. */}
      <ul className="mt-stack-lg flex flex-wrap justify-center gap-x-8 gap-y-8 lg:gap-x-10">
        {logos.map((logo) => (
          <li key={logo.src} className="flex h-12 w-32 items-center justify-center sm:w-36">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              sizes="144px"
              className="h-auto max-h-8 w-auto max-w-full object-contain grayscale"
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
