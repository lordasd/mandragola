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
  children,
  ...props
}: SectionProps) {
  if (variant === "card") {
    return (
      <section className={cn("py-section-gap-half", className)} {...props}>
        <Container>
          <div
            className={cn("rounded-section px-section-x py-section-y", toneClass[tone], innerClassName)}
          >
            {children}
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className={cn("py-section-y", toneClass[tone], className)} {...props}>
      <Container className={innerClassName}>{children}</Container>
    </section>
  );
}
