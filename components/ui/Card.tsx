import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type CardProps = HTMLAttributes<HTMLElement> & { as?: "div" | "article" };

/** Rounded raised content card (expertise tiles, transaction cards). */
export function Card({ as: Tag = "div", className, ...props }: CardProps) {
  return <Tag className={cn("rounded-card border border-line bg-surface-raised p-6 text-text md:p-8", className)} {...props} />;
}
