/** First focusable element; visually hidden until focused, then an ink pill below the banner. */
export function SkipLink({ label }: { label: string }) {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-[calc(var(--banner-h)+0.5rem)] focus:z-70 focus:rounded-pill focus:bg-ink focus:px-5 focus:py-3 focus:font-semibold focus:text-on-ink focus:outline-gold"
    >
      {label}
    </a>
  );
}
