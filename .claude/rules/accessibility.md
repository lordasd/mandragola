---
paths:
  - "**/*.tsx"
---

# Accessibility rules — WCAG 2.2 AA (Israeli standard IS 5568)

Do:
- Landmarks: one `<header>`, `<nav aria-label>`, `<main id="main">`, `<footer>`. Skip link to `#main` is the first focusable element after the demo banner.
- Correct `lang` and `dir` on `<html>` (`en`/`ltr`, `he`/`rtl`). Inline foreign-language text gets its own `lang` (e.g. language switch link).
- One `h1` per page, headings in order, no heading used just for size.
- Every image: meaningful `alt`, or `alt=""` if decorative. Inline SVG icons `aria-hidden="true"` + `focusable="false"`; icon-only links/buttons get `aria-label`.
- Links describe their target ("View transactions", not "Click here"). Same text → same destination.
- Current page link: `aria-current="page"`.
- Mobile menu: `<button aria-expanded aria-controls>`, Esc closes and returns focus to the button, no focus trap, closes on link click.
- Focus visible on everything (`:focus-visible` ring ≥3:1), and never hidden under the fixed banner/sticky header (`scroll-padding-top` already set — keep it in sync if heights change, WCAG 2.4.11).
- Targets ≥24×24 px (2.5.8); primary controls 44px+.
- Forms: visible `<label for>`, `autocomplete` tokens (1.3.5), "(required)" in text not only `*`, errors linked via `aria-describedby`, status via `aria-live="polite"`. No CAPTCHA (3.3.8).
- Text contrast ≥4.5:1 (large ≥3:1), UI/borders ≥3:1 — use only pairs listed in `docs/design-brief.md`.
- Content readable at 400% zoom / 320px width, and with WCAG text-spacing overrides (no fixed heights on text containers).
- Respect `prefers-reduced-motion`.
- Lists are `<ul>/<ol>`, stats are `<dl>`, cards with titles are `<article>`.

Don't:
- No accessibility overlay widgets (the original's OneTap overlay is what we're replacing with native markup).
- No `tabindex` > 0, no `div`/`span` click handlers — use `<button>`/`<a>`.
- No color-only meaning, no placeholder-as-label, no `title`-only names, no auto-playing media.
- Don't remove the demo banner or the accessibility statement link in the footer.

Check before finishing: `npm run typecheck` + `npm run lint`; when you're allowed to build (see AGENTS.md "Working in parallel"), `npm run a11y` on your route plus a keyboard pass (Tab through the whole page, open/close menu with keyboard).
