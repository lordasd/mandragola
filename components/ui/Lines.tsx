import { Fragment, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface LinesProps {
  /** Copy with `\n` where a desktop line break should go. */
  text: string;
  /** Rendered inside the last line (e.g. a marker line sized to that line). The last line becomes inline-block. */
  lastLine?: ReactNode;
}

/**
 * Desktop-only line breaks from content: each `\n` segment is a block at lg, plain inline text below
 * (joined by a space), so mobile still wraps naturally and 320px reflow is unaffected.
 */
export function Lines({ text, lastLine }: LinesProps) {
  const lines = text.split("\n");
  if (lines.length === 1 && !lastLine) return text;
  return lines.map((line, i) => {
    const last = i === lines.length - 1;
    return (
      <Fragment key={i}>
        {i > 0 && " "}
        {/* A fitted last line stays inline-block (its own line anyway: the lines before it are blocks at lg). */}
        <span className={cn(last && lastLine ? "inline-block" : lines.length > 1 && "lg:block")}>
          {line}
          {last && lastLine}
        </span>
      </Fragment>
    );
  });
}
