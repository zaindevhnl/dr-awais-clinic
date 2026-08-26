import type { Metadata } from "next";
import { PageHero } from "@/components/clone/page-hero";
import { DoctorsList } from "@/components/clone/doctors-list";
import { JsonLd, breadcrumbLd } from "@/components/seo/json-ld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Our Doctors",
  description:
    "Meet the surgical team — Dr. Awais Malik, advanced laparoscopic and bariatric surgeon in Lahore.",
  alternates: { canonical: "/doctors" },
  openGraph: { url: "/doctors", images: ["/placeholder-wide.svg"] },
};

export default function DoctorsPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#F7F7F5]">
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Doctors", path: "/doctors" },
        ])}
      />
      <PageHero title="Our Doctors" breadcrumb="Doctors" />
      <DoctorsList />
    </div>
  );
}
