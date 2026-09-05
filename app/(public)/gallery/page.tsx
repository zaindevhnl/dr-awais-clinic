import type { Metadata } from "next";
import { GallerySection } from "@/components/clone/gallery-section";
import { AppointmentSection } from "@/components/clone/appointment-section";
import { JsonLd, breadcrumbLd } from "@/components/seo/json-ld";
import { getContent } from "@/lib/content";
import type { AppointmentContent } from "@/components/clone/appointment-section";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Inside the theatre — surgical facilities, laparoscopic procedures and patient care at the practice of Dr. Awais Malik in Lahore.",
  alternates: { canonical: "/gallery" },
  openGraph: { url: "/gallery", images: ["/placeholder-wide.svg"] },
};

export default async function GalleryPage() {
  const appointment = await getContent<AppointmentContent>("appointment");

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Gallery", path: "/gallery" },
        ])}
      />
      <GallerySection />
      <AppointmentSection content={appointment} />
    </>
  );
}
