# Lighthouse: rebuild (mandragola-rebuild.vercel.app)

Date: 2026-11-03 (final deploy `bb70fcd`) · Lighthouse 13.6.0 (Node API) · stock mobile preset (Moto G Power, simulated slow 4G, 4× CPU) · headless Chromium, fresh profile per run (cold cache) · 3 runs per route against production, **median by Performance** shown. Same Lighthouse version and preset as the [original baseline](../original/summary.md).

| Route | Perf | A11y | BP | SEO¹ | FCP | LCP | TBT | CLS | Transfer | JS | Requests² |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/` | 93 | 100 | 100 | 69 | 1.2 s | 1.2 s | 229 ms | 0.00 | 391 KB | 149 KB | 39 |
| `/expertise` | 96 | 100 | 100 | 69 | 1.0 s | 1.0 s | 210 ms | 0.00 | 360 KB | 149 KB | 23 |
| `/transactions` | 94 | 100 | 100 | 69 | 1.0 s | 1.0 s | 280 ms | 0.00 | 344 KB | 149 KB | 30 |
| `/he` | 92 | 100 | 100 | 69 | 1.2 s | 1.2 s | 283 ms | 0.00 | 437 KB | 148 KB | 42 |

Perf across the 3 runs: `/` 92/96/93 · `/expertise` 98/94/96 · `/transactions` 93/94/95 · `/he` 91/94/92.

¹ **SEO 69 is by design.** The only failing SEO audit is `is-crawlable`, because every page is `noindex, nofollow` (meta robots + `X-Robots-Tag`), as the assignment requires. Every other SEO audit passes.
² Includes the `?_rsc=` prefetches `<Link>` fires after load.

## Before → after (mobile)

| Route | Perf | A11y | BP | FCP | LCP | Transfer | Requests |
|---|---|---|---|---|---|---|---|
| `/` | 81 → **93** | 94 → **100** | 73 → **100** | 2.4 → **1.2 s** | 4.3 → **1.2 s** | 1,961 → **391 KB** | 89 → **39** |
| `/expertise` | n/a³ → **96** | 94 → **100** | 73 → **100** | 2.8 → **1.0 s** | 6.4 → **1.0 s** | 1,081 → **360 KB** | 80 → **23** |
| `/transactions` | 98⁴ → **94** | 94 → **100** | 73 → **100** | 1.6⁴ → **1.0 s** | 2.0⁴ → **1.0 s** | n/a⁴ → **344 KB** | 89 → **30** |

³ Original run had no Performance score (`NO_SCREENSHOTS`). ⁴ Original `/transactions` was a warm-cache run, so its numbers flatter the original.

Trade-off: TBT rose from ~50 ms (WordPress, mostly static HTML) to ~210–280 ms — the React/Next runtime evaluated under 4× CPU throttling. Everything else improved.

## Iterations
1. First live measurement: `/` 87, `/he` 86 (LCP 2.9–3.2 s). The LCP element was a decorative 1 KB hero gradient image under an 85% overlay, plus all 4 font families (6 files, 191 KB) preloaded on every page.
2. Fixes: hero background made pure CSS (h1 text becomes LCP); fonts split per locale and Hebrew font not preloaded (root-layout fonts preload on every route); modern `browserslist`; cache headers for `/images`.
3. Result after fixes: `/` 95, `/he` 94.
4. Polish round (header hairline, CSS scroll reveal, desktop-only hero video): mobile re-run ×3 — `/` 96/93/92 (median **93**), `/he` 93/92/99 (median **93**), within run-to-run noise of step 3; mobile never downloads the video. **Desktop preset** `/`: Perf **100**, LCP 0.6 s, CLS 0, with the 1.25 MB video loaded after the page ([home.desktop.json](home.desktop.json)).

5. Final re-run after the layout polish (full-width header and hero, contact section on every inner page): table above. Within run-to-run noise of steps 3–4.

PageSpeed Insights API (keyless) returned `429 Quota exceeded` for every call, so there is no Google-lab cross-check.

Files: `home.mobile.json`, `expertise.mobile.json`, `transactions.mobile.json`, `he.mobile.json` (median runs).
