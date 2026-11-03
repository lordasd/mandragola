import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

export type Tone = "light" | "raised" | "sunken" | "ink";

const toneClass: Record<Tone, string> = {
  light: "bg-surface text-text",
  raised: "bg-surface-raised text-text",
  sunken: "bg-surface-sunken text-text",
  ink: "on-ink bg-ink text-on-ink",
};

type SectionProps = Omit<ComponentPropsWithoutRef<"section">, "children"> & {
  children: ReactNode;
  /** "card": rounded section card inside the container (template look). "plain": full-bleed band. */
  variant?: "card" | "plain";
  tone?: Tone;
  /** Extra classes for the inner (card / container) element. */
  innerClassName?: string;
  /**
   * Scroll reveal on the inner element (`.reveal`, CSS-only, motion-safe + view() support only). Default true.
   * Pass false for anything in the first viewport at load: the hero (LCP h1) and page heads.
   */
  reveal?: boolean;
  /** "card" only. "full": the card spans the viewport edge to edge (no side radius); children stay in a Container. */
  width?: "container" | "full";
};

/**
 * Page section. Pass aria-labelledby={headingId} so the region is named.
 * tone="ink" adds the .on-ink context, which switches the focus ring to gold.
 */
export function Section({
  variant = "card",
  tone = "raised",
  className,
  innerClassName,
  reveal = true,
  width = "container",
  children,
  ...props
}: SectionProps) {
  if (variant === "card" && width === "full") {
    return (
      <section className={cn("py-section-gap-half", className)} {...props}>
        <div className={cn("py-section-y", toneClass[tone], reveal && "reveal", innerClassName)}>
          <Container>{children}</Container>
        </div>
      </section>
    );
  }

  if (variant === "card") {
    return (
      <section className={cn("py-section-gap-half", className)} {...props}>
        <Container>
          <div
            className={cn(
              "rounded-section px-section-x py-section-y",
              toneClass[tone],
              reveal && "reveal",
              innerClassName,
            )}
          >
            {children}
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className={cn("py-section-y", toneClass[tone], className)} {...props}>
      <Container className={cn(reveal && "reveal", innerClassName)}>{children}</Container>
    </section>
  );
}
