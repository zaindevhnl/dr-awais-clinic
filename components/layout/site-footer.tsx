import Link from "next/link";
import { AlertTriangle, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
} from "@/components/social-icons";
import { CLINIC_HOURS, PUBLIC_NAV, SITE, telHref, whatsappHref } from "@/lib/site";
import type { SiteSettings } from "@/types/database.types";

/** Shared link treatment so every footer link animates identically. */
const linkClass =
  "inline-flex min-h-11 items-center rounded-xs text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline";

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  const socials = [
    { href: settings.facebook_url, label: "Facebook", Icon: FacebookIcon },
    { href: settings.instagram_url, label: "Instagram", Icon: InstagramIcon },
    { href: settings.linkedin_url, label: "LinkedIn", Icon: LinkedinIcon },
  ].filter((s) => Boolean(s.href));

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      {/* Brand column takes 4 of 12 so contact details get room to
          breathe; the three utility columns share the remainder. */}
      <div className="container-page grid-12 py-16 sm:py-20">
        <div className="col-span-4 sm:col-span-8 lg:col-span-4">
          <h2 className="font-heading text-lg font-bold tracking-tight">
            {settings.clinic_name}
          </h2>

          <address className="mt-4 text-sm not-italic">
            <p className="flex items-start gap-3 py-2 text-muted-foreground">
              <MapPin
                className="mt-0.5 size-4 shrink-0 text-primary"
                aria-hidden="true"
              />
              <span>{settings.address}</span>
            </p>
            <p className="flex items-center gap-3">
              <Phone className="size-4 shrink-0 text-primary" aria-hidden="true" />
              <a className={linkClass} href={telHref(settings.phone)}>
                {settings.phone}
              </a>
            </p>
            <p className="flex items-center gap-3">
              <Mail className="size-4 shrink-0 text-primary" aria-hidden="true" />
              <a className={linkClass} href={`mailto:${settings.email}`}>
                {settings.email}
              </a>
            </p>
            {settings.whatsapp ? (
              <p className="flex items-center gap-3">
                <MessageCircle
                  className="size-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <a
                  className={linkClass}
                  href={whatsappHref(settings.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat on WhatsApp
                </a>
              </p>
            ) : null}
          </address>

          {socials.length > 0 ? (
            <ul className="mt-6 flex gap-2">
              {socials.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid size-11 place-items-center rounded-full border border-border bg-background text-muted-foreground transition-colors duration-200 hover:border-primary/40 hover:bg-primary hover:text-primary-foreground"
                  >
                    <Icon className="size-4" aria-hidden="true" />
                    <span className="sr-only">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="col-span-4 sm:col-span-4 lg:col-span-2 lg:col-start-6">
          <h2 className="text-caption font-bold tracking-[0.12em] text-foreground uppercase">
            Quick links
          </h2>
          <ul className="mt-3 text-sm">
            {PUBLIC_NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/appointment" className={linkClass}>
                Book an appointment
              </Link>
            </li>
            <li>
              <Link href="/privacy" className={linkClass}>
                Privacy policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className={linkClass}>
                Terms of use
              </Link>
            </li>
          </ul>
        </div>

        <div className="col-span-4 sm:col-span-4 lg:col-span-3">
          <h2 className="text-caption font-bold tracking-[0.12em] text-foreground uppercase">
            Clinic hours
          </h2>
          <table className="mt-5 w-full text-sm">
            <caption className="sr-only">Opening hours</caption>
            <tbody>
              {CLINIC_HOURS.map((row) => (
                <tr
                  key={row.day}
                  className="border-b border-border last:border-0"
                >
                  <th scope="row" className="py-2.5 pr-3 text-left font-medium">
                    {row.day}
                  </th>
                  <td className="py-2.5 text-right text-muted-foreground tabular-nums">
                    {row.hours}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="col-span-4 sm:col-span-8 lg:col-span-3">
          <h2 className="text-caption font-bold tracking-[0.12em] text-foreground uppercase">
            Find us
          </h2>
          <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-background shadow-xs">
            {settings.google_maps_embed ? (
              <div
                className="[&>iframe]:h-52 [&>iframe]:w-full [&>iframe]:border-0"
                // Admin-entered embed markup, rendered only for the map slot.
                dangerouslySetInnerHTML={{ __html: settings.google_maps_embed }}
              />
            ) : (
              <p className="p-5 text-sm text-muted-foreground">
                [Paste your Google Maps embed code in /admin/settings.]
              </p>
            )}
          </div>
        </div>
      </div>

      {/* The emergency notice is safety copy, so it gets a warning
          treatment rather than sitting as grey fine print. */}
      <div className="border-t border-border bg-background">
        <div className="container-page flex flex-col gap-4 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} {settings.clinic_name}. All rights
            reserved.
          </p>
          <p className="flex items-start gap-2.5 rounded-lg bg-warning-subtle px-4 py-2.5 text-foreground">
            <AlertTriangle
              className="mt-0.5 size-4 shrink-0 text-warning"
              aria-hidden="true"
            />
            <span>
              Medical emergency? Call {SITE.emergencyLabel} (
              {SITE.emergencyNumber}) — this website is not for emergencies.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
