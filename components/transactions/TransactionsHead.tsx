import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { markerLine } from "@/content/site";

/** Page head on a sunken section card: eyebrow → h1 → marker line → lead paragraphs. */
export function TransactionsHead({
  id,
  eyebrow,
  title,
  lead,
  uppercase = true,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lead: string[];
  /** EN page titles echo the original's caps; pass false for /he. */
  uppercase?: boolean;
}) {
  return (
    <Section tone="sunken" aria-labelledby={id}>
      <Eyebrow>{eyebrow}</Eyebrow>
      {/* tracking-[0.02em]: brief §2 caps tracking for EN page titles; no scale token for it */}
      <Heading as="h1" id={id} className={uppercase ? "mt-4 uppercase tracking-[0.02em] text-ink" : "mt-4 text-ink"}>
        {title}
      </Heading>
      <Image
        src={markerLine.src}
        alt=""
        aria-hidden="true"
        width={markerLine.width}
        height={markerLine.height}
        sizes="(min-width: 1024px) 280px, 200px"
        loading="lazy"
        className="mt-2 h-auto w-50 lg:w-70"
      />
      <div className="mt-6 max-w-lead space-y-4 text-body-xl text-muted">
        {lead.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </Section>
  );
}
