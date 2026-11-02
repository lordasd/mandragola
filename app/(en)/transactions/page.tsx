import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { transactions } from "@/content/transactions";
import { buildMetadata } from "@/lib/seo";

// Placeholder — replaced by the Transactions page agent.
export const metadata = buildMetadata({
  title: transactions.seo.title,
  description: transactions.seo.description,
  path: "/transactions",
});

export default function TransactionsPage() {
  return (
    <Container className="py-section-y">
      <Heading as="h1">{transactions.hero.title}</Heading>
    </Container>
  );
}
