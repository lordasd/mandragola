# Mandragola — Next.js rebuild

**Live:** https://mandragola-rebuild.vercel.app · **Pages:** Home, [Expertise](https://mandragola-rebuild.vercel.app/expertise), [Transactions](https://mandragola-rebuild.vercel.app/transactions), [Hebrew home (RTL)](https://mandragola-rebuild.vercel.app/he), accessibility statements.
Recruitment demo, not the official site: every page has the demo banner and is `noindex`, and the contact form sends nothing.

## What I changed and why
- **Design:** a navy-and-gold system built from Mandragola's own brand gold (`#E2B471`), with the layout rhythm of a finance template (Figma) and every color pair checked for contrast ([design brief](docs/design-brief.md)). The pages are mobile-first, and each one has a clear call to action and a single consistent nav.
- **SEO:** each page has a unique title and description, one `h1` and a proper heading outline. Structured data covers Organization, WebSite, BreadcrumbList, ItemList of the 12 deals and Service. The site also has a sitemap, hreflang en/he, OG images and alt text everywhere. The original has none of the structured data, a meta description only on the home page, and all its headings as `h1`s ([audit](docs/original-audit.md)).
- **Speed:** fully static Next.js 16 with Server Components. The only client JS is the menu, the form, the language/nav links and the home hero video, which mounts on desktop after the page loads, has a pause button, and is skipped under reduced motion or Data Saver (mobile never downloads it). Images are AVIF/WebP, only the English font pair is preloaded, and there is no page builder, jQuery or accessibility-overlay widget.
- **Accessibility:** WCAG 2.2 AA (IS 5568) is built in through native markup. That means a skip link, landmarks, visible focus, a keyboard-operable menu, inline form errors, reflow down to 320px, a layout that survives text-spacing overrides, and support for reduced motion. The site includes a regulation 35 [accessibility statement](https://mandragola-rebuild.vercel.app/accessibility). Hebrew uses Heebo with full RTL and bidi isolation for addresses and figures.

## Lighthouse (mobile, median of 3, Lighthouse 13.6)
| Page | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|
| Home: original → rebuild | 81 → **93–95** | 94 → **100** | 73 → **100** | 92 → 69* |
| Expertise | n/a → **95** | 94 → **100** | 73 → **100** | 85 → 69* |
| Transactions | 98† → **96** | 94 → **100** | 73 → **100** | 85 → 69* |

Home LCP fell from 4.3 s to 1.3 s and page weight from 1.96 MB to 386 KB. The cost is higher TBT (50 → ~250 ms) from the React runtime. \*SEO 69 comes from the `noindex` the assignment requires: `is-crawlable` is the only failing audit. †The original measured with a warm cache. Full data and method: [original](docs/lighthouse/original/summary.md) · [rebuild](docs/lighthouse/rebuild/summary.md).

## How I worked with AI
**Tools:** Claude Code (Opus 5.5), in plan mode first, then several parallel subagents, each owning its own folders: design (via Figma MCP), content extraction, app shell, Lighthouse baseline, one per page, then SEO, code-review and WCAG audits. Shared rules live in [`AGENTS.md`](AGENTS.md) and path-scoped [`.claude/rules`](.claude/rules). I reviewed every agent report, made the commits and checked the result with screenshots, axe and Lighthouse. Full log: [docs/ai-log.md](docs/ai-log.md).

**Example request:** *"Full WCAG 2.2 AA audit (IS 5568) of the live site, read-only. Script keyboard order, focus not obscured (2.4.11), target size, 320px reflow, text-spacing, form errors, reduced motion. Return pass/fail per criterion with evidence and the exact file to fix."* It found two real failures that axe had passed. Long uppercase headings were clipped at 320px, and the fixed banner overlapped the header on 400–550px phones.

**When the AI was wrong:** I had Claude create the Vercel project from the CLI before the first deploy. The deploy reported "READY", but every page returned 404. The clue was that `/og/og-en.png` loaded fine: the project's framework preset was left at "Other", so Vercel served only `public/`. I fixed it by committing `vercel.json` with `"framework": "nextjs"`, so the setting lives in git, not in a dashboard. Reviews also caught smaller mistakes. The JSON-LD "escape" was a no-op. `robots.txt Disallow` would have hidden the `noindex` from crawlers. My first gold accent failed contrast at 2.8:1.

## Run locally
`npm install` · `npm run dev` · `npm run build && npx next start -p 3100` · `npm run a11y -- http://localhost:3100` · `npm run typecheck && npm run lint`
