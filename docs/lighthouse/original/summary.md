# Lighthouse baseline: original site (mandragolaltd.com)

Date: 2026-11-02 · Lighthouse 13.6.0 (Node API) · mobile preset (Moto G Power emulation, simulated slow-4G throttling) · Chromium 156 (Playwright build), Windows 10, from Israel

| Page | Perf | A11y | BP | SEO | FCP | LCP | TBT | CLS | Transfer | JS | Requests |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/` | 81 | 94 | 73 | 92 | 2.4 s | 4.3 s | 50 ms | 0 | 1,961 KB | 191 KB | 89 |
| `/expertise/` | n/a ¹ | 94 | 73 | 85 | 2.8 s | 6.4 s | 50 ms | 0 | 1,081 KB | 153 KB | 80 |
| `/transactions/` | 98 ² | 94 | 73 | 85 | 1.6 s ² | 2.0 s ² | 60 ms | 0 | n/a ² | n/a ² | 89 |

Images are most of the weight on `/` (1,384 KB of 1,961 KB); fonts 233 KB.

¹ Speed Index failed (`NO_SCREENSHOTS`, headed window got no paint frames), so no Performance score; other metrics valid.
² Not a cold load: 48 of 88 requests served from warm HTTP cache, so FCP/LCP/score are optimistic and sizes unusable.

## Method
- Plain HTTP → `202` + `SG-Captcha: challenge` → `/.well-known/sgcaptcha/` (SiteGround JS bot challenge). A normal Chromium window passes it on its own.
- Headless Lighthouse CLI always got the challenge page.
- Working setup: Lighthouse Node API over `--remote-debugging-port` to a headed Playwright Chromium (copied profile, `disableStorageReset`), stock mobile settings with load/quiet waits raised to 6 s so the site's own challenge could finish. No captcha solving or header spoofing.
- On `/` and `/expertise/` the challenge round-trip happens inside the measured load (~1.0 s / ~1.3 s in the `redirects` audit) — real first-time visitors pay it too.
- PageSpeed Insights keyless API returned `429 Quota exceeded`; no Google-lab result.

## Findings
- Challenge page is served with `x-robots-tag: noindex` + `<meta name="robots" content="NOINDEX, NOFOLLOW">` (SEO 45–54 when a crawler gets it). `/robots.txt` is challenged too → `robots-txt` audit fails on every page.
- Best Practices 73: mixed content — Elementor local Google-Fonts CSS (roboto, robotoslab, poppins) requested over `http://` and blocked.
- Accessibility 94: `heading-order`, `link-name`, `landmark-one-main` (no `<main>`).
- SEO: `/expertise/` and `/transactions/` have no meta description.
- Performance: heavy images, web fonts and the challenge redirect drive slow FCP/LCP; TBT/CLS fine.

Files: `home.mobile.json`, `expertise.mobile.json`, `transactions.mobile.json` (full LHRs); `challenge-page.expertise.mobile.json` (run that only got the challenge, kept as evidence).
