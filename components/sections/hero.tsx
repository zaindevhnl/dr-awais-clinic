import Image from "next/image";
import Link from "next/link";
import { CalendarPlus, Phone, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE, telHref } from "@/lib/site";
import type { SiteSettings } from "@/types/database.types";

export function Hero({ settings }: { settings: SiteSettings }) {
  return (
    <section className="relative isolate overflow-hidden bg-surface">
      {/* Ambient wash — decorative only, kept well below text contrast. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-40 -right-32 size-[36rem] rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute -bottom-56 -left-40 size-[32rem] rounded-full bg-cta/8 blur-3xl" />
      </div>

      <div className="container-page grid-12 items-center py-20 sm:py-28">
        <div className="col-span-4 sm:col-span-8 lg:col-span-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-caption font-semibold tracking-wide shadow-xs">
            <ShieldCheck className="size-4 text-primary" aria-hidden="true" />
            {SITE.specialty} · {SITE.city}
          </p>

          <h1 className="mt-8 text-5xl font-bold lg:text-6xl">
            {SITE.doctorName}
          </h1>
          <p className="mt-3 text-lg font-semibold text-primary">
            {SITE.credentials}
          </p>

          <p className="measure mt-8 text-xl leading-relaxed text-foreground/90">
            {settings.hero_headline}
          </p>
          <p className="measure mt-4 text-lg text-muted-foreground">
            {settings.hero_subheadline}
          </p>

          {/* One primary action; calling is deliberately subordinate. */}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="xl">
              <Link href="/appointment">
                <CalendarPlus aria-hidden="true" />
                Book appointment
              </Link>
            </Button>
            <Button asChild size="xl" variant="outline">
              <a href={telHref(settings.phone)}>
                <Phone aria-hidden="true" />
                Call {settings.phone}
              </a>
            </Button>
          </div>
        </div>

        <div className="col-span-4 sm:col-span-8 lg:col-span-5 lg:col-start-8">
          <div className="relative mx-auto w-full max-w-md">
            <div
              className="absolute -inset-3 -z-10 rounded-[2.5rem] bg-primary/10 blur-2xl"
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
      </div>
    </section>
  );
}
