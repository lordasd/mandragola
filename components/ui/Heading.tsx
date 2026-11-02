import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type Level = "h1" | "h2" | "h3" | "h4";

// Display sizes: long single words (uppercase EN titles) must wrap at 320px / 400% zoom (WCAG 1.4.10).
const sizeClass: Record<Level, string> = {
  h1: "text-h1 hyphens-auto wrap-break-word",
  h2: "text-h2 hyphens-auto wrap-break-word",
  h3: "text-h3 hyphens-auto wrap-break-word",
  h4: "text-h4",
};

type HeadingProps = ComponentPropsWithoutRef<"h2"> & {
  /** Semantic level (document outline). */
  as?: Level;
  /** Visual size; defaults to the semantic level. */
  size?: Level;
};

/** Serif heading; visual size is decoupled from semantic level. Color inherits from the section tone. */
export function Heading({ as = "h2", size, className, ...props }: HeadingProps) {
  const Tag = as;
  return <Tag className={cn("font-heading font-medium", sizeClass[size ?? as], className)} {...props} />;
}
