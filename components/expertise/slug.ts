/**
 * Anchor id for an expertise area, derived from its title: the part before "&", kebab-cased.
 * "Capital Markets & Investment Expertise" and the home teaser's "Capital Markets" both -> "capital-markets",
 * so /expertise#<slug> links from the home page stay in sync with the row ids.
 */
export function expertiseSlug(title: string): string {
  return title
    .split("&")[0]
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
