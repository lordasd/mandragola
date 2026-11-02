import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type Level = "h1" | "h2" | "h3" | "h4";

const sizeClass: Record<Level, string> = {
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
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
