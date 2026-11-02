import type { SVGProps } from "react";

/*
 * Inline SVG icons (no icon dependency). Decorative by default: aria-hidden.
 * Directional icons (ArrowIcon) mirror in RTL via the rtl: variant.
 */
type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Svg({ size = 24, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Svg>
  );
}

/** Points toward the reading direction (right in LTR, left in RTL). */
export function ArrowIcon({ className = "", ...props }: IconProps) {
  return (
    <Svg className={`rtl:-scale-x-100 ${className}`} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </Svg>
  );
}

export function PinIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0114 0C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </Svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <Svg fill="currentColor" stroke="none" {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 11-.01 5 2.5 2.5 0 01.01-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.6 8.65 21 11.3 21 14.7V21h-4v-5.6c0-1.33-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95V21H9z" />
    </Svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <Svg fill="currentColor" stroke="none" {...props}>
      <path d="M13.5 21v-7.5H16l.5-3h-3V8.6c0-.87.3-1.6 1.6-1.6h1.6V4.3c-.3-.04-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4V10.5H8v3h2.5V21z" />
    </Svg>
  );
}

export function XIcon(props: IconProps) {
  return (
    <Svg fill="currentColor" stroke="none" {...props}>
      <path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77zm-1.08 16.17h1.7L7.4 4.73H5.58z" />
    </Svg>
  );
}

/* Feature icons keyed by content/types.ts Feature["icon"] */

export function CapitalIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3 20h18M5 20V10M9.5 20V10M14.5 20V10M19 20V10M2.5 10L12 4l9.5 6z" />
    </Svg>
  );
}

export function BuildingIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 21V5a1 1 0 011-1h9a1 1 0 011 1v16M15 9h4a1 1 0 011 1v11M3 21h18M8 8h3M8 12h3M8 16h3" />
    </Svg>
  );
}

export function RelationshipsIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="8" cy="8" r="3" />
      <circle cx="16.5" cy="9.5" r="2.5" />
      <path d="M2.5 20a5.5 5.5 0 0111 0M13.5 20a4 4 0 018 0" />
    </Svg>
  );
}

export function SourcingIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="M15 15l5.5 5.5M8 10.5h5M10.5 8v5" />
    </Svg>
  );
}

export const featureIcons = {
  capital: CapitalIcon,
  building: BuildingIcon,
  relationships: RelationshipsIcon,
  sourcing: SourcingIcon,
} as const;

export const socialIcons = {
  linkedin: LinkedInIcon,
  facebook: FacebookIcon,
  x: XIcon,
} as const;
