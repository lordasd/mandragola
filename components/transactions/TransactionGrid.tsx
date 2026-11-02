import type { Transaction } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { TransactionCard, type TransactionCardLabels } from "./TransactionCard";

/** All transaction cards in content order: 1 / 2 (≥640) / 3 (≥1024) columns. */
export function TransactionGrid({
  items,
  labels,
  listLabel,
}: {
  items: Transaction[];
  labels: TransactionCardLabels;
  /** Accessible name of the list, e.g. the page title. */
  listLabel: string;
}) {
  return (
    <Container className="py-section-gap-half">
      <ul aria-label={listLabel} className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7.5">
        {items.map((item) => (
          <li key={item.id}>
            <TransactionCard item={item} labels={labels} />
          </li>
        ))}
      </ul>
    </Container>
  );
}
