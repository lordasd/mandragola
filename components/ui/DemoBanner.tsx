/**
 * Required on every page. Fixed to the top; body reserves --banner-h (globals.css),
 * html scroll-padding-top accounts for it (WCAG 2.4.11).
 */
export function DemoBanner({ text, label }: { text: string; label: string }) {
  // <aside> = complementary landmark, so axe "region" passes and screen readers can jump to it.
  return (
    <aside
      aria-label={label}
      className="fixed inset-x-0 top-0 z-60 flex min-h-[var(--banner-h)] items-center justify-center bg-gold px-4 py-2 text-center text-small font-semibold text-ink"
    >
      <p>{text}</p>
    </aside>
  );
}
