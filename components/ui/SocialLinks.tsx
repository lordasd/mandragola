import type { SiteContent } from "@/content/types";
import { cn } from "@/lib/cn";
import { socialIcons } from "./icons";

/** Brand names, identical in every locale; used as each icon link's accessible name. */
const networkName: Record<SiteContent["social"][number]["network"], string> = {
  linkedin: "LinkedIn",
  facebook: "Facebook",
  x: "X",
};

interface SocialLinksProps {
  links: SiteContent["social"];
  /** Name the list: a visible heading's id, or a label when there is none. */
  labelledBy?: string;
  label?: string;
  /** Layout extras (margin, gap). */
  className?: string;
}

/** Round icon links to the company's social profiles (new tab). Sits on ink surfaces. */
export function SocialLinks({ links, labelledBy, label, className }: SocialLinksProps) {
  if (links.length === 0) return null;
  return (
    <ul aria-labelledby={labelledBy} aria-label={labelledBy ? undefined : label} className={cn("flex flex-wrap", className)}>
      {links.map(({ network, href }) => {
        const Icon = socialIcons[network];
        return (
          <li key={href}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={networkName[network]}
              className="inline-flex size-11 items-center justify-center rounded-full border border-on-ink/60 text-on-ink motion-safe:transition-colors motion-safe:duration-150 hover:border-gold hover:text-gold"
            >
              <Icon size={20} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
