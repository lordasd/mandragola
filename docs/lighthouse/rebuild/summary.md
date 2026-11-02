# Lighthouse: rebuild (mandragola-rebuild.vercel.app)

Date: 2026-11-02 · Lighthouse 13.6.0 (Node API) · stock mobile preset (Moto G Power, simulated slow 4G, 4× CPU) · headless Chromium, fresh profile per run (cold cache) · 3 runs per route against production, **median by Performance** shown. Same Lighthouse version and preset as the [original baseline](../original/summary.md).

| Route | Perf | A11y | BP | SEO¹ | FCP | LCP | TBT | CLS | Transfer | JS | Requests² |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/` | 95 | 100 | 100 | 69 | 1.3 s | 1.3 s | 247 ms | 0.00 | 386 KB | 149 KB | 38 |
| `/expertise` | 95 | 100 | 100 | 69 | 1.0 s | 1.0 s | 269 ms | 0.00 | 356 KB | 149 KB | 22 |
| `/transactions` | 96 | 100 | 100 | 69 | 1.0 s | 1.0 s | 228 ms | 0.00 | 337 KB | 149 KB | 28 |
| `/he` | 94 | 100 | 100 | 69 | 1.0 s | 1.0 s | 282 ms | 0.00 | 432 KB | 148 KB | 41 |

Perf across the 3 runs: `/` 95/97/94 · `/expertise` 95/95/98 · `/transactions` 95/96/96 · `/he` 92/94/95.

¹ **SEO 69 is by design.** The only failing SEO audit is `is-crawlable`, because every page is `noindex, nofollow` (meta robots + `X-Robots-Tag`), as the assignment requires. Every other SEO audit passes.
² Includes the `?_rsc=` prefetches `<Link>` fires after load.

## Before → after (mobile)

| Route | Perf | A11y | BP | FCP | LCP | Transfer | Requests |
|---|---|---|---|---|---|---|---|
| `/` | 81 → **95** | 94 → **100** | 73 → **100** | 2.4 → **1.3 s** | 4.3 → **1.3 s** | 1,961 → **386 KB** | 89 → **38** |
| `/expertise` | n/a³ → **95** | 94 → **100** | 73 → **100** | 2.8 → **1.0 s** | 6.4 → **1.0 s** | 1,081 → **356 KB** | 80 → **22** |
| `/transactions` | 98⁴ → **96** | 94 → **100** | 73 → **100** | 1.6⁴ → **1.0 s** | 2.0⁴ → **1.0 s** | n/a⁴ → **337 KB** | 89 → **28** |

³ Original run had no Performance score (`NO_SCREENSHOTS`). ⁴ Original `/transactions` was a warm-cache run, so its numbers flatter the original.

Trade-off: TBT rose from ~50 ms (WordPress, mostly static HTML) to ~230–280 ms — the React/Next runtime evaluated under 4× CPU throttling. Everything else improved.

## Iterations
1. First live measurement: `/` 87, `/he` 86 (LCP 2.9–3.2 s). The LCP element was a decorative 1 KB hero gradient image under an 85% overlay, plus all 4 font families (6 files, 191 KB) preloaded on every page.
2. Fixes: hero background made pure CSS (h1 text becomes LCP); fonts split per locale and Hebrew font not preloaded (root-layout fonts preload on every route); modern `browserslist`; cache headers for `/images`.
3. Result above: `/` 95, `/he` 94.
4. Polish round (header hairline, CSS scroll reveal, desktop-only hero video): mobile re-run ×3 — `/` 96/93/92 (median **93**), `/he` 93/92/99 (median **93**), within run-to-run noise of step 3; mobile never downloads the video. **Desktop preset** `/`: Perf **100**, LCP 0.6 s, CLS 0, with the 1.25 MB video loaded after the page ([home.desktop.json](home.desktop.json)).

PageSpeed Insights API (keyless) returned `429 Quota exceeded` for every call, so there is no Google-lab cross-check.

Files: `home.mobile.json`, `expertise.mobile.json`, `transactions.mobile.json`, `he.mobile.json` (median runs).
