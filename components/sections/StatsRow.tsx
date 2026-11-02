import type { Stat } from "@/content/types";
import { cn } from "@/lib/cn";

const HEBREW = /[֐-׿]/;

interface StatsRowProps {
  stats: Stat[];
  className?: string;
}

/**
 * Real figures only, as a <dl>. Label is the <dt> (read first by AT: "Financing Transactions, 100+");
 * flex-col-reverse shows the value on top visually.
 */
export function StatsRow({ stats, className }: StatsRowProps) {
  return (
    <dl className={cn("grid gap-4 md:grid-cols-3 md:gap-7.5", className)}>
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col-reverse items-center gap-2 rounded-card border border-line bg-surface-raised px-6 py-8 text-center lg:px-10 lg:py-10"
        >
          <dt className="text-eyebrow uppercase text-muted">{stat.label}</dt>
          <dd className="font-heading text-h3 font-medium text-ink">
            {/* Figures like "100+" keep their order inside RTL text (else they render "+100"). */}
            {HEBREW.test(stat.value) ? stat.value : <span dir="ltr">{stat.value}</span>}
          </dd>
        </div>
      ))}
    </dl>
  );
}
