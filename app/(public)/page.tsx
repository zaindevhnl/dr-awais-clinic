import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { AboutPreview } from "@/components/sections/about-preview";
import { ServicesGrid } from "@/components/sections/services-grid";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { TestimonialsCarousel } from "@/components/sections/testimonials-carousel";
import { LatestPosts } from "@/components/sections/latest-posts";
import { BookingCta } from "@/components/sections/booking-cta";
import { FaqList } from "@/components/sections/faq-list";
import {
  getFaqs,
  getPosts,
  getServices,
  getSettings,
  getTestimonials,
} from "@/lib/data";
import { SITE } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: `${SITE.doctorName} — ${SITE.specialty} in ${SITE.city}`,
  description:
    "[Home page meta description placeholder — 150 characters describing the practice and how to book.]",
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE.doctorName} — ${SITE.specialty} in ${SITE.city}`,
    description: "[Home page OpenGraph description placeholder.]",
    url: "/",
    images: ["/placeholder-wide.svg"],
  },
};

export default async function HomePage() {
  const [settings, services, testimonials, { posts }, faqs] = await Promise.all([
    getSettings(),
    getServices(6),
    getTestimonials(),
    getPosts({ limit: 3 }),
    getFaqs(4),
  ]);

  return (
    <>
      <Hero settings={settings} />
      <TrustBar />
      <AboutPreview />
      <ServicesGrid services={services} />
      <WhyChooseUs />
      <TestimonialsCarousel testimonials={testimonials} />
      <LatestPosts posts={posts} />
      <BookingCta />
      <FaqList faqs={faqs} showAllLink />
    </>
  );
}
