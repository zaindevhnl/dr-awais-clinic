import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/icon";
import { Markdown } from "@/components/markdown";
import { JsonLd, breadcrumbLd } from "@/components/seo/json-ld";
import { getServiceBySlug, getServices } from "@/lib/data";
import { SITE } from "@/lib/site";

export const revalidate = 3600;

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: "Service not found" };

  return {
    title: service.title,
    description: service.short_description ?? undefined,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: service.title,
      description: service.short_description ?? undefined,
      url: `/services/${service.slug}`,
      images: [service.image_url || "/placeholder-wide.svg"],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ])}
      />

      <section className="border-b border-border bg-surface">
        <div className="container-page py-14 sm:py-16">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
            <Link href="/services" className="hover:underline">
              Services
            </Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">{service.title}</span>
          </nav>

          <span className="mt-6 grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Icon name={service.icon} className="size-7" />
          </span>
          <h1 className="mt-5 text-4xl font-bold sm:text-5xl">{service.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {service.short_description}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            {service.body ? (
              <Markdown>{service.body}</Markdown>
            ) : (
              <p className="text-muted-foreground">
                [Add the full description for this service in /admin/services.]
              </p>
            )}
          </div>

          <Card className="h-fit lg:sticky lg:top-24">
            <CardContent>
              <h2 className="text-lg font-semibold">Appointment details</h2>
              <ul className="mt-5 space-y-4 text-muted-foreground">
                {service.duration_minutes ? (
                  <li className="flex items-center gap-3">
                    <Clock className="size-5 text-primary" aria-hidden="true" />
                    About {service.duration_minutes} minutes
                  </li>
                ) : null}
                {service.price_from ? (
                  <li className="flex items-center gap-3">
                    <Wallet className="size-5 text-primary" aria-hidden="true" />
                    From {SITE.currency} {service.price_from}
                  </li>
                ) : null}
              </ul>
              <Button asChild className="mt-6 w-full">
                <Link href={`/appointment?service=${service.id}`}>
                  Book this service
                </Link>
              </Button>
              <p className="mt-4 text-sm text-muted-foreground">
                Not a medical emergency service. In an emergency call{" "}
                {SITE.emergencyNumber}.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
