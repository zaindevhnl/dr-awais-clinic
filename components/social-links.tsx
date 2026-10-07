import type { ComponentType, SVGProps } from "react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "@/components/social-icons";
import type { SocialKey, SocialLink } from "@/lib/social";

const ICONS: Record<SocialKey, ComponentType<SVGProps<SVGSVGElement>>> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
  youtube: YoutubeIcon,
};

/**
 * The practice's social profiles as real links, opening in a new tab. Build
 * `links` with socialLinks() from lib/social; each call site only supplies its
 * own styling, so every icon row on the site points at the same saved URLs.
 */
export function SocialLinks({
  links,
  className = "flex items-center gap-3",
  itemClassName,
  iconClassName = "w-4 h-4",
}: {
  links: SocialLink[];
  className?: string;
  itemClassName: string;
  iconClassName?: string;
}) {
  if (links.length === 0) return null;

  return (
    <ul className={className}>
      {links.map(({ key, label, href }) => {
        const Icon = ICONS[key];
        return (
          <li key={key}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${label} (opens in a new tab)`}
              title={label}
              className={itemClassName}
            >
              <Icon className={iconClassName} aria-hidden="true" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
