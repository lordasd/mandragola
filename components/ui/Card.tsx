import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type CardProps = HTMLAttributes<HTMLElement> & {
  as?: "div" | "article";
  /** Tighter padding for text-heavy cards: 12px sides / 16px top-bottom on mobile, 24px from md (default 24 / 32). */
  compact?: boolean;
};

/** Rounded raised content card (expertise tiles, transaction cards). */
export function Card({ as: Tag = "div", compact = false, className, ...props }: CardProps) {
  return (
    <Tag
      className={cn("rounded-card border border-line bg-surface-raised text-text", compact ? "px-3 py-4 md:p-6 lg:px-5" : "p-6 md:p-8", className)}
      {...props}
    />
  );
}
