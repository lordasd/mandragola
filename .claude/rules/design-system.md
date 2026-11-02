---
paths:
  - "components/**"
  - "app/**"
---

# Design system rules

Source of truth: `docs/design-brief.md` (tokens, contrast matrix, component specs). Tokens live in `app/globals.css` `@theme`.

## Color
- Use token utilities only (`bg-ink`, `text-muted`, `border-line-strong`…). Never raw hex, rgb or Tailwind palette colors (`blue-500`).
- Gold `--color-gold` (#E2B471) appears **only on ink** surfaces or as a background behind ink text (demo banner, gold button). On light surfaces use `--color-gold-text`.
- `--color-line` is decorative only; control borders (inputs, outline buttons, chips) use `--color-line-strong`.
- Inside dark regions add the `on-ink` context (class from globals) so focus rings switch to `--color-focus-on-ink`.
- New color pair? Compute contrast first and add it to the brief's matrix. Text ≥4.5:1, large text/UI ≥3:1.

## Type
- Headings: `font-serif` (EB Garamond / Frank Ruhl Libre on /he). Body: `font-sans` (Spline Sans / Assistant).
- Sizes only via scale tokens: `text-h1…text-h4`, `text-body-xl|lg|md`, `text-body`, `text-eyebrow`, `text-small`.
- Visual size is decoupled from heading level: use `<Heading as="h2" size="h3">`. Exactly one `h1` per page, no skipped levels.
- Uppercase/letter-spacing only for EN hero/page titles and eyebrows. Hebrew: no uppercase, tracking 0.

## Layout
- Wrap page content in `Container` (max 1360, fluid gutter). Big blocks are `Section` cards (`tone="ink" | "raised" | "sunken"`), radius `--radius-section`, padding `--section-pad-*`, gap `--section-gap` between cards.
- Pattern for every section intro: `Eyebrow` → `Heading` → optional marker line (decorative, `aria-hidden`) → lead.
- Reuse existing components before creating new ones: `components/ui/*` (Container, Section, Eyebrow, Heading, Button/ButtonLink, Card, JsonLd, ContactForm) and `components/layout/*` (Header, Footer). Page-specific pieces go in `components/<page>/`.
- Sections must take content via props (from `content/*.ts`) — no hard-coded copy in components, so `/he` can reuse them.

## Components (see brief §4 for exact specs)
- Buttons: `primary` (ink), `gold` (on ink only), `outline`. Min height 48px, radius `--radius-control`, trailing arrow flips in RTL.
- Cards: raised bg, 1px `line`, radius `--radius-card`, no fixed heights.
- Transaction cards are `<article>`, not links. Stats use `<dl>`. Status/sector chips always carry text (never color-only).

## Imagery
- Only Mandragola's own images from `public/images/**`. No template illustrations, stock photos, video or fake stats.
- Always `next/image` with explicit `sizes`. `priority` only on the single LCP image (hero). Everything else lazy.
- Meaningful images get short descriptive alt; logos get the company name; decorative images `alt=""`.

## Motion
- 150ms color/border transitions only, inside `@media (prefers-reduced-motion: no-preference)`. No carousels, parallax, counters, autoplay.
