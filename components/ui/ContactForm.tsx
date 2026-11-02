"use client";

import { useId, useState, type FormEvent } from "react";
import type { ContactFormCopy } from "@/content/types";
import { cn } from "@/lib/cn";
import { buttonClass } from "./Button";

const field =
  "mt-2 block min-h-12 w-full rounded-control border border-line-strong bg-surface-raised px-4 py-3.5 text-body text-text focus-visible:border-ink aria-invalid:border-danger";

const FIELDS = ["name", "email", "message"] as const;
type FieldName = (typeof FIELDS)[number];
type Errors = Partial<Record<FieldName, string>>;
type Control = HTMLInputElement | HTMLTextAreaElement;

/**
 * Demo contact form: never sends or stores anything (no action, no fetch).
 * Custom validation (noValidate): errors are shown as text under each field, linked with aria-describedby,
 * and focus moves to the first invalid field. A valid submit only announces copy.demoNotice.
 */
export function ContactForm({
  copy,
  hint,
  className,
}: {
  copy: ContactFormCopy;
  /** Optional static note above the button, e.g. "This is a demo — messages are not sent or stored." */
  hint?: string;
  className?: string;
}) {
  const id = useId();
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  function check(el: Control): string | undefined {
    const name = el.name as FieldName;
    if (el.validity.valueMissing || !el.value.trim()) return copy.errors[`${name}Required`];
    if (el.validity.typeMismatch) return copy.errors.emailInvalid;
    return undefined;
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const next: Errors = {};
    let first: Control | undefined;
    for (const name of FIELDS) {
      const el = form.elements.namedItem(name) as Control;
      const error = check(el);
      if (error) {
        next[name] = error;
        first ??= el;
      }
    }
    setErrors(next);
    setStatus(first ? "" : copy.demoNotice);
    first?.focus();
  }

  /** Re-check a field that already shows an error as the user edits or leaves it (never before the first submit). */
  function recheck(e: { target: EventTarget }) {
    const el = e.target as Control;
    const name = el.name as FieldName;
    if (!errors[name]) return;
    setErrors((prev) => ({ ...prev, [name]: check(el) }));
  }

  const label = "block font-semibold";

  function errorProps(name: FieldName) {
    return errors[name] ? { "aria-invalid": true, "aria-describedby": `${id}-${name}-error` } : {};
  }

  function errorText(name: FieldName) {
    return (
      errors[name] && (
        <p id={`${id}-${name}-error`} className="mt-2 text-small font-semibold text-danger">
          {errors[name]}
        </p>
      )
    );
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      onInput={recheck}
      onBlur={recheck}
      aria-describedby={`${id}-req`}
      className={cn("space-y-5", className)}
    >
      <p id={`${id}-req`} className="text-muted">
        {copy.requiredNote}
      </p>
      <div>
        <label htmlFor={`${id}-name`} className={label}>
          {copy.nameLabel} <span aria-hidden="true">*</span>
        </label>
        <input
          id={`${id}-name`}
          name="name"
          type="text"
          autoComplete="name"
          required
          className={field}
          {...errorProps("name")}
        />
        {errorText("name")}
      </div>
      <div>
        <label htmlFor={`${id}-email`} className={label}>
          {copy.emailLabel} <span aria-hidden="true">*</span>
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          required
          className={field}
          {...errorProps("email")}
        />
        {errorText("email")}
      </div>
      <div>
        <label htmlFor={`${id}-message`} className={label}>
          {copy.messageLabel} <span aria-hidden="true">*</span>
        </label>
        <textarea id={`${id}-message`} name="message" rows={6} required className={field} {...errorProps("message")} />
        {errorText("message")}
      </div>
      {hint && <p className="text-muted">{hint}</p>}
      <button type="submit" className={buttonClass("primary", "light", "w-full")}>
        {copy.submitLabel}
      </button>
      <p role="status" aria-live="polite" className="min-h-6 font-semibold">
        {status}
      </p>
    </form>
  );
}
