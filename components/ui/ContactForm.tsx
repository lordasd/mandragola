"use client";

import { useId, useState, type FormEvent, type HTMLInputAutoCompleteAttribute } from "react";
import type { ContactFormCopy } from "@/content/types";
import { cn } from "@/lib/cn";
import { buttonClass } from "./Button";

const field =
  "mt-2 block min-h-12 w-full rounded-control border border-line-strong bg-surface-raised px-4 py-3.5 text-body text-text focus-visible:border-ink aria-invalid:border-danger";

/** Fields that are validated (all required). Sector and Company are optional and never show errors. */
const REQUIRED = ["name", "phone", "email"] as const;
type RequiredName = (typeof REQUIRED)[number];
type FieldName = RequiredName | "sector" | "company";
type Errors = Partial<Record<RequiredName, string>>;

const isRequired = (name: string): name is RequiredName => (REQUIRED as readonly string[]).includes(name);

/** Loose check: 7–15 digits, allowing spaces, dashes, dots, parentheses and a leading +. */
const PHONE = /^\+?[\d\s().-]+$/;
function phoneOk(value: string) {
  const digits = value.replace(/\D/g, "").length;
  return PHONE.test(value) && digits >= 7 && digits <= 15;
}

/**
 * Demo contact form: never sends or stores anything (no action, no fetch).
 * Custom validation (noValidate): errors are shown as text under each field, linked with aria-describedby,
 * and focus moves to the first invalid field. A valid submit only announces copy.demoNotice.
 * Required fields: visible "*" (aria-hidden) + sr-only "(required)" + `required`; optional ones say "(optional)".
 */
export function ContactForm({ copy, className }: { copy: ContactFormCopy; className?: string }) {
  const id = useId();
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  function check(el: HTMLInputElement): string | undefined {
    const name = el.name as RequiredName;
    const value = el.value.trim();
    if (!value) return copy.errors[`${name}Required`];
    if (name === "email" && el.validity.typeMismatch) return copy.errors.emailInvalid;
    if (name === "phone" && !phoneOk(value)) return copy.errors.phoneInvalid;
    return undefined;
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const next: Errors = {};
    let first: HTMLInputElement | undefined;
    for (const name of REQUIRED) {
      const el = form.elements.namedItem(name) as HTMLInputElement;
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
    const el = e.target as HTMLInputElement;
    if (!isRequired(el.name) || !errors[el.name]) return;
    const name = el.name;
    setErrors((prev) => ({ ...prev, [name]: check(el) }));
  }

  const labels: Record<FieldName, string> = {
    name: copy.nameLabel,
    phone: copy.phoneLabel,
    email: copy.emailLabel,
    sector: copy.sectorLabel,
    company: copy.companyLabel,
  };

  function input(name: FieldName, type: "text" | "tel" | "email", autoComplete: HTMLInputAutoCompleteAttribute) {
    const required = isRequired(name);
    const error = required ? errors[name] : undefined;
    const errorId = `${id}-${name}-error`;
    // Phone and email are Latin/digits: keep them LTR on /he, aligned to the field's start side.
    const ltr = type !== "text";
    return (
      <div>
        <label htmlFor={`${id}-${name}`} className="block font-semibold">
          {labels[name]}{" "}
          {required ? (
            <>
              <span aria-hidden="true">*</span>
              <span className="sr-only">{copy.requiredLabel}</span>
            </>
          ) : (
            <span className="font-normal text-muted">{copy.optionalLabel}</span>
          )}
        </label>
        <input
          id={`${id}-${name}`}
          name={name}
          type={type}
          autoComplete={autoComplete}
          required={required}
          dir={ltr ? "ltr" : undefined}
          className={cn(field, ltr && "rtl:text-end")}
          {...(error ? { "aria-invalid": true, "aria-describedby": errorId } : {})}
        />
        {error && (
          <p id={errorId} className="mt-2 text-small font-semibold text-danger">
            {error}
          </p>
        )}
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} onInput={recheck} onBlur={recheck} className={cn("space-y-5", className)}>
      {input("name", "text", "name")}
      <div className="grid gap-5 sm:grid-cols-2">
        {input("phone", "tel", "tel")}
        {input("email", "email", "email")}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {input("sector", "text", "off")}
        {input("company", "text", "organization")}
      </div>
      <button type="submit" className={buttonClass("primary", "light", "w-full")}>
        {copy.submitLabel}
      </button>
      <p role="status" aria-live="polite" className="min-h-6 font-semibold">
        {status}
      </p>
    </form>
  );
}
