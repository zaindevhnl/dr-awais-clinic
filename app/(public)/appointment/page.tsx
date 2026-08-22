import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppointmentForm } from "@/components/forms/appointment-form";
import { JsonLd, breadcrumbLd } from "@/components/seo/json-ld";
import {
  getAvailableSlots,
  getBlockedDates,
  getServices,
  getSettings,
} from "@/lib/data";
import { SITE, telHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book an appointment",
  description:
    "[Booking page meta description placeholder — how to request an appointment online.]",
  alternates: { canonical: "/appointment" },
  openGraph: { url: "/appointment", images: ["/placeholder-wide.svg"] },
};

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

export default async function AppointmentPage({
  searchParams,
}: PageProps<"/appointment">) {
  const params = await searchParams;
  const rawDate = typeof params.date === "string" ? params.date : "";
  const selectedDate = /^\d{4}-\d{2}-\d{2}$/.test(rawDate) ? rawDate : todayIso();
  const selectedServiceId =
    typeof params.service === "string" ? params.service : undefined;

  const [services, slots, blockedDates, settings] = await Promise.all([
    getServices(),
    getAvailableSlots(selectedDate),
    getBlockedDates(),
    getSettings(),
  ]);

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Book an appointment", path: "/appointment" },
        ])}
      />

      <section className="border-b border-border bg-surface">
        <div className="container-page py-14 sm:py-16">
          <h1 className="text-4xl font-bold sm:text-5xl">Book an appointment</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Choose a date and time, tell us how to reach you, and the clinic will
            confirm your slot. Prefer to speak to someone?
          </p>
          <Button asChild variant="outline" size="lg" className="mt-6">
            <a href={telHref(settings.phone)}>
              <Phone className="size-5" aria-hidden="true" />
              Call {settings.phone}
            </a>
          </Button>
        </div>
      </section>

      <section className="section">
        <div className="container-page max-w-3xl">
          <AppointmentForm
            services={services}
            slots={slots}
            selectedDate={selectedDate}
            selectedServiceId={selectedServiceId}
            blockedDates={blockedDates}
            today={todayIso()}
          />
          <p className="mt-8 text-sm text-muted-foreground">
            We store only your name, phone number, optional email and the note you
            write. See our{" "}
            <a href="/privacy" className="underline">
              privacy policy
            </a>
            . In an emergency, call {SITE.emergencyLabel} ({SITE.emergencyNumber}).
          </p>
        </div>
      </section>
    </>
  );
}
