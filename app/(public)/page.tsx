import type { Metadata } from "next";
import { AboutSection } from "@/components/clone/about-section";
import { StatsSection } from "@/components/clone/stats-section";
import { FeaturesSection } from "@/components/clone/features-section";
import { SpecialFeatures } from "@/components/clone/special-features";
import { WhyChooseUs } from "@/components/clone/why-choose-us";
import { TeamImageSection } from "@/components/clone/team-image-section";
import { ProjectsSection } from "@/components/clone/projects-section";
import { GoogleReviews } from "@/components/clone/google-reviews";
import { BlogSection } from "@/components/clone/blog-section";
import { AppointmentSection } from "@/components/clone/appointment-section";
import { ScrollingBanner } from "@/components/clone/scrolling-banner";
import { getPosts } from "@/lib/data";
import { SITE } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: `${SITE.doctorName} — ${SITE.specialty} in ${SITE.city}`,
  description:
    "Precision surgery, trusted care. Prof. Dr. Awais Malik is an advanced laparoscopic and bariatric surgeon in Lahore with 10+ years of experience.",
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE.doctorName} — ${SITE.specialty} in ${SITE.city}`,
    description:
      "Advanced laparoscopic and bariatric surgery in Lahore. Book an appointment with Prof. Dr. Awais Malik.",
    url: "/",
    images: ["/placeholder-wide.svg"],
  },
};

export default async function HomePage() {
  const { posts } = await getPosts({ limit: 4 });

  return (
    <>
      <AboutSection />
      <StatsSection />
      <FeaturesSection />
      <SpecialFeatures />
      <WhyChooseUs />
      <TeamImageSection />
      <ProjectsSection />
      <GoogleReviews />
      <BlogSection posts={posts} />
      <AppointmentSection />
      <ScrollingBanner />
    </>
  );
}
