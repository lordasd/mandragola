import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type CardProps = HTMLAttributes<HTMLElement> & {
  as?: "div" | "article" | "li";
  tone?: "raised" | "sunken" | "ink";
};

const toneClass = {
  raised: "bg-surface-raised text-text border border-line",
  sunken: "bg-surface-sunken text-text",
  ink: "on-ink bg-ink-soft text-on-ink",
} as const;

/** Rounded content card (feature tiles, transaction cards, stat tiles). */
export function Card({ as: Tag = "div", tone = "raised", className, ...props }: CardProps) {
  return (
    <Tag
      className={cn("rounded-card p-6 md:p-8", toneClass[tone], className)}
      {...props}
    />
  );
}
