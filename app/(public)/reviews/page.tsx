import type { Metadata } from "next";
import { GoogleReviews } from "@/components/clone/google-reviews";
import { TestimonialsPriority } from "@/components/clone/testimonials-priority";
import { JsonLd, breadcrumbLd } from "@/components/seo/json-ld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Patient Reviews",
  description:
    "What patients say about Prof. Dr. Awais Malik — verified Google reviews of bariatric, metabolic and laparoscopic surgery in Lahore.",
  alternates: { canonical: "/reviews" },
  openGraph: { url: "/reviews", images: ["/placeholder-wide.svg"] },
};

export default function ReviewsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Reviews", path: "/reviews" },
        ])}
      />
      <GoogleReviews />
      <TestimonialsPriority />
    </>
  );
}
