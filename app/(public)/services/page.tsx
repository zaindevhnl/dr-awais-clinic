import type { Metadata } from "next";
import { ServicesGrid } from "@/components/sections/services-grid";
import { JsonLd, breadcrumbLd } from "@/components/seo/json-ld";
import { getServices } from "@/lib/data";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Services",
  description:
    "[Services page meta description placeholder — the consultations and procedures offered.]",
  alternates: { canonical: "/services" },
  openGraph: { url: "/services", images: ["/placeholder-wide.svg"] },
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />

      <section className="border-b border-border bg-surface">
        <div className="container-page py-16 text-center sm:py-20">
          <h1 className="text-4xl font-bold sm:text-5xl">Services</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            [Intro paragraph placeholder describing the range of care offered and
            how to choose the right appointment type.]
          </p>
        </div>
      </section>

      <ServicesGrid services={services} showHeading={false} showAllLink={false} />
    </>
  );
}
