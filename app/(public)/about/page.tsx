import type { Metadata } from "next";
import { AboutSection } from "@/components/clone/about-section";
import { SpecialFeatures } from "@/components/clone/special-features";
import { StatsSection } from "@/components/clone/stats-section";
import { WhyChooseUs } from "@/components/clone/why-choose-us";
import { TestimonialsPriority } from "@/components/clone/testimonials-priority";
import { JsonLd, breadcrumbLd } from "@/components/seo/json-ld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About the doctor",
  description:
    "Prof. Dr. Awais Malik — advanced laparoscopic and bariatric surgeon in Lahore. Training, experience and approach to care.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about", images: ["/placeholder-wide.svg"] },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      <AboutSection />
      <SpecialFeatures />
      <StatsSection />
      <WhyChooseUs />
      <TestimonialsPriority />
    </div>
  );
}
