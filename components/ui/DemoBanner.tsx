/**
 * Required on every page. Rendered inside the sticky top bar (SiteShell) above the header, in normal
 * flow, so its height always fits its text — wrapping or WCAG 1.4.12 text-spacing never makes it overlap.
 */
export function DemoBanner({ text, label }: { text: string; label: string }) {
  // <aside> = complementary landmark, so axe "region" passes and screen readers can jump to it.
  return (
    <aside
      aria-label={label}
      className="flex items-center justify-center bg-gold px-4 py-2 text-center text-small font-semibold text-ink"
    >
      <p>{text}</p>
    </aside>
  );
}
