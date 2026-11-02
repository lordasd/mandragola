import { CtaBand } from "@/components/sections/CtaBand";
import { StatsRow } from "@/components/sections/StatsRow";
import { TransactionGrid } from "@/components/transactions/TransactionGrid";
import { TransactionsHead } from "@/components/transactions/TransactionsHead";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { home } from "@/content/home";
import { site } from "@/content/site";
import { transactions } from "@/content/transactions";
import { ui } from "@/lib/i18n";
import { breadcrumbLd, buildMetadata, itemListLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: transactions.seo.title,
  description: transactions.seo.description,
  path: transactions.seo.path,
  // seo.title already ends with "— Mandragola Ltd"; skip the layout template.
  absoluteTitle: true,
});

const t = ui.en;

const linkLabel = (href: string) => site.footerLinks.find((l) => l.href === href)?.label ?? href;

const trail = [
  { name: linkLabel("/"), path: "/" },
  { name: linkLabel(transactions.seo.path), path: transactions.seo.path },
];

/** Lead split into 2 short paragraphs: all sentences but the last, then the last. */
function splitLead(text: string): string[] {
  const sentences = text.match(/[^.!?]+[.!?]+(\s|$)/g)?.map((s) => s.trim()) ?? [text];
  if (sentences.length < 2) return [text];
  return [sentences.slice(0, -1).join(" "), sentences[sentences.length - 1]];
}

const listLd = itemListLd(
  transactions.items.map((t) => ({
    name: `${t.parties.map((p) => p.name).join(" & ")} — ${t.type}`,
    description: t.summary,
  })),
  transactions.hero.title,
);

export default function TransactionsPage() {
  return (
    <>
      <JsonLd data={[breadcrumbLd(trail), listLd]} />
      <Container className="pt-4">
        <Breadcrumb label={t.breadcrumb} items={trail.map((c) => ({ label: c.name, href: c.path }))} />
      </Container>
      <TransactionsHead
        id="transactions-title"
        eyebrow={trail[1].name}
        title={transactions.hero.title}
        lead={splitLead(transactions.hero.body)}
      />
      <Container className="py-[calc(var(--spacing-section-gap)/2)]">
        <StatsRow stats={home.stats} />
      </Container>
      <TransactionGrid items={transactions.items} labels={t.transaction} listLabel={transactions.hero.title} />
      <CtaBand title={transactions.cta.title} body={transactions.cta.body} link={transactions.cta.link} />
    </>
  );
}
