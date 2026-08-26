import type { Metadata } from "next";
import { ProjectsSection } from "@/components/clone/projects-section";
import { TestimonialsPriority } from "@/components/clone/testimonials-priority";
import { JsonLd, breadcrumbLd } from "@/components/seo/json-ld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Clinical programmes and initiatives led by Prof. Dr. Awais Malik — bariatric units, training, screening camps and patient support.",
  alternates: { canonical: "/projects" },
  openGraph: { url: "/projects", images: ["/placeholder-wide.svg"] },
};

export default function ProjectsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
        ])}
      />
      <ProjectsSection />
      <TestimonialsPriority />
    </>
  );
}
