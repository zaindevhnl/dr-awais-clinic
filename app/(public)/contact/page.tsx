import type { Metadata } from "next";
import { ContactInfoCards } from "@/components/clone/contact-info-cards";
import { ContactFormSection } from "@/components/clone/contact-form-section";
import { ContactMap } from "@/components/clone/contact-map";
import { JsonLd, breadcrumbLd, physicianLd } from "@/components/seo/json-ld";
import { getSettings } from "@/lib/data";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Address, phone, email and map for the clinic of Dr. Awais Malik in Lahore — and a form to request an appointment.",
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact", images: ["/placeholder-wide.svg"] },
};

export default async function ContactPage() {
  const settings = await getSettings();

  const address = (settings.address ?? "Lahore, Pakistan")
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <JsonLd data={physicianLd(settings)} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      {/* Contact Info Cards (Address, Email, Phone) */}
      <ContactInfoCards
        address={address}
        email={settings.email ?? undefined}
        phone={settings.phone ?? undefined}
      />

      {/* Appointment Form Section with Doctor Card */}
      <ContactFormSection />

      {/* Google Map Section */}
      <ContactMap src={settings.google_maps_embed || undefined} />
    </div>
  );
}
