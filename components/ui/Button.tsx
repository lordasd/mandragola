import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ArrowIcon } from "./icons";

/*
 * primary: ink bg / white text (on light)      gold: gold bg / ink text (on ink sections, 9.09:1)
 * outline: 1px line-strong + ink text (light)  outline + tone="ink": 1px white/60 + white text
 * min-h-12 = 48px target (WCAG 2.5.8 needs 24).
 */
export type ButtonVariant = "primary" | "gold" | "outline";
export type ButtonTone = "light" | "ink";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-control px-7 py-3 text-body font-semibold leading-tight no-underline motion-safe:transition-colors motion-safe:duration-150 motion-safe:ease-out disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<ButtonVariant, Record<ButtonTone, string>> = {
  primary: {
    light: "bg-ink text-on-ink hover:bg-ink-soft",
    ink: "bg-surface-raised text-ink hover:bg-surface-sunken",
  },
  gold: {
    light: "bg-gold text-ink hover:bg-gold-hover",
    ink: "bg-gold text-ink hover:bg-gold-hover",
  },
  outline: {
    light: "border border-line-strong text-ink hover:border-ink hover:bg-surface-sunken",
    ink: "border border-on-ink/60 text-on-ink hover:border-on-ink hover:bg-ink-soft",
  },
};

export function buttonClass(variant: ButtonVariant = "primary", tone: ButtonTone = "light", className?: string) {
  return cn(base, variants[variant][tone], className);
}

type StyleProps = {
  variant?: ButtonVariant;
  /** Background the button sits on. */
  tone?: ButtonTone;
  /** Trailing arrow (mirrors in RTL). */
  arrow?: boolean;
  children?: ReactNode;
};

function Content({ children, arrow }: { children?: ReactNode; arrow?: boolean }) {
  return (
    <>
      {children}
      {arrow && <ArrowIcon size={16} />}
    </>
  );
}

export function Button({
  variant,
  tone,
  arrow,
  className,
  children,
  type = "button",
  ...props
}: ComponentPropsWithoutRef<"button"> & StyleProps) {
  return (
    <button type={type} className={buttonClass(variant, tone, className)} {...props}>
      <Content arrow={arrow}>{children}</Content>
    </button>
  );
}

type ButtonLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> & StyleProps & { href: string };

/** Internal hrefs use next/link; mailto:, tel:, http(s) and #hash use a plain <a>. */
export function ButtonLink({ variant, tone, arrow, className, href, children, ...props }: ButtonLinkProps) {
  const cls = buttonClass(variant, tone, className);
  const content = <Content arrow={arrow}>{children}</Content>;
  if (/^(https?:|mailto:|tel:|#)/.test(href)) {
    return (
      <a href={href} className={cls} {...props}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...props}>
      {content}
    </Link>
  );
}
