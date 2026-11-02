---
paths:
  - "**/*.tsx"
  - "app/globals.css"
---

# Styling rules (Tailwind v4)

- Tokens are defined once in `app/globals.css` under `@theme`. Add a token there instead of using an arbitrary value. Arbitrary values (`w-[37px]`) only when no token fits, and leave a short comment why.
- No inline `style={{}}` except for truly dynamic values (e.g. CSS variable from data). No CSS modules, no styled-components.
- Merge conditional classes with `cn()` from `@/lib/cn`.
- **RTL-safe by default:** logical utilities only — `ps-/pe-`, `ms-/me-`, `start-/end-`, `text-start/text-end`, `border-s/border-e`, `rounded-s/rounded-e`. Never `pl-/pr-/ml-/mr-/left-/right-/text-left/text-right`. Directional icons (arrows) flip with `rtl:-scale-x-100`.
- Mobile-first: base classes target 375px; add `sm: md: lg: xl:` upward. Layout must reflow at 320px with no horizontal scroll.
- Class order: layout (display/position/grid) → box (size/spacing) → typography → color → borders/radius → effects → states (`hover: focus-visible:`) → breakpoints.
- Interactive states: every interactive element has `hover:` and `focus-visible:` styles; never `outline-none` without a replacement ring.
- Touch targets ≥44px tall for primary controls (≥24×24 absolute minimum, WCAG 2.5.8).
- Transitions only inside `motion-safe:`.
- Keep client JS near zero: components are Server Components unless they need state (`"use client"` only for ContactForm, MobileNav, NavLink, LanguageLink and HeroVideo).
