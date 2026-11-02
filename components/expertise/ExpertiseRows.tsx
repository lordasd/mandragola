import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { featureIcons } from "@/components/ui/icons";
import type { ExpertiseContent } from "@/content/types";
import { cn } from "@/lib/cn";

type Area = ExpertiseContent["areas"][number];

/** One alternating image/text row (brief §4). Image first on mobile; even rows put the image at the end ≥1024. */
function ExpertiseRow({ area, reverse }: { area: Area; reverse: boolean }) {
  const titleId = `${area.id}-title`;
  const Icon = area.icon ? featureIcons[area.icon] : null;
  return (
    <section id={area.id} aria-labelledby={titleId} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-15">
      {area.image && (
        <div className={cn(reverse && "lg:order-last")}>
          <Image
            src={area.image.src}
            alt={area.image.alt}
            width={area.image.width}
            height={area.image.height}
            loading="lazy"
            sizes="(min-width: 1440px) 650px, (min-width: 1024px) 45vw, 100vw"
            // 606/555 = desktop frame ratio from the Figma template (brief §4); no token for it.
            className="aspect-4/3 w-full rounded-card object-cover lg:aspect-[606/555]"
          />
        </div>
      )}
      <div className="max-w-prose">
        {Icon && <Icon size={40} className="text-gold-text" />}
        <Heading as="h2" size="h3" id={titleId} className={cn("text-ink", Icon && "mt-5")}>
          {area.title}
        </Heading>
        <p className="mt-4 text-body-lg text-muted">{area.body}</p>
      </div>
    </section>
  );
}

export function ExpertiseRows({ areas }: { areas: ExpertiseContent["areas"] }) {
  return (
    <Container className="flex flex-col gap-stack-lg pb-section-y">
      {areas.map((area, i) => (
        <ExpertiseRow key={area.id} area={area} reverse={i % 2 === 1} />
      ))}
    </Container>
  );
}
