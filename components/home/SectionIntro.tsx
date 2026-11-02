import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { cn } from "@/lib/cn";
import { MarkerLine } from "@/components/ui/MarkerLine";

type Level = "h1" | "h2" | "h3" | "h4";

interface SectionIntroProps {
  id: string;
  title: string;
  eyebrow?: string;
  lead?: string;
  as?: Level;
  size?: Level;
  tone?: "light" | "ink";
  align?: "start" | "center";
  marker?: boolean;
  /** EN display caps (neutralised for Hebrew by globals.css). */
  uppercase?: boolean;
  className?: string;
}

/** Eyebrow -> heading -> optional marker line -> lead (brief §4 "SectionHeading"). */
export function SectionIntro({
  id,
  title,
  eyebrow,
  lead,
  as = "h2",
  size,
  tone = "light",
  align = "start",
  marker = false,
  uppercase = false,
  className,
}: SectionIntroProps) {
  const center = align === "center";
  return (
    <div className={cn(center && "mx-auto flex flex-col items-center text-center", className)}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <Heading
        as={as}
        size={size}
        id={id}
        className={cn(eyebrow && "mt-4.5", tone === "light" && "text-ink", uppercase && "uppercase tracking-wide")}
      >
        {title}
      </Heading>
      {marker && <MarkerLine />}
      {lead && (
        <p
          className={cn(
            "mt-5 max-w-lead text-body-xl",
            tone === "ink" ? "text-on-ink-muted" : "text-muted",
          )}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
