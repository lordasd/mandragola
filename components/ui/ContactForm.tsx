"use client";

import { useId, useState, type FormEvent } from "react";
import type { ContactFormCopy } from "@/content/types";
import { cn } from "@/lib/cn";
import { buttonClass } from "./Button";

const field =
  "mt-2 block min-h-12 w-full rounded-control border border-line-strong bg-surface-raised px-4 py-3.5 text-body text-text focus-visible:border-ink";

/**
 * Demo contact form: never sends or stores anything (no action, no fetch).
 * Native validation runs first (required fields); on submit we only announce copy.demoNotice.
 */
export function ContactForm({
  copy,
  tone = "light",
  hint,
  className,
}: {
  copy: ContactFormCopy;
  /** Background the form sits on (labels inherit color; inputs stay white). */
  tone?: "light" | "ink";
  /** Optional static note above the button, e.g. "This is a demo — messages are not sent or stored." */
  hint?: string;
  className?: string;
}) {
  const id = useId();
  const [status, setStatus] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(copy.demoNotice);
  }

  const label = "block font-semibold";
  const muted = tone === "ink" ? "text-on-ink-muted" : "text-muted";

  return (
    <form onSubmit={onSubmit} aria-describedby={`${id}-req`} className={cn("space-y-5", className)}>
      <p id={`${id}-req`} className={muted}>
        {copy.requiredNote}
      </p>
      <div>
        <label htmlFor={`${id}-name`} className={label}>
          {copy.nameLabel} <span aria-hidden="true">*</span>
        </label>
        <input id={`${id}-name`} name="name" type="text" autoComplete="name" required className={field} />
      </div>
      <div>
        <label htmlFor={`${id}-email`} className={label}>
          {copy.emailLabel} <span aria-hidden="true">*</span>
        </label>
        <input id={`${id}-email`} name="email" type="email" autoComplete="email" required className={field} />
      </div>
      <div>
        <label htmlFor={`${id}-message`} className={label}>
          {copy.messageLabel} <span aria-hidden="true">*</span>
        </label>
        <textarea id={`${id}-message`} name="message" rows={6} required className={field} />
      </div>
      {hint && <p className={muted}>{hint}</p>}
      <button type="submit" className={buttonClass(tone === "ink" ? "gold" : "primary", tone, "w-full")}>
        {copy.submitLabel}
      </button>
      <p role="status" aria-live="polite" className="min-h-6 font-semibold">
        {status}
      </p>
    </form>
  );
}
