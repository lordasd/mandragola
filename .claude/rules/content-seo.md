---
paths:
  - "content/**"
  - "app/**/page.tsx"
  - "app/**/layout.tsx"
  - "lib/seo.ts"
---

# Content & SEO rules

Content:
- All copy lives in `content/*.ts`, typed by `content/types.ts`. Components never hard-code copy.
- Public information only (mandragolaltd.com and what Google shows). No invented facts, numbers, clients, people or quotes. Light copy-editing (typos, capitalization) is fine.
- Hebrew content (`*.he.ts`) is a faithful translation of the English; company names and tickers stay in Latin script.

SEO (build it as if going live, but stay noindex):
- Every `page.tsx` exports `metadata` (or `generateMetadata`) built with `buildMetadata()` from `@/lib/seo`: unique title (≤60 chars, "Page — Mandragola Ltd"), description 140–160 chars, canonical path, Open Graph, `alternates.languages` when a translation exists.
- `robots` must stay `{ index: false, follow: false }` on every page, and the `X-Robots-Tag: noindex, nofollow` header in `next.config.ts` must stay. Required by the assignment — never remove.
- Structured data via `<JsonLd>` with the builders in `lib/seo.ts`: Organization + WebSite on home, BreadcrumbList on inner pages, ItemList on transactions, Service on expertise. Data must match visible content.
- Exactly one `h1` per page matching the page topic; logical h2/h3 outline.
- New routes must be added to `app/sitemap.ts` (with hreflang alternates if translated).
- Internal links use `next/link`; links to pages not rebuilt point to the original site absolute URL.
