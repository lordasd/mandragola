import Link from "next/link";
import { Container } from "@/components/ui/Container";

/** Visible breadcrumb trail; the last item is the current page. Mirrors breadcrumbLd data. */
export function Breadcrumb({ label, items }: { label: string; items: { name: string; path: string }[] }) {
  return (
    <Container as="nav" aria-label={label} className="pt-4">
      <ol className="flex flex-wrap items-center gap-x-2 text-small text-muted">
        {items.map((item, i) => {
          const current = i === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">/</span>}
              {current ? (
                <span aria-current="page" className="inline-flex min-h-6 items-center font-semibold text-ink">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.path}
                  className="inline-flex min-h-6 items-center underline hover:text-ink focus-visible:text-ink"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </Container>
  );
}
