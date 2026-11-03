import Image from "next/image";
import { markerLine } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Gold brush underline under key headings (decorative, alt=""). Use only on ink, or on light as a non-text graphic.
 * `fit`: stretch to the parent's width (e.g. the last line of a heading) instead of the fixed 200/280px.
 */
export function MarkerLine({ className, fit = false }: { className?: string; fit?: boolean }) {
  return (
    <Image
      src={markerLine.src}
      alt=""
      width={markerLine.width}
      height={markerLine.height}
      sizes={fit ? "(min-width: 1024px) 600px, 90vw" : "(min-width: 1024px) 280px, 200px"}
      className={cn("mt-2 h-auto", fit ? "block w-full" : "w-50 lg:w-70", className)}
    />
  );
}
