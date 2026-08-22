import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getSettings } from "@/lib/data";
import { SITE, telHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Appointment request received",
  robots: { index: false, follow: false },
};

export default async function AppointmentSuccessPage({
  searchParams,
}: PageProps<"/appointment/success">) {
  const params = await searchParams;
  const reference = typeof params.ref === "string" ? params.ref : "—";
  const settings = await getSettings();

  return (
    <section className="section">
      <div className="container-page max-w-2xl">
        <Card>
          <CardContent className="text-center">
            <CheckCircle2
              className="mx-auto size-14 text-primary"
              aria-hidden="true"
            />
            <h1 className="mt-5 text-3xl font-bold">Request received</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Thank you. The clinic will contact you to confirm your slot. Please
              keep your reference number.
            </p>

            <p className="mt-6 rounded-xl bg-secondary px-6 py-4 font-heading text-2xl font-bold tracking-wide">
              {reference}
            </p>

            <p className="mt-6 text-muted-foreground">
              This is a request, not a confirmed booking. For an emergency, call{" "}
              {SITE.emergencyLabel} ({SITE.emergencyNumber}).
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild>
                <Link href="/">Back to home</Link>
              </Button>
              <Button asChild variant="outline">
                <a href={telHref(settings.phone)}>Call the clinic</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
