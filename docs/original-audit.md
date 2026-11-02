# Audit of the original mandragolaltd.com

Captured from the public site (8 URLs from the nav, footer and Yoast sitemap index). Figures come from the captured HTML, the `meta.json` extraction and screenshots.
## Stack detected

- **WordPress** + **Hello Biz** theme 1.2.2, page builder **Elementor 4.3.5** + **Elementor Pro 4.2.2** (popups, nav menu, sticky header, nested carousel, forms).
- **Yoast SEO 28.8**: titles, robots, canonical, JSON-LD graph, sitemaps (`sitemap_index.xml` lists post, page, category and author sitemaps).
- **OneTap 2.14.0** accessibility overlay: toolbar, readable-font CSS, about 50 flag images for language selection, and roughly 800 `onetap` references in each page's HTML.
- **Skyboot Custom Icons for Elementor**: three icon-font stylesheets (Themify, Line Awesome, Simple Line Icons).
- jQuery 3.7.1 + jQuery Migrate 3.4.1 + jQuery UI core, Swiper 8.4.5, SmartMenus, jquery.sticky, wp-hooks/i18n.
- Hosting is **SiteGround**. Its bot-protection captcha answers crawlers and other non-browser clients with **HTTP 202** and **`X-Robots-Tag: noindex`**, not with the page. This is a serious indexing risk: Googlebot or link-preview bots that get the challenge see a page marked noindex.

## Weight (per page)

| Page | HTML size | External JS | External CSS |
|---|---|---|---|
| Home | 461 KB | 20 | 33 |
| Our Mission | 396 KB | 19 | 28 |
| Expertise | 398 KB | 19 | 30 |
| Transactions | 440 KB | 19 | 39 |
| Values | 402 KB | 19 | 28 |
| Articles | 401 KB | 20 | 31 |
| /mandragola/ (legacy landing) | 591 KB | 20 | 33 |

- The HTML alone is about 0.4–0.6 MB before any assets load. Most of it is Elementor wrapper markup and the inline OneTap toolbar.
- Source images in the uploads come to about 21 MB, including PNG photos of 1–2 MB each (for example `Values-Conspet-Image.png` at 1.98 MB and `Enigma_…-scaled.png` at 2.16 MB). The rebuild's equivalents total about 0.46 MB.
- The home hero is a background video named `Video-Example.mp4`, a placeholder file name, shown over a 1.5 MB PNG gradient.

## Fonts

- Loaded from Google Fonts: **Cinzel Decorative**, **Manrope** and **Work Sans**, each requested in all 18 weight and italic variants.
- Self-hosted by Elementor: Roboto, Roboto Slab and Poppins, loaded over **`http://`** (mixed content, 3 stylesheets per page).
- Articles also uses Playfair Display and Assistant.
- Three icon fonts are loaded as well. In practice the design uses Cinzel Decorative (headings) and Manrope (body).

## SEO, per page

| Page | Title | Meta description | Canonical | Robots | H1 count | og:image |
|---|---|---|---|---|---|---|
| Home | "Mandragola Ltd" (brand only) | yes (136 chars) | ok | index,follow | **28** | no |
| Our Mission | "Our Mission - Mandragola Ltd" | **missing** | ok | index,follow | 7 | no |
| Expertise | "Expertise - Mandragola Ltd" | **missing** | ok | index,follow | 6 (title duplicated) | yes |
| Transactions | "Transactions - Mandragola Ltd" | **missing** | ok | index,follow | 2 (1 hidden) | no |
| Values | "Values - Mandragola Ltd" | **missing** | ok | index,follow | 7 | no |
| Articles | "Articles - Mandragola Ltd" | **missing** | ok | index,follow | 6 | no |
| /mandragola/ | "Mandragola Landing - Mandragola Ltd" | **missing** | ok | index,follow | **0** (H2 only) | yes |
| /our-mission-about-new/ | "Page not found" | – | none | noindex | 1 | – |

**Heading outline**
- Every heading, including stat numbers ("100+", "Billions") and card titles, is an `<h1>`. There are no H2 or H3 levels, so the document has no outline.
- The H4 elements are footer labels.
- Headings are duplicated for desktop and mobile variants (for example "Experience that extends beyond capital" appears twice).
- Without Yoast's meta description, `og:description` falls back to the first body text, which is truncated and contains stray zero-width characters.

**Structured data (JSON-LD via Yoast)**
- It is present: WebPage, BreadcrumbList, WebSite and Organization.
- Organization `name` is lowercase ("mandragola ltd"). Its logo points to the old `2025/09/MandragolaLogo-New.svg`, and `sameAs` lists only a LinkedIn URL that still carries a `trk=` tracking parameter.
- WebSite `description` is empty.
- On the home page, `primaryImageOfPage` is the decorative gold underline (`MarkerLine-Element.svg`).
- No `PostalAddress`, `email` or `contactPoint` is present, even though the footer shows them.
- No Twitter Card meta on any page.

## Broken links and content hygiene

- The home hero CTA "Our Mission" links to **`/our-mission-about-new/`, which returns a 404** and opens in a new tab. The rebuild points it to `/our-mission/`.
- A hidden "Discover Management Team" button links to `/mandragola/untitled-design/` (a WP attachment page).
- The home page ships a hidden team section with **placeholder people** ("Amanda Miler", "John Smith", "Elizabeth Williams" ×3) and a stock photo. Crawlers still read it.
- The LinkedIn footer `href` repeats the same URL **three times concatenated**, which makes the link invalid.
- The "Privacy Policy" and "Terms of Use" footer items are plain text, not links. There is no actual policy page.
- "Contact Us" exists only as an Elementor popup hash link (`#elementor-action…`). There is no crawlable contact page.
- The legacy `/mandragola/` landing page is still indexable and **contradicts** the transactions page: it lists "DFSL & BiomX (NYSE:PHGE)", while the transactions page says DFSL is being acquired by Tessera.
- Typos and casing errors: "wHere Capital meets", "bootstraping", "$253 Millions", "non binding", "web site , social media ,".

## Accessibility

- **Images missing alt:** 25 of 26 on Home, 22 of 23 on Transactions, 7 of 8 on Expertise, and 5–9 on each other page. Every partner logo, both Mandragola logos and the decorative SVGs have `alt=""`. The only image with alt text on each page is OneTap's flag.
- **Contrast:** grey #3A3A3A logos and light-grey body copy sit on #F5F5F5 card backgrounds.
- **Motion:** every widget uses `elementor-invisible` plus fadeIn, so content is hidden until JavaScript runs and the animations ignore `prefers-reduced-motion`.
- **Overlay instead of native accessibility:** the OneTap toolbar offers font size, contrast and similar controls on top of the markup rather than fixing the markup itself (heading levels, alt text, focus order, a real contact form). Overlays do not satisfy WCAG, and they add JS, CSS and DOM weight to every page.
- The skip link exists, but the toolbar and popup add many focusable elements before the main content.
