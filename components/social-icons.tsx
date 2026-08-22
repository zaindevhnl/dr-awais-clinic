import type { SVGProps } from "react";

/**
 * lucide-react no longer ships brand marks, so the three social glyphs the
 * footer needs live here as plain inline SVG.
 */
type IconProps = SVGProps<SVGSVGElement>;

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-2c0-.6.4-1 1-1z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LinkedinIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M6.94 8.5H4.06V20h2.88V8.5zM5.5 4a1.75 1.75 0 100 3.5 1.75 1.75 0 000-3.5zM20 20h-2.88v-6.06c0-1.45-.52-2.44-1.8-2.44-.98 0-1.56.67-1.82 1.31-.09.23-.11.55-.11.87V20H10.5s.04-9.66 0-11.5h2.88v1.63c.38-.6 1.07-1.45 2.6-1.45 1.9 0 3.32 1.25 3.32 3.94V20z" />
    </svg>
  );
}
