<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Mandragola rebuild

Demo rebuild of mandragolaltd.com (WordPress) for a recruitment home assignment: Home, Expertise, Transactions, Hebrew home (`/he`, RTL), accessibility statements. Next.js 16 App Router + React 19 + Tailwind v4, fully static, deployed to Vercel.

## Commands
- `npm run dev` — dev server (port 3000)
- `npm run typecheck` / `npm run lint` — run before handing work back
- `npm run build` then `npx next start -p 3100` — production build/serve
- `npm run a11y -- http://localhost:3100 [routes…]` — axe WCAG 2.2 AA scan, mobile + desktop. Routes without leading slash (`home expertise he`); no routes = all.

## Layout
- `app/(en)/…` and `app/(he)/he/…` — two root layouts (`lang`/`dir` differ). `app/global-not-found.tsx` handles unmatched URLs.
- `components/ui/*` primitives, `components/layout/*` shell (SiteShell, Header, MobileNav, NavLink, Footer, LegalPage), `components/<page>/*` page sections.
- `content/*.ts` — all copy, typed by `content/types.ts`. `lib/seo.ts` metadata + JSON-LD builders, `lib/i18n.ts` UI strings, `lib/fonts.ts`, `lib/cn.ts`.
- `docs/design-brief.md` — tokens, contrast matrix, component specs. `docs/original-audit.md`, `docs/lighthouse/` — before/after data.

## Detailed rules (auto-loaded by path)
`.claude/rules/design-system.md`, `styling.md`, `accessibility.md`, `content-seo.md`. Read them before editing UI or content.

## Non-negotiables
- Demo banner on every page; `noindex` meta + `X-Robots-Tag` everywhere; contact form never sends or stores; public content only.
- WCAG 2.2 AA (IS 5568). Logical CSS properties only (RTL).
- Near-zero client JS: Server Components by default; client only for ContactForm, MobileNav, NavLink.

## Working in parallel (multi-agent)
- Each agent edits only the paths it was assigned. Shared files (`components/ui`, `components/layout`, `lib`, `content/types.ts`, `globals.css`) — propose changes in your final report instead of editing, unless assigned.
- Don't run `npm run build`/`next start` while other agents work (shared `.next`); use `typecheck` + `lint`. Main thread builds, commits, and deploys. Agents never commit.
