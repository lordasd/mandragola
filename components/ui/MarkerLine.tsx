import Image from "next/image";
import { markerLine } from "@/content/site";
import { cn } from "@/lib/cn";

/** Gold brush underline under key headings (decorative). Use only on ink, or on light as a non-text graphic. */
export function MarkerLine({ className }: { className?: string }) {
  return (
    <Image
      src={markerLine.src}
      alt=""
      aria-hidden="true"
      width={markerLine.width}
      height={markerLine.height}
      className={cn("mt-2 h-auto w-50 lg:w-70", className)}
    />
  );
}
