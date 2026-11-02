"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Link as NavItem } from "@/content/types";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { NavLink } from "./NavLink";

interface MobileNavProps {
  items: NavItem[];
  cta: NavItem;
  navLabel: string;
  openLabel: string;
  closeLabel: string;
  language: { label: string; href: string; hrefLang: string; lang: string };
}

const rowClass =
  "flex min-h-14 items-center border-b border-line-on-ink font-heading text-xl text-on-ink hover:text-gold aria-[current=page]:text-gold";

/** Disclosure menu below lg. Esc closes and returns focus to the toggle; link click closes. No focus trap. */
export function MobileNav({ items, cta, navLabel, openLabel, closeLabel, language }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? closeLabel : openLabel}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex size-11 items-center justify-center rounded-control text-on-ink hover:bg-ink-soft"
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>
      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full mt-2 max-h-[calc(100dvh-var(--banner-h)-var(--header-h)-1rem)] overflow-y-auto rounded-nav bg-ink-soft px-5 py-3 shadow-xl"
      >
        <nav aria-label={navLabel}>
          <ul>
            {items.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href} onClick={close} className={rowClass}>
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink href={cta.href} onClick={close} className={rowClass}>
                {cta.label}
              </NavLink>
            </li>
            <li>
              <a href={language.href} hrefLang={language.hrefLang} lang={language.lang} className={`${rowClass} border-b-0`}>
                {language.label}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
