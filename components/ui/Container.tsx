import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = HTMLAttributes<HTMLElement> & {
  as?: "div" | "section" | "header" | "footer" | "nav" | "article";
};

/** 1360px content column with fluid 16 -> 40px gutters (--spacing-gutter). */
export function Container({ as: Tag = "div", className, ...props }: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-[calc(var(--container-container)+2*var(--spacing-gutter))] px-gutter",
        className,
      )}
      {...props}
    />
  );
}
