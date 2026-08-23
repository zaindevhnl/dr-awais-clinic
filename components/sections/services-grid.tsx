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
                    <span className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary transition-colors duration-200 group-hover/service:bg-primary group-hover/service:text-primary-foreground">
                      <Icon name={service.icon} className="size-6" />
                    </span>

                    <h3 className="mt-6 text-xl font-semibold tracking-tight">
                      {service.title}
                    </h3>

                    <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">
                      {service.short_description}
                    </p>

                    {service.duration_minutes ? (
                      <p className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="size-4" aria-hidden="true" />
                        About {service.duration_minutes} minutes
                      </p>
                    ) : null}

                    <Link
                      href={`/services/${service.slug}`}
                      className="mt-6 inline-flex items-center gap-2 font-medium text-primary after:absolute after:inset-0 after:content-['']"
                    >
                      Learn more
                      <ArrowRight
                        className="size-4 transition-transform duration-200 ease-[var(--ease-out-soft)] group-hover/service:translate-x-1"
                        aria-hidden="true"
                      />
                      <span className="sr-only"> about {service.title}</span>
                    </Link>
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
