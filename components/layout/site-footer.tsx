import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
} from "@/components/social-icons";
import { CLINIC_HOURS, PUBLIC_NAV, SITE, telHref, whatsappHref } from "@/lib/site";
import type { SiteSettings } from "@/types/database.types";

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  const socials = [
    { href: settings.facebook_url, label: "Facebook", Icon: FacebookIcon },
    { href: settings.instagram_url, label: "Instagram", Icon: InstagramIcon },
    { href: settings.linkedin_url, label: "LinkedIn", Icon: LinkedinIcon },
  ].filter((s) => Boolean(s.href));

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h2 className="font-heading text-lg font-bold">
            {settings.clinic_name}
          </h2>
          <p className="mt-3 flex items-start gap-2 text-muted-foreground">
            <MapPin className="mt-1 size-4 shrink-0" aria-hidden="true" />
            <span>{settings.address}</span>
          </p>
          <p className="mt-3 flex items-center gap-2">
            <Phone className="size-4 shrink-0" aria-hidden="true" />
            <a className="hover:underline" href={telHref(settings.phone)}>
              {settings.phone}
            </a>
          </p>
          <p className="mt-2 flex items-center gap-2">
            <Mail className="size-4 shrink-0" aria-hidden="true" />
            <a className="hover:underline" href={`mailto:${settings.email}`}>
              {settings.email}
            </a>
          </p>
          {settings.whatsapp ? (
            <p className="mt-2 flex items-center gap-2">
              <MessageCircle className="size-4 shrink-0" aria-hidden="true" />
              <a
                className="hover:underline"
                href={whatsappHref(settings.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat on WhatsApp
              </a>
            </p>
          ) : null}

          {socials.length > 0 ? (
            <ul className="mt-5 flex gap-3">
              {socials.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid size-10 place-items-center rounded-full border border-border transition-colors hover:bg-secondary"
                  >
                    <Icon className="size-4" aria-hidden="true" />
                    <span className="sr-only">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div>
          <h2 className="font-heading text-sm font-bold uppercase tracking-wide text-muted-foreground">
            Quick links
          </h2>
          <ul className="mt-4 space-y-2">
            {PUBLIC_NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/appointment" className="hover:underline">
                Book an appointment
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:underline">
                Privacy policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:underline">
                Terms of use
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-heading text-sm font-bold uppercase tracking-wide text-muted-foreground">
            Clinic hours
          </h2>
          <table className="mt-4 w-full text-[0.95rem]">
            <caption className="sr-only">Opening hours</caption>
            <tbody>
              {CLINIC_HOURS.map((row) => (
                <tr key={row.day} className="border-b border-border/60">
                  <th scope="row" className="py-2 text-left font-medium">
                    {row.day}
                  </th>
                  <td className="py-2 text-right text-muted-foreground">
                    {row.hours}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h2 className="font-heading text-sm font-bold uppercase tracking-wide text-muted-foreground">
            Find us
          </h2>
          <div className="mt-4 overflow-hidden rounded-xl border border-border">
            {settings.google_maps_embed ? (
              <div
                className="[&>iframe]:h-52 [&>iframe]:w-full [&>iframe]:border-0"
                // Admin-entered embed markup, rendered only for the map slot.
                dangerouslySetInnerHTML={{ __html: settings.google_maps_embed }}
              />
            ) : (
              <p className="p-4 text-sm text-muted-foreground">
                [Paste your Google Maps embed code in /admin/settings.]
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-2 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {settings.clinic_name}. All rights
            reserved.
          </p>
          <p>
            Medical emergency? Call {SITE.emergencyLabel} ({SITE.emergencyNumber}
            ) — this website is not for emergencies.
          </p>
        </div>
      </div>
    </footer>
  );
}
