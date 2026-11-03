import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { featureIcons } from "@/components/ui/icons";
import type { ExpertiseContent } from "@/content/types";
import { cn } from "@/lib/cn";

type Area = ExpertiseContent["areas"][number];
type IconComponent = (typeof featureIcons)[keyof typeof featureIcons];

/**
 * Title split after " & " (all area titles are "X & Y"): line 1 + icon, vertically centered, then line 2.
 * Below lg the icon sits at the text column's end edge (justify-between), where the paragraph's longest lines
 * end; from lg it goes back above the title at the start (flex-col-reverse), like the original. Svg icons are aria-hidden; the space between the
 * two spans keeps the heading's accessible name "X & Y". No "&" -> single line + icon.
 */
function TitleWithIcon({ title, Icon }: { title: string; Icon: IconComponent }) {
  const cut = title.indexOf(" & ");
  const first = cut === -1 ? title : title.slice(0, cut + 2);
  const rest = cut === -1 ? "" : title.slice(cut + 3);
  return (
    <>
      <span className="flex items-center justify-between gap-3 lg:flex-col-reverse lg:items-start lg:gap-5">
        <span className="min-w-0">{first}</span>
        <Icon size={40} className="size-6 shrink-0 text-gold-text lg:size-10" />
      </span>
      {rest && (
        <>
          {" "}
          <span className="block">{rest}</span>
        </>
      )}
    </>
  );
}

/**
 * One alternating image/text row (brief §4). Image first on mobile; even rows put the image at the end ≥1024.
 * Image column 5/12, text 7/12 (arbitrary fr tracks: no token for asymmetric columns). Scroll reveal per row.
 */
function ExpertiseRow({ area, reverse }: { area: Area; reverse: boolean }) {
  const titleId = `${area.id}-title`;
  const Icon = area.icon ? featureIcons[area.icon] : null;
  return (
    <section
      id={area.id}
      aria-labelledby={titleId}
      className={cn(
        "reveal grid items-center gap-8 lg:gap-15",
        reverse ? "lg:grid-cols-[7fr_5fr]" : "lg:grid-cols-[5fr_7fr]",
      )}
    >
      {area.image && (
        <div className={cn(reverse && "lg:order-last")}>
          <Image
            src={area.image.src}
            alt={area.image.alt}
            width={area.image.width}
            height={area.image.height}
            loading="lazy"
            sizes="(min-width: 1440px) 540px, (min-width: 1024px) 38vw, 100vw"
            className="aspect-4/3 w-full rounded-card object-cover"
          />
        </div>
      )}
      <div className="max-w-prose">
        <Heading as="h2" size="h3" id={titleId} className="text-ink">
          {Icon ? <TitleWithIcon title={area.title} Icon={Icon} /> : area.title}
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
