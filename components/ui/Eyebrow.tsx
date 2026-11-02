import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type EyebrowProps = ComponentPropsWithoutRef<"p"> & { tone?: "light" | "ink" };

/** Uppercase label above a heading (14px/700, 0.08em). A <p>, not a heading. */
export function Eyebrow({ tone = "light", className, ...props }: EyebrowProps) {
  return (
    <p
      className={cn("font-sans text-eyebrow uppercase", tone === "ink" ? "text-gold" : "text-gold-text", className)}
      {...props}
    />
  );
}
