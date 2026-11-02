// Client-safe (no content imports): used by the language switch on both server and client.
import type { Locale } from "@/content/types";

/** Pages that exist in both languages: English path → Hebrew path. Everything else switches to the other home page. */
const translatedPaths: Record<string, string> = {
  "/": "/he",
  "/accessibility": "/he/accessibility",
};

/**
 * Target of the language switch for the current page: the matching translation if one exists,
 * otherwise the other locale's home. `locale` is the locale of the page being viewed.
 */
export function alternatePath(pathname: string, locale: Locale): string {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  if (locale === "en") return translatedPaths[path] ?? "/he";
  const en = Object.keys(translatedPaths).find((k) => translatedPaths[k] === path);
  return en ?? "/";
}
