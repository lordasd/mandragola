import type { Stat } from "@/content/types";
import { cn } from "@/lib/cn";

const HEBREW = /[֐-׿]/;

interface StatsRowProps {
  stats: Stat[];
  /** Background the row sits on. */
  tone?: "light" | "ink";
  className?: string;
}

/**
 * Real figures only, as a <dl>. Label is the <dt> (read first by AT: "Financing Transactions, 100+");
 * flex-col-reverse shows the value on top visually.
 */
export function StatsRow({ stats, tone = "light", className }: StatsRowProps) {
  const ink = tone === "ink";
  return (
    <dl className={cn("grid gap-4 md:grid-cols-3 md:gap-7.5", className)}>
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={cn(
            "flex flex-col-reverse items-center gap-2 rounded-card px-6 py-8 text-center lg:px-10 lg:py-10",
            ink ? "bg-ink-soft" : "border border-line bg-surface-raised",
          )}
        >
          <dt className={cn("text-eyebrow uppercase", ink ? "text-gold" : "text-muted")}>{stat.label}</dt>
          <dd className={cn("font-heading text-h3 font-medium", ink ? "text-on-ink" : "text-ink")}>
            {/* Figures like "100+" keep their order inside RTL text (else they render "+100"). */}
            {HEBREW.test(stat.value) ? stat.value : <span dir="ltr">{stat.value}</span>}
          </dd>
        </div>
      ))}
    </dl>
  );
}
