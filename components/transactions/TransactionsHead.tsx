import { MarkerLine } from "@/components/ui/MarkerLine";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/cn";

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
      {/* tracking-[0.02em]: brief §2 caps tracking for EN page titles; no scale token for it.
          Mobile size: "TRANSACTIONS" is ~8.1em wide in caps, so text-h1's 40px min split it mid-word under 414px.
          28.8px at 320 -> 40px cap keeps every word whole down to 320 (no h1 token fits this range). */}
      <Heading
        as="h1"
        id={id}
        className={cn(
          "mt-4 text-ink max-md:text-[clamp(1.75rem,0.5rem+6.5vw,2.5rem)]",
          uppercase && "uppercase tracking-[0.02em]",
        )}
      >
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
