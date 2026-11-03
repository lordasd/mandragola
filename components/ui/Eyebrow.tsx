import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type EyebrowProps = ComponentPropsWithoutRef<"p"> & { tone?: "light" | "ink"; size?: "md" | "lg" };

/** Uppercase label above a heading (14px/700, 0.08em; "lg" = h4 size for the hero brand line). A <p>, not a heading. */
export function Eyebrow({ tone = "light", size = "md", className, ...props }: EyebrowProps) {
  return (
    <p
      className={cn(
        "font-sans uppercase",
        size === "lg" ? "text-h4 font-bold tracking-widest" : "text-eyebrow",
        tone === "ink" ? "text-gold" : "text-gold-text",
        className,
      )}
      {...props}
    />
  );
}
