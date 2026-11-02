"use client";

import { usePathname } from "next/navigation";
import type { ComponentPropsWithoutRef } from "react";
import type { Locale } from "@/content/types";
import { alternatePath } from "@/lib/locale-paths";

type LanguageLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> & {
  /** Locale of the page being viewed. */
  locale: Locale;
  language: { label: string; hrefLang: string; lang: string };
};

/** Language switch: goes to this page's translation when one exists, otherwise the other locale's home. */
export function LanguageLink({ locale, language, ...props }: LanguageLinkProps) {
  const pathname = usePathname();
  return (
    <a href={alternatePath(pathname, locale)} hrefLang={language.hrefLang} lang={language.lang} {...props}>
      {language.label}
    </a>
  );
}
