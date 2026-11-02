import Image from "next/image";
import { Fragment } from "react";
import type { Party, Transaction } from "@/content/types";
import { Card } from "@/components/ui/Card";

export interface TransactionCardLabels {
  /** "Mandragola's role" */
  role: string;
  /** Screen-reader-only joiner between two party logos, e.g. "and". */
  and: string;
  /** Screen-reader-only prefix for the status badge, e.g. "Status:". */
  status: string;
  /** Screen-reader-only name of the chips list, e.g. "Sector and deal type". */
  tags: string;
}

/*
 * Logo box: 40px tall, max 140px wide, object-contain. Wide wordmarks (T3 Defense 275×27, MIA 233×27) are capped by
 * width and render shorter; tall marks (ArrivAir II 163×97) are capped by height. max-w-35 = 140px.
 */
function PartyMark({ party }: { party: Party }) {
  if (!party.logo) {
    return <p className="min-w-0 font-heading text-h4 text-ink">{party.name}</p>;
  }
  return (
    <span className="flex h-10 min-w-0 max-w-35 shrink items-center">
      <Image
        src={party.logo.src}
        alt={party.logo.alt || party.name}
        width={party.logo.width}
        height={party.logo.height}
        sizes="140px"
        loading="lazy"
        className="h-full w-auto max-w-full object-contain"
      />
    </span>
  );
}

/** One deal. An <article>, not a link (there are no detail pages). */
export function TransactionCard({ item, labels }: { item: Transaction; labels: TransactionCardLabels }) {
  return (
    <Card
      as="article"
      className="flex h-full flex-col gap-5 motion-safe:transition-colors motion-safe:duration-150 hover:border-line-strong"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <ul aria-label={labels.tags} className="flex flex-wrap gap-2">
          {item.sectors.map((sector) => (
            <li key={sector} className="rounded-pill bg-surface-sunken px-3 py-1 text-small font-semibold text-text">
              {sector}
            </li>
          ))}
          <li className="rounded-pill border border-line-strong px-3 py-1 text-small font-semibold text-gold-text">
            {item.type}
          </li>
        </ul>
        {item.status && (
          <p className="inline-flex items-center gap-1.5 rounded-pill bg-surface-sunken px-3 py-1 text-small font-semibold text-ink">
            <span aria-hidden="true" className="size-2 rounded-pill bg-gold-text" />
            <span className="sr-only">{labels.status} </span>
            {item.status}
          </p>
        )}
      </div>

      <div className="flex min-h-16 flex-wrap items-center gap-x-4 gap-y-2">
        {item.parties.map((party, i) => (
          <Fragment key={party.name}>
            {i > 0 && (
              <>
                <span aria-hidden="true" className="font-heading text-h4 leading-none text-muted">
                  &amp;
                </span>
                <span className="sr-only">{labels.and}</span>
              </>
            )}
            <PartyMark party={party} />
          </Fragment>
        ))}
      </div>

      {/* h2: cards are the page's second outline level; styled as body-md per brief §4. */}
      <h2 className="font-sans text-body-md font-medium text-ink">{item.summary}</h2>

      <dl className="mt-auto border-t border-line pt-5">
        <dt className="text-eyebrow uppercase text-gold-text">{labels.role}</dt>
        <dd className="mt-2 text-body text-muted">{item.role}</dd>
      </dl>
    </Card>
  );
}
