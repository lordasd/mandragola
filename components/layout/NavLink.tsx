"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentPropsWithoutRef } from "react";

type NavLinkProps = Omit<ComponentPropsWithoutRef<typeof Link>, "href"> & { href: string };

/** Link that sets aria-current="page" when it matches the current route (hash links never do). */
export function NavLink({ href, ...props }: NavLinkProps) {
  const pathname = usePathname();
  const current = !href.includes("#") && href.startsWith("/") && pathname === href;
  return <Link href={href} aria-current={current ? "page" : undefined} {...props} />;
}
