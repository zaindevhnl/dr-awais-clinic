import type { SiteSettings } from "@/types/database.types";
import { YOUTUBE } from "@/lib/youtube";

export type SocialKey = "facebook" | "instagram" | "linkedin" | "youtube";

export type SocialLink = { key: SocialKey; label: string; href: string };

/** Only absolute http(s) links are used, so a mistyped setting can't become a script URL. */
function safeHref(url: string | null | undefined) {
  const trimmed = url?.trim();
  return trimmed && /^https?:\/\//i.test(trimmed) ? trimmed : null;
}

/**
 * The practice's social profiles, in display order. Facebook, Instagram and
 * LinkedIn come from Site settings in the admin; YouTube is the channel the
 * Videos page already reads. A profile with no saved link is left out, so the
 * site never shows an icon that goes nowhere.
 */
export function socialLinks(
  settings: Pick<SiteSettings, "facebook_url" | "instagram_url" | "linkedin_url">,
): SocialLink[] {
  const candidates: { key: SocialKey; label: string; href: string | null }[] = [
    { key: "facebook", label: "Facebook", href: safeHref(settings.facebook_url) },
    { key: "instagram", label: "Instagram", href: safeHref(settings.instagram_url) },
    { key: "linkedin", label: "LinkedIn", href: safeHref(settings.linkedin_url) },
    { key: "youtube", label: "YouTube", href: safeHref(YOUTUBE.channelUrl) },
  ];
  return candidates.filter((c): c is SocialLink => c.href !== null);
}
