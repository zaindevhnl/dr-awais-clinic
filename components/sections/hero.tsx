import Image from "next/image";
import Link from "next/link";
import { CalendarPlus, Phone, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE, telHref } from "@/lib/site";
import type { SiteSettings } from "@/types/database.types";

export function Hero({ settings }: { settings: SiteSettings }) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-surface">
      <div className="container-page grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-sm font-medium">
            <ShieldCheck className="size-4 text-primary" aria-hidden="true" />
            {SITE.specialty} · {SITE.city}
          </p>

          <h1 className="mt-6 text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
            {SITE.doctorName}
          </h1>
          <p className="mt-2 text-lg font-medium text-primary">
            {SITE.credentials}
          </p>

          <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
            {settings.hero_headline}
          </p>
          <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
            {settings.hero_subheadline}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="text-base">
              <Link href="/appointment">
                <CalendarPlus className="size-5" aria-hidden="true" />
                Book appointment
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base">
              <a href={telHref(settings.phone)}>
                <Phone className="size-5" aria-hidden="true" />
                Call {settings.phone}
              </a>
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div
            className="absolute -inset-4 -z-10 rounded-[2rem] bg-primary/10 blur-2xl"
            aria-hidden="true"
          />
          <Image
            src="/placeholder-portrait.svg"
            alt={`Portrait of ${SITE.doctorName}`}
            width={800}
            height={1000}
            priority
            sizes="(max-width: 1024px) 90vw, 420px"
            className="w-full rounded-3xl border border-border object-cover shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
