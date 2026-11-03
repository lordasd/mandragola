# Mandragola — Next.js rebuild

**Live:** https://mandragola-rebuild.vercel.app · Home, [Expertise](https://mandragola-rebuild.vercel.app/expertise), [Transactions](https://mandragola-rebuild.vercel.app/transactions), [Hebrew home (RTL)](https://mandragola-rebuild.vercel.app/he). Recruitment demo: demo banner on every page, `noindex` everywhere, and the contact form sends nothing.

## What I changed and why
- **Design:** a navy-and-gold system built on the brand's own gold, mobile-first, with one consistent nav, a clear call to action on every page, and every color pair contrast-checked ([design brief](docs/design-brief.md)).
- **SEO:** unique title and description per page, one `h1` and a real heading outline, JSON-LD (Organization, WebSite, BreadcrumbList, ItemList of deals, Service), sitemap, hreflang en/he, OG images and alt text. The original has none of the structured data and `h1` everywhere ([audit](docs/original-audit.md)).
- **Speed:** fully static Next.js 16 with Server Components. Client JS covers only the menu, the form, the nav links and a desktop-only hero video that loads after the page. AVIF/WebP images, only the English fonts are preloaded, and the h1 is the LCP element.
- **Accessibility:** WCAG 2.2 AA (IS 5568) with native markup: skip link, visible focus, keyboard menu, inline form errors, 320px reflow, reduced motion, plus an [accessibility statement](https://mandragola-rebuild.vercel.app/accessibility).

## Lighthouse (mobile, median of 3, Lighthouse 13.6)
| Page (original → rebuild) | Performance | Accessibility | SEO |
|---|---|---|---|
| Home | 81 → **93** | 94 → **100** | 92 → 69* |
| Expertise | n/a → **96** | 94 → **100** | 85 → 69* |
| Transactions | 98† → **94** | 94 → **100** | 85 → 69* |

Home LCP 4.3 s → 1.2 s, page weight 1.96 MB → 391 KB. Best practices 73 → 100 on every page. \*The SEO drop comes only from the `noindex` the brief requires (`is-crawlable`); every other SEO audit passes. †Original measured with a warm cache. [Full data](docs/lighthouse/rebuild/summary.md).

## How I worked with AI
**Tools:** Claude Code (Opus 5.5): plan mode first, then parallel subagents, each owning its own folders (design via Figma MCP, content, shell, one per page, then SEO, code-review and WCAG audits). Shared rules live in [`AGENTS.md`](AGENTS.md) and [`.claude/rules`](.claude/rules). I reviewed every report, made the commits, and checked results with screenshots, axe and Lighthouse ([log](docs/ai-log.md)).

**Example request:** *"Full WCAG 2.2 AA audit of the live site, read-only. Script keyboard order, focus not obscured, target size, 320px reflow, text spacing, form errors. Return pass/fail per criterion with evidence and the file to fix."* It found two failures that axe had passed: headings clipped at 320px, and the banner overlapping the header on small phones.

**When the AI was wrong:** Claude created the Vercel project from the CLI. The deploy said "READY" but every page returned 404, while `/og/og-en.png` loaded fine. The framework preset was left at "Other", so only `public/` was served. I pinned `"framework": "nextjs"` in `vercel.json` so the setting lives in git.

## Run locally
`npm install` · `npm run dev` · `npm run typecheck && npm run lint` · `npm run a11y -- http://localhost:3100`
