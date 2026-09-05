import type { Metadata } from "next";
import { ServicesGrid } from "@/components/clone/services-grid";
import { AppointmentSection } from "@/components/clone/appointment-section";
import { JsonLd, breadcrumbLd } from "@/components/seo/json-ld";
import { getContent } from "@/lib/content";
import type { AppointmentContent } from "@/components/clone/appointment-section";
import { getServices } from "@/lib/data";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Services",
  description:
    "Bariatric, metabolic and advanced laparoscopic procedures offered by Dr. Awais Malik in Lahore.",
  alternates: { canonical: "/services" },
  openGraph: { url: "/services", images: ["/placeholder-wide.svg"] },
};

export default async function ServicesPage() {
  const appointment = await getContent<AppointmentContent>("appointment");

  const services = await getServices();

  return (
    <div>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />

      {/* Services Grid Section */}
      <ServicesGrid services={services} />

      {/* Additional Services Info (CTA) */}
      <AppointmentSection content={appointment} />
    </div>
  );
}
