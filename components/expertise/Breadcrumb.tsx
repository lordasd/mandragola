import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  /** Omit for the current page (last item). */
  href?: string;
}

/** Small visible breadcrumb trail. Last item is the current page (aria-current, not a link). */
export function Breadcrumb({ items, label, className }: { items: BreadcrumbItem[]; label: string; className?: string }) {
  return (
    <nav aria-label={label} className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-small text-muted">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-2">
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className="inline-flex min-h-6 items-center underline underline-offset-4 hover:text-ink focus-visible:text-ink"
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="font-semibold text-ink">
                  {item.label}
                </span>
              )}
              {!last && (
                <span aria-hidden="true" className="text-muted">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
