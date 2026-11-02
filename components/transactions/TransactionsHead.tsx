import { MarkerLine } from "@/components/ui/MarkerLine";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";

/** Page head on a sunken section card: eyebrow → h1 → marker line → lead paragraphs. Above the fold, so no reveal. */
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
    <Section tone="sunken" aria-labelledby={id} reveal={false}>
      <Eyebrow>{eyebrow}</Eyebrow>
      {/* tracking-[0.02em]: brief §2 caps tracking for EN page titles; no scale token for it */}
      <Heading as="h1" id={id} className={uppercase ? "mt-4 uppercase tracking-[0.02em] text-ink" : "mt-4 text-ink"}>
        {title}
      </Heading>
      <MarkerLine className="mt-2" />
      <div className="mt-6 max-w-lead space-y-4 text-body-xl text-muted">
        {lead.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </Section>
  );
}
