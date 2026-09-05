import type { Metadata } from "next";
import { PageHero } from "@/components/clone/page-hero";
import { DoctorProfile } from "@/components/clone/doctor-profile";
import { QualificationsSection } from "@/components/clone/qualifications-section";
import { HospitalsSection } from "@/components/clone/hospitals-section";
import { AppointmentSection } from "@/components/clone/appointment-section";
import { JsonLd, breadcrumbLd } from "@/components/seo/json-ld";
import { getContent } from "@/lib/content";
import type { AppointmentContent } from "@/components/clone/appointment-section";
import type { ProfileContent } from "@/components/clone/doctor-profile";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About the doctor",
  description:
    "Dr. Awais Malik — laparoscopic and bariatric surgeon in Lahore. Qualifications (MBBS, MS, MRCS, CHPE, ATLS), areas of practice, and the three hospitals where he operates.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about", images: ["/placeholder-wide.svg"] },
};

export default async function AboutPage() {
  const [profile, appointment] = await Promise.all([
    getContent<ProfileContent>("about.profile"),
    getContent<AppointmentContent>("appointment"),
  ]);

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      <PageHero title="About Dr. Awais Malik" breadcrumb="About Us" />

      {/* Who he is — portrait, biography, areas of practice */}
      <DoctorProfile content={profile} />

      {/* What the post-nominals actually certify */}
      <QualificationsSection />

      {/* Where he operates — one card per hospital, with directions */}
      <HospitalsSection />

      {/* Booking */}
      <AppointmentSection content={appointment} />
    </div>
  );
}
