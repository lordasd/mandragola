import Image from "next/image";
import { markerLine } from "@/content/site";
import { cn } from "@/lib/cn";

/** Gold brush underline under key headings (decorative, alt=""). Use only on ink, or on light as a non-text graphic. */
export function MarkerLine({ className }: { className?: string }) {
  return (
    <Image
      src={markerLine.src}
      alt=""
      width={markerLine.width}
      height={markerLine.height}
      sizes="(min-width: 1024px) 280px, 200px"
      className={cn("mt-2 h-auto w-50 lg:w-70", className)}
    />
  );
}
