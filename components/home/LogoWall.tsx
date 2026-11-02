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
      <ul className="mt-stack-lg grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-10 lg:gap-y-14">
        {logos.map((logo) => (
          <li key={logo.src} className="flex min-h-16 items-center justify-center">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              sizes="(min-width: 1024px) 180px, 40vw"
              className="h-auto max-h-10 w-auto max-w-full object-contain grayscale"
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
