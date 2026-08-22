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
          <p className="mt-10 text-center text-muted-foreground">
            No services published yet. Add them in{" "}
            <code className="rounded bg-muted px-1.5 py-0.5">
              /admin/services
            </code>
            .
          </p>
        ) : (
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Reveal as="li" key={service.id} delay={(i % 3) * 90}>
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardContent className="flex h-full flex-col">
                    <span className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                      <Icon name={service.icon} className="size-6" />
                    </span>
                    <h3 className="mt-5 text-xl font-semibold">
                      {service.title}
                    </h3>
                    <p className="mt-2 flex-1 text-muted-foreground">
                      {service.short_description}
                    </p>
                    {service.duration_minutes ? (
                      <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Clock className="size-4" aria-hidden="true" />
                        About {service.duration_minutes} minutes
                      </p>
                    ) : null}
                    <Link
                      href={`/services/${service.slug}`}
                      className="mt-5 inline-flex items-center gap-1.5 font-medium text-primary hover:underline"
                    >
                      Learn more
                      <ArrowRight className="size-4" aria-hidden="true" />
                      <span className="sr-only"> about {service.title}</span>
                    </Link>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </ul>
        )}

        {showAllLink ? (
          <div className="mt-12 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/services">View all services</Link>
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
