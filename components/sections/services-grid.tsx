import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/sections/section-heading";
import type { Service } from "@/types/database.types";

export function ServicesGrid({
  services,
  showHeading = true,
  showAllLink = true,
}: {
  services: Service[];
  showHeading?: boolean;
  showAllLink?: boolean;
}) {
  return (
    <section className="section bg-surface">
      <div className="container-page">
        {showHeading ? (
          <SectionHeading
            eyebrow="What we treat"
            title="Services"
            description="[One-sentence description of the range of services offered.]"
          />
        ) : null}

        {services.length === 0 ? (
          <p className="mt-12 text-center text-muted-foreground">
            No services published yet. Add them in{" "}
            <code className="rounded-sm bg-muted px-1.5 py-0.5">
              /admin/services
            </code>
            .
          </p>
        ) : (
          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Reveal as="li" key={service.id} delay={(i % 3) * 90}>
                {/* The whole card is the target: "Learn more" carries a
                    stretched link so the hit area is the full card,
                    while the tab stop stays on one element. */}
                <Card interactive className="group/service relative h-full">
                  <CardContent className="flex h-full flex-col">
                    <div className="flex items-start gap-4">
                      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary transition-colors duration-200 group-hover/service:bg-primary group-hover/service:text-primary-foreground">
                        <Icon name={service.icon} className="size-5" />
                      </span>
                      <h3 className="text-xl leading-snug font-semibold tracking-tight">
                        {service.title}
                      </h3>
                    </div>

                    <p className="mt-5 leading-relaxed text-muted-foreground">
                      {service.short_description}
                    </p>

                    {service.duration_minutes ? (
                      <p className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="size-4" aria-hidden="true" />
                        About {service.duration_minutes} minutes
                      </p>
                    ) : null}

                    {/* Illustration is optional — a service without one keeps
                        the same card rhythm rather than leaving a gap. */}
                    {service.image_url ? (
                      <div className="relative mt-6 aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted">
                        <Image
                          src={service.image_url}
                          alt=""
                          fill
                          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 360px"
                          className="object-cover transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover/service:scale-[1.03] motion-reduce:transform-none"
                        />
                      </div>
                    ) : null}

                    {/* Pushed to the bottom so CTAs align across a row of
                        cards with unequal description lengths. */}
                    <div className="mt-6 flex flex-1 items-end justify-center">
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-background px-5 text-sm font-medium shadow-xs transition-colors duration-200 hover:border-primary/40 hover:bg-accent hover:text-accent-foreground after:absolute after:inset-0 after:content-['']"
                      >
                        Learn more
                        <ArrowRight
                          className="size-4 transition-transform duration-200 ease-[var(--ease-out-soft)] group-hover/service:translate-x-1"
                          aria-hidden="true"
                        />
                        <span className="sr-only"> about {service.title}</span>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </ul>
        )}

        {showAllLink ? (
          <div className="mt-14 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/services">View all services</Link>
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
