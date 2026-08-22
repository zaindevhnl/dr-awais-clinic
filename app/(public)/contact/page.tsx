import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { Card, CardContent } from "@/components/ui/card";
import {
  JsonLd,
  breadcrumbLd,
  physicianLd,
} from "@/components/seo/json-ld";
import { getSettings } from "@/lib/data";
import { CLINIC_HOURS, SITE, telHref, whatsappHref } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Contact",
  description:
    "[Contact page meta description placeholder — address, phone, hours and how to reach the clinic.]",
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact", images: ["/placeholder-wide.svg"] },
};

export default async function ContactPage() {
  const settings = await getSettings();

  return (
    <>
      <JsonLd data={physicianLd(settings)} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <section className="border-b border-border bg-surface">
        <div className="container-page py-14 sm:py-16">
          <h1 className="text-4xl font-bold sm:text-5xl">Contact the clinic</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            [Placeholder intro — how quickly you respond and what to call about.]
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <Card>
              <CardContent className="space-y-5">
                <h2 className="text-xl font-semibold">Reach us</h2>
                <p className="flex items-start gap-3">
                  <MapPin className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
                  <span>{settings.address}</span>
                </p>
                <p className="flex items-center gap-3">
                  <Phone className="size-5 shrink-0 text-primary" aria-hidden="true" />
                  <a className="hover:underline" href={telHref(settings.phone)}>
                    {settings.phone}
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="size-5 shrink-0 text-primary" aria-hidden="true" />
                  <a className="hover:underline" href={`mailto:${settings.email}`}>
                    {settings.email}
                  </a>
                </p>
                {settings.whatsapp ? (
                  <p className="flex items-center gap-3">
                    <MessageCircle className="size-5 shrink-0 text-primary" aria-hidden="true" />
                    <a
                      className="hover:underline"
                      href={whatsappHref(settings.whatsapp)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp {settings.whatsapp}
                    </a>
                  </p>
                ) : null}
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <h2 className="text-xl font-semibold">Opening hours</h2>
                <table className="mt-4 w-full">
                  <caption className="sr-only">Clinic opening hours</caption>
                  <tbody>
                    {CLINIC_HOURS.map((row) => (
                      <tr key={row.day} className="border-b border-border/60">
                        <th scope="row" className="py-2.5 text-left font-medium">
                          {row.day}
                        </th>
                        <td className="py-2.5 text-right text-muted-foreground">
                          {row.hours}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="mt-5 text-sm text-muted-foreground">
                  Emergency? Call {SITE.emergencyLabel} ({SITE.emergencyNumber}).
                </p>
              </CardContent>
            </Card>

            <div className="overflow-hidden rounded-2xl border border-border">
              {settings.google_maps_embed ? (
                <div
                  className="[&>iframe]:h-72 [&>iframe]:w-full [&>iframe]:border-0"
                  dangerouslySetInnerHTML={{ __html: settings.google_maps_embed }}
                />
              ) : (
                <p className="p-6 text-muted-foreground">
                  [Paste your Google Maps embed code in /admin/settings to show a
                  map here.]
                </p>
              )}
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
