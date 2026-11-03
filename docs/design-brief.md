# Mandragola rebuild — design brief

Source of structure/type: Figma "FinWise" (`z4M5NLTpeoht15ZEFlaMTQ`). Source of brand: mandragolaltd.com captures
(`A:\Downloads\mandragola-source`). Target: WCAG 2.2 AA, mobile-first 375 → 1440.

**What we keep from Mandragola:** black/ink header with the white wordmark logo, gold brush "marker line" under key
headings (`MarkerLine-Element.svg`, `#E2B471`), uppercase serif display feel (orig. Cinzel Decorative + Manrope),
city/aerial/office photography, transaction logo wall. **What we keep from FinWise:** EB Garamond + Spline Sans scale,
1360 container, rounded "section cards", eyebrow → serif heading → body pattern, 2×2 cards, alternating rows,
stats block, card grid, contact split. **What we change:** FinWise blue `#38A1FF` / yellow `#F4B100` (white on blue
≈2.7:1 fails AA) → navy ink + Mandragola gold + warm off-white.

## 1. Color tokens (all ratios computed, WCAG 2.x relative luminance)

| Token | Hex | Role |
|---|---|---|
| `--color-ink` | `#0B1B2E` | Header, hero, dark section cards, footer, primary button bg, headings on light |
| `--color-ink-soft` | `#13294B` | Raised elements on ink (mobile menu panel, stat tiles on dark, hover of primary btn) |
| `--color-surface` | `#F7F4EE` | Page background (warm off-white) |
| `--color-surface-raised` | `#FFFFFF` | Cards, form inputs, light section cards |
| `--color-surface-sunken` | `#EFE8DC` | Alternate band (logo wall, transaction page header) |
| `--color-text` | `#1B2430` | Body text on light |
| `--color-muted` | `#4A5565` | Secondary text on light (replaces template gray `#7F7F7F`, which is 3.9:1 on white — fails) |
| `--color-on-ink` | `#FFFFFF` | Text on ink |
| `--color-on-ink-muted` | `#C9D2DE` | Secondary text on ink (replaces `#DCEEFF`) |
| `--color-gold` | `#E2B471` | Mandragola brand gold: marker line, icons/eyebrows/stat labels **on ink only**, demo banner bg, CTA button on ink |
| `--color-gold-text` | `#7A5E2E` | Gold-family text on light (eyebrows, chips text, small links) |
| `--color-line` | `#D9D3C7` | Decorative dividers / card hairlines only (never sole boundary of a control) |
| `--color-line-strong` | `#8A8173` | Input borders, outline-button borders, chip borders (UI ≥3:1) |
| `--color-focus` | `#1F5FBF` | Focus ring on light surfaces |
| `--color-focus-on-ink` | `#E2B471` | Focus ring on ink surfaces (= gold) |
| `--color-danger` | `#A3242A` | Form error text/border |

### Contrast matrix (intended pairs only)

| Foreground | Background | Ratio | Use / threshold |
|---|---|---|---|
| text `#1B2430` | surface `#F7F4EE` | 14.26 | body ✓ 4.5 |
| text | raised `#FFFFFF` | 15.65 | body ✓ |
| text | sunken `#EFE8DC` | 12.85 | body ✓ |
| ink `#0B1B2E` | surface | 15.80 | headings ✓ |
| ink | raised | 17.35 | headings, button text-on-white ✓ |
| muted `#4A5565` | surface | 6.88 | secondary ✓ |
| muted | raised | 7.56 | ✓ |
| muted | sunken | 6.21 | ✓ |
| gold-text `#7A5E2E` | surface | 5.52 | eyebrow/chips ✓ |
| gold-text | raised | 6.06 | ✓ |
| gold-text | sunken | 4.97 | ✓ |
| on-ink `#FFFFFF` | ink | 17.35 | ✓ |
| on-ink | ink-soft `#13294B` | 14.52 | ✓ |
| on-ink-muted `#C9D2DE` | ink | 11.37 | ✓ |
| on-ink-muted | ink-soft | 9.51 | ✓ |
| gold `#E2B471` | ink | 9.09 | eyebrow/stat label on dark ✓ |
| gold | ink-soft | 7.61 | ✓ |
| ink | gold | 9.09 | demo banner text, gold button text ✓ |
| line-strong `#8A8173` | raised | 3.84 | input/chip border ✓ 3:1 |
| line-strong | surface | 3.50 | ✓ 3:1 |
| focus `#1F5FBF` | surface / raised | 5.55 / 6.09 | focus ring ✓ 3:1 |
| focus-on-ink `#E2B471` | ink / ink-soft | 9.09 / 7.61 | focus ring ✓ |
| danger `#A3242A` | raised | 7.39 | error text ✓ |

**Forbidden:** gold `#E2B471` as text/icon on light (1.74:1); `#B08D57` on light (2.82:1) — drop `#B08D57`
entirely; `--color-line` as a control boundary (1.49:1). Never color-only meaning (status chips carry text).

Focus ring: `outline: 2px solid var(--color-focus); outline-offset: 3px;` inside `.on-ink` regions swap to
`--color-focus-on-ink`. Use `:focus-visible`.

## 2. Typography

Fonts via `next/font/google`, `display: swap`, subsets latin (+ hebrew for /he):
`--font-serif` EB Garamond 400/500 · `--font-sans` Spline Sans 400/600/700 ·
`/he`: Heebo (variable) for both `--font-display` and `--font-text` — changed from Frank Ruhl Libre + Assistant at the client's request.

Fluid scale (375 → 1440, `rem + vw` so zoom still works):

| Token | Mobile → Desktop | `font-size` | line-height | tracking | Font |
|---|---|---|---|---|---|
| `--text-h1` | 40 → 76 | `clamp(2.5rem, 1.7077rem + 3.3803vw, 4.75rem)` | 1.2 | -0.01em | serif |
| `--text-h2` | 34 → 64 | `clamp(2.125rem, 1.4648rem + 2.8169vw, 4rem)` | 1.19 | -0.02em | serif |
| `--text-h3` | 28 → 48 | `clamp(1.75rem, 1.3099rem + 1.8779vw, 3rem)` | 1.19 | -0.01em | serif |
| `--text-h4` | 22 → 28 | `clamp(1.375rem, 1.2430rem + 0.5634vw, 1.75rem)` | 1.39 | -0.01em | serif |
| `--text-body-xl` (lead) | 18 → 24 | `clamp(1.125rem, 0.9930rem + 0.5634vw, 1.5rem)` | 1.5 | 0.005em | sans |
| `--text-body-lg` | 17 → 22 | `clamp(1.0625rem, 0.9525rem + 0.4695vw, 1.375rem)` | 1.5 | 0.005em | sans |
| `--text-body-md` | 16 → 20 | `clamp(1rem, 0.9120rem + 0.3756vw, 1.25rem)` | 1.4 | 0.005em | sans |
| `--text-body` | 16 | `1rem` | 1.56 | 0.005em | sans |
| `--text-eyebrow` | 14 | `0.875rem`, 700, uppercase | 1.15 | 0.08em | sans |
| `--text-small` | 14 | `0.875rem` 400 | 1.45 | 0.005em | sans |

Rules: one `h1`/page; H1 hero & page titles may be `text-transform: uppercase` + `0.02em` tracking to echo the
original's Cinzel caps (EN only). Max line length body 68ch, lead 60ch. Hebrew: tracking 0 everywhere, no
uppercase, body line-height 1.65, headings 1.25; same size tokens.

## 3. Layout, spacing, radius

| Token | Value | Figma origin |
|---|---|---|
| `--container` | `85rem` (1360px) max, `width: min(100% - 2*gutter, 85rem)` | 1360 container |
| `--gutter` | `clamp(1rem, 0.4718rem + 2.2535vw, 2.5rem)` (16 → 40) | 40px outer px |
| `--section-gap` | `clamp(1.5rem, 0.9278rem + 2.4413vw, 3.125rem)` (24 → 50) vertical space between section cards | py 50 |
| `--section-pad-x` | `clamp(1.25rem, -0.0704rem + 5.6338vw, 5rem)` (20 → 80) | card px 80 |
| `--section-pad-y` | `clamp(2.5rem, 1.3996rem + 4.6948vw, 5.625rem)` (40 → 90) | card pb 90 |
| `--stack-lg` | `clamp(2rem, 1.3838rem + 2.6291vw, 3.75rem)` (32 → 60) gap between blocks inside a card | gap 40–60 |
| `--radius-section` | `clamp(1.5rem, 0.9278rem + 2.4413vw, 3.125rem)` (24 → 50) | rounded 50 |
| `--radius-card` | `clamp(1.25rem, 1.0299rem + 0.9390vw, 1.875rem)` (20 → 30) | rounded 30 / image 20 |
| `--radius-nav` | `0.75rem` mobile → `0.9375rem` ≥768 (12 → 15) | nav 15 |
| `--radius-control` | `0.625rem` (10) | buttons, inputs |
| `--radius-pill` | `999px` | chips |

Grid: 4-col mobile / 8-col ≥768 / 12-col ≥1024, column gap 16 / 24 / 30 (Figma card gap 30).
Breakpoints: `sm 640`, `md 768`, `lg 1024`, `xl 1280`. Reflow must hold at 320px.
Section card = `<section>` with bg (ink / raised / sunken), `border-radius: var(--radius-section)`, padding
`var(--section-pad-y) var(--section-pad-x)`, sitting inside the container on the `surface` page bg.

## 4. Components

**Demo banner** (`DemoBanner`, every page): `position: fixed; top: 0; inset-inline: 0; z-index: 60`; bg `--color-gold`,
text `--color-ink` 14px/600, centered, `min-height: 40px`, padding 8px 16px, wraps on mobile (≈56px at 320).
Text: "Demo for a recruitment assignment — not the official Mandragola website" (HE: "אתר הדגמה למטלת גיוס — אינו
האתר הרשמי של מנדרגולה"). Rendered as `<div role="note">` before the skip link's target, not inside `<header>`.
Set `--banner-h` (CSS var, 40px; 56px under 400px) → `body { padding-top: var(--banner-h) }`,
`html { scroll-padding-top: calc(var(--banner-h) + var(--header-h) + 16px) }` (2.4.11).

**Skip link:** first focusable; visually hidden until focus, then ink pill top-left below the banner.

**Header / nav** (Figma `1:304`): sticky `top: var(--banner-h)`; outer padding `12px gutter` (desktop `30px 40px`
→ use `16px` to save height); inner bar bg `--color-ink`, radius `--radius-nav`, padding `12px 16px` → `20px 40px` ≥1024,
`--header-h` 72 mobile / 96 desktop bar. Bar has a 1px `--color-line-on-ink` (#FFFFFF26) border + soft ink shadow so it stays distinct over ink section cards (decorative edge, not a control boundary). Left: white Mandragola logo (`Mandragola-Logo-Investments-Limited-White.svg`,
height 52 → 72, `alt="Mandragola Investments Limited – home"`). Center (≥1024): links Home · Expertise ·
Transactions · Contact (anchor `#contact`), sans 16px white, gap 32, current page `aria-current="page"` + 2px gold
underline offset 6px. Right: language switch "עברית"/"English" (`lang` attr on link, `hreflang`) + outline button
"Contact" (white 1px border, radius 10, px 20 py 10). Hover: underline/gold. All targets ≥44px tall.
**Mobile menu** (<1024): 44×44 icon button (hamburger line icon, `aria-label="Menu"`, `aria-expanded`,
`aria-controls`). Panel drops below the bar: bg `--color-ink-soft`, radius `--radius-nav`, links stacked 20px
serif, 56px rows with `--color-line`-on-dark hairlines (`#FFFFFF1F`); Esc closes and returns focus to the button;
closes on link click. Body scroll not locked (no trap).

**Button** (Figma radius 10, px 30 py 15, 16px): `primary` ink bg / white text, hover ink-soft;
`gold` (on ink sections) gold bg / ink text, hover `#EAC58E`; `outline` 1px `--color-line-strong`, ink text
(on ink: 1px white/60%, white text). Trailing 16px arrow icon (`→`, flips in RTL via `scale-x-[-1]`). Min height 48.

**Eyebrow + heading + body block** (`SectionHeading`): eyebrow (`--text-eyebrow`, gold-text on light, gold on ink)
→ 18px gap → H2 (or H1 on page heads) → optional gold marker line (`MarkerLine-Element.svg`, `aria-hidden`,
width 200 → 280, 8px below heading) → 18–25px gap → lead (`--text-body-xl`, muted / on-ink-muted). Align start;
centered variant for the 2×2 intro.

**Hero** (Figma `1:295`, rebuilt as a dark section card): ink section card, `min-height: clamp(520px, 70vh, 720px)`;
background `HeroPage-Background-Image-Expand-scaled.png` via `next/image` `fill` `priority` `sizes="100vw"`,
`object-cover`, with overlay `linear-gradient(90deg, rgba(11,27,46,.92) 0%, rgba(11,27,46,.78) 55%, rgba(11,27,46,.45) 100%)`
(mobile: uniform `.85`) — text area must stay ≥4.5:1 against the darkest-lightest pixel. Content max 720px:
eyebrow "MANDRAGOLA", H1 "Global Investments & Partnerships" (uppercase), lead "Connecting capital, relationships,
and opportunity across A&D, and technology", buttons gold "Our expertise" + outline-on-ink "View transactions".
No illustration column.

**Stats row** (Figma `1:389` grid, real numbers only): 3 tiles, 1 col → 3 cols ≥768, gap 16/30. On light: raised
tile, radius-card, padding 32/40, 1px `--color-line`; number H3 serif ink, label eyebrow muted. Data: "100+"
Financing transactions · "Billions" Dollars of capital raised · "Thousands" Underlying shareholders. Markup `<dl>`.

**2×2 feature cards** (Figma `1:209`): container is ink section card; header block on top (eyebrow "EXPERTISE",
H2 "Experience that extends beyond capital"); grid 1 → 2 cols ≥768, gap 16 / 30. Card: raised bg, radius-card,
padding `40px 24px` → `64px 48px` (template 120/100 is too airy), no fixed height, centered text. Icon: 48px
inline SVG line icon, `stroke: var(--color-gold-text)` 1.5px, round caps, `aria-hidden`; icons globe (Capital
Markets), building/columns (Company Building), handshake or plane (Strategic Relationships), compass/target
(Opportunity Sourcing). H3 at `--text-h4`…`h3` (use h3 element, `--text-h4` size on mobile), body `--text-body-md` muted.
Whole card links to `/expertise#<slug>` via stretched link; hover lifts border to gold-text. Footer row: outline-on-ink
button "Explore our expertise".

**Alternating image/text rows** (Figma `1:307` / `1:320`): row = 2 cols ≥1024 (`1fr 1fr`, gap 60), stacked on mobile
(image first). Even rows reverse via `order` (use logical, works in RTL). Image radius-card, aspect 4/3 mobile, 606×555
(~1.09) desktop, `object-cover`. Text: icon 40px line SVG, H2-size `--text-h3` heading (`<h2>`), body `--text-body-lg`
muted, optional bullet sub-points as H4 + 16px body (template "First Funding…" pattern) only if real content exists.
Row vertical gap `--stack-lg`; each row has `id` for anchor.

**Transaction card** (adapted from blog card `1:265`): `<article>` in grid 1 / 2 (≥640) / 3 (≥1024), gap 16 / 24 / 30.
Raised bg, 1px `--color-line`, radius-card, padding 24 → 32, flex column, `height: 100%`.
1. Chips row: sector chips + deal-type chip, `--text-small` 600, pill, padding 4px 12px; sector = sunken bg + text color;
   deal type = 1px line-strong border + gold-text. Wrap, gap 8.
2. Logo row (min-height 64, align center, gap 16): 1–2 party logos, each `height: 40px; max-width: 140px; object-contain`
   with real alt ("DFSL", "Tessera"); between them a serif `&` 28px muted `aria-hidden` + visually-hidden "and".
   Text fallback (serif H4) if no logo (e.g. OmegaMore wordmark).
3. Summary (`h3` visually styled as body-md 500 ink, e.g. "DFSL has agreed to be acquired by Tessera").
4. Spacer `margin-top: auto`, 1px line hairline, then "Mandragola's role" eyebrow (gold-text) + role text 16px muted.
5. Optional status badge (e.g. "Pending", "Non-binding LOI"): top-end corner, text + dot icon, ink on sunken.
No hover motion except border → line-strong. Cards are not links (no detail pages).

**Logo wall** (home teaser): sunken section card, eyebrow "TRANSACTIONS", H2, then 2 / 3 / 4 col grid of logos
(height 32–40, `filter: grayscale(1)`, opacity 1 — keep contrast), button "Discover transactions".

**CTA band** (Figma `1:200`) — *removed: every page now ends with the Contact section instead (one contact block per page).* Was: ink section card, 2 cols ≥1024: H2 white "Let's build what comes next" + lead
on-ink-muted, gold button "Contact us"; right: gold marker line or logo icon (`Original_Logo_Icon.svg`, white, 160px,
decorative). Mobile stacked, padding section tokens. Drop globe illustration.

**Contact section** (Figma `1:532`, `id="contact"`): 2 cols ≥1024 (gap 57 → 30 on md), stacked mobile with the
info column first (it is short). Info column: ink card radius-card, padding `32px 24px` → `90px 50px`, groups with
eyebrow (gold) + 16px white text: OFFICE "8 HaGavish, Netanya, Israel" · EMAIL `info@mandragolaltd.com` (mailto,
underline) · SOCIAL icon links LinkedIn/Facebook/X, 44×44, `aria-label`. Form column: eyebrow "CONTACT", H2
"Let's talk", body muted. Fields: Full name (`autocomplete="name"`), Phone (`tel`), Email (`email`), Sector (text, optional), Company
(`organization`, optional). Each: visible `<label>` above (16px 600 ink; required = "*" + sr-only "(required)",
optional = visible "(optional)"), input raised bg,
1px line-strong border, radius 10, padding 14px 16px, min-height 48; focus = focus ring + border ink; error text
danger 14px with icon, linked via `aria-describedby`. Submit primary full-width "Send message"; on submit `preventDefault` and show status in `aria-live="polite"`
region. No CAPTCHA.

**Footer** (Figma `1:199`): ink block with top radius `--radius-section` (35 in template) at container width, padding
`48px 24px 24px` → `60px 40px 30px`. Row 1: logo white (height 64 → 96) + link groups (stack on mobile, row ≥1024): "Company" (2-col grid, 3 at ≥640)
(Home, Expertise, Transactions), "Legal" (Accessibility statement only;
no privacy/terms pages in scope). No contact column: address/email/social live in the Contact section next to the form. Headings 16px 600 white; links 16px on-ink-muted → white on hover, underline on focus/hover,
row height ≥32. Hairline `#FFFFFF26`. Bottom row: "© 2026 Mandragola Ltd. Demo rebuild." + language switch.

## 5. Page compositions

**Home `/`** (and `/he` mirrored, RTL)
1. Header · 2. Hero (FinWise Hero `1:295` → original hero) · 3. Intro + stats: raised section card, SectionHeading
"Identifying and developing high potential growth opportunities" + lead (A&D text) + Stats row (`1:287` about + `1:389` grid)
· 4. Statement: 2 cols, H2 uppercase "Capital. Access. Strategic execution." + marker line | body + outline btn
"Our approach" (→ /expertise) · 5. "Where capital meets opportunity": image card (`Cover-ImageB-scaled.jpg` aerial,
radius-section, ink overlay) with H2 + lead + gold btn · 6. Logo wall → /transactions · 7. 2×2 expertise cards
(`1:209`) · 8. Contact (`1:532`) · 9. Footer.

**Expertise `/expertise`** (Services frame `1:305`)
1. Page head (surface, no card): eyebrow "EXPERTISE", H1 "Experience that extends beyond capital", marker line,
lead (forecasting/valuation paragraph) · 2. Four alternating rows (`1:307`/`1:320`) with ids `capital-markets`,
`company-building`, `strategic-relationships`, `opportunity-sourcing`; images `Expertise-Financial-markets-1-*.png`,
`Expertise-Business-operations.png`, `Expertise-Investment-platforms-1.png`, `Expertise-Tech-investing.png` (match
original order) · 3. Contact (full section) · 4. Footer.
Skip the template features block `1:333` (no real content).

**Transactions `/transactions`** (Blog grid `1:504` + card `1:265`)
1. Page head on sunken section card: eyebrow "TRANSACTIONS", H1 "Our transactions & investments", lead (philosophy
paragraph, split into 2 short paragraphs) · 2. Stats row (same 3 real stats) · 3. Grid of 13 transaction cards in
original order (DFSL&Tessera, Zorronet&Tessera, MIA Dynamics, Enigma, T3 Defense&Star26, ArrivAir II, DentFreak,
OmegaMore, Kochav, Continual&Shikun & Binui, Motomea (status Pending), VersaMed) · 4. Contact (same section as Expertise) · 5. Footer.
No filters (zero JS); sector chips are plain text.

## 6. Drop from template / imagery

Drop: all Streamline cartoon illustrations (hero, about, CTA globe, watermarked), stock people photos from FinWise,
video/play section, Pricing frame, fake stats (15+, 3450, 21,000+ customers), blog author bylines, "Get Started"
fintech copy, Inter "WealthWise" logo, Twitter-bird icons.
Imagery = Mandragola's own `_images` only: hero city background, aerial coast cover, 4 Expertise photos, partner logos
(SVG, keep vector), white logo + icon. Convert PNG/JPG → AVIF/WebP via `next/image`; hero `priority`, rest lazy;
always set `sizes`. Meaningful photos get short alt ("Manhattan skyline at dusk"); decorative (marker line, icon
mark, overlays) `alt=""`/`aria-hidden`. Do not use the Midjourney-generated rocket/air images or the istock file.
Optional soft decoration: one large gold-to-transparent radial blur (`#E2B4711A`) top-end of page heads, echoing
the original's beige triangle.

## 7. Motion

Minimal: color/border transitions 150ms ease-out on interactive elements; mobile panel opacity+translateY(−4px)
150ms. No parallax, autoplay, carousels or counters. Wrap all in
`@media (prefers-reduced-motion: no-preference)`; under `reduce` everything is instant and `scroll-behavior: auto`.

**Scroll reveal (CSS-only).** `.reveal` (in `app/globals.css`) runs keyframes `reveal-in` — `translate: 0 12px → 0`
only, linear, `fill-mode: both` — on a scroll-driven `animation-timeline: view()` with
`animation-range: entry 0% entry 60%`, so a block finishes rising once 60% of its entry is done and simply
follows the scroll (no duration, no JS). Constraints:
- Gated by `@media (prefers-reduced-motion: no-preference)` and `@supports (animation-timeline: view())`.
  Reduced motion and browsers without view timelines (Firefox today) get static, fully visible content.
- `Section` applies it to its inner card/container by default (`reveal` prop, default `true`). Above-the-fold
  blocks opt out with `reveal={false}`: home hero (the h1 is the LCP element and is never animated) and the
  page heads on /transactions; the /expertise and legal page heads never use it.
- Per-item: each transaction card and each expertise row carries `.reveal`; their own timelines stagger a row.
  No nesting inside a revealing section.
- Transform-only, no opacity: an opacity fade was tried and failed axe color-contrast at 1440×900 (blocks partly
  entered at load sat half-transparent: home mission card, first /expertise row). Re-run `npm run a11y` after any
  change to the keyframes or range.
