import Image from "next/image";
import { Fragment } from "react";
import type { Party, Transaction } from "@/content/types";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";

export interface TransactionCardLabels {
  /** "Mandragola's role" */
  role: string;
  /** Screen-reader-only prefix for the status badge, e.g. "Status:". */
  status: string;
  /** Screen-reader-only name of the chips list, e.g. "Sector and deal type". */
  tags: string;
}

/** Card heading + ItemList name: the party names, e.g. "DFSL & Tessera". */
export function partyNames(item: Pick<Transaction, "parties">): string {
  return item.parties.map((p) => p.name).join(" & ");
}

/*
 * Presentational: the card's h2 already names the parties, so logos are alt="" inside an aria-hidden row.
 * Logo box: 40px tall, max 140px wide, object-contain. Wide wordmarks (T3 Defense 275×27, MIA 233×27) are capped by
 * width and render shorter; tall marks (ArrivAir II 163×97) are capped by height. max-w-35 = 140px.
 * Near-square marks (aspect < 2, i.e. ArrivAir II) get a 64px box, where 40px left them tiny.
 */
function PartyMark({ party }: { party: Party }) {
  if (!party.logo) {
    return <span className="min-w-0 font-heading text-h4 text-ink">{party.name}</span>;
  }
  const tall = party.logo.width / party.logo.height < 2;
  return (
    <span className={cn("flex min-w-0 max-w-35 shrink items-center", tall ? "h-16" : "h-10")}>
      <Image
        src={party.logo.src}
        alt=""
        width={party.logo.width}
        height={party.logo.height}
        sizes="140px"
        loading="lazy"
        className="h-full w-auto max-w-full object-contain"
      />
    </span>
  );
}

/** One deal. An <article>, not a link (there are no detail pages). `.reveal`: each card runs on its own view timeline, so a row staggers naturally. */
export function TransactionCard({ item, labels }: { item: Transaction; labels: TransactionCardLabels }) {
  const hasLogo = item.parties.some((p) => p.logo);
  const title = partyNames(item);
  return (
    <Card
      as="article"
      compact
      className="reveal flex h-full flex-col gap-4 md:gap-5 motion-safe:transition-colors motion-safe:duration-150 hover:border-line-strong"
    >
      {/* h2 = party names (page outline: h1 → card h2s → CTA h2). Visually the logo row carries it. */}
      {hasLogo ? (
        <h2 className="sr-only">{title}</h2>
      ) : (
        <h2 className="order-1 font-heading text-h4 text-ink">{title}</h2>
      )}
      {/* 12px chips between 1024 and 1440 (3-col cards are narrowest there) so the longest set, Motomea's three, stays on one row. */}
      <ul aria-label={labels.tags} className="flex flex-wrap gap-1.5">
        {item.sectors.map((sector) => (
          <li key={sector} className="rounded-pill bg-surface-sunken px-2.5 py-1 text-small font-semibold text-text lg:max-[90rem]:text-xs">
            {sector}
          </li>
        ))}
        <li className="rounded-pill border border-line-strong px-2.5 py-1 text-small font-semibold text-gold-text lg:max-[90rem]:text-xs">
          {item.type}
        </li>
      </ul>

      {hasLogo && (
        <div aria-hidden="true" className="order-1 flex min-h-16 flex-wrap items-center gap-x-4 gap-y-2">
          {item.parties.map((party, i) => (
            <Fragment key={party.name}>
              {i > 0 && <span className="font-heading text-h4 leading-none text-muted">&amp;</span>}
              <PartyMark party={party} />
            </Fragment>
          ))}
        </div>
      )}

      {/* Under the logo row (DOM order = visual order, both order-1). */}
      {item.status && (
        <p className="order-1 inline-flex items-center gap-1.5 self-start text-small font-semibold text-gold-text">
          <span aria-hidden="true" className="size-2 rounded-pill bg-gold-text" />
          <span className="sr-only">{labels.status} </span>
          {item.status}
        </p>
      )}

      <p className="order-2 font-sans text-body-md font-medium text-ink">{item.summary}</p>

      <dl className="order-3 mt-auto border-t border-line pt-5">
        <dt className="text-eyebrow uppercase text-gold-text">{labels.role}</dt>
        <dd className="mt-2 text-body text-muted">{item.role}</dd>
      </dl>
    </Card>
  );
}
