import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Phone, Download, Stethoscope, Droplets } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "@/components/social-icons";
import { Markdown } from "@/components/markdown";
import { JsonLd, breadcrumbLd } from "@/components/seo/json-ld";
import { getServiceBySlug, getServices, getPublishedServiceSlugs } from "@/lib/data";
import { serviceImage } from "@/lib/clone-content";

export const revalidate = 3600;

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2070&auto=format&fit=crop";

export async function generateStaticParams() {
  const slugs = await getPublishedServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: "Service not found" };

  return {
    title: service.title,
    description: service.short_description ?? undefined,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: service.title,
      description: service.short_description ?? undefined,
      url: `/services/${service.slug}`,
      images: [service.image_url || "/placeholder-wide.svg"],
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const [service, services] = await Promise.all([getServiceBySlug(slug), getServices()]);
  if (!service) notFound();

  const categories = services.filter((s) => s.slug !== service.slug).slice(0, 4);

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#F9FAFB]">
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ])}
      />

      <section className="py-12 sm:py-16 lg:py-10 max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-24 w-full">
        <div className="flex flex-col lg:flex-row gap-10 sm:gap-12">
          {/* Left Side: Main Content */}
          <div className="w-full lg:w-[65%] space-y-10 sm:space-y-12">
            {/* Header Text */}
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-2xl sm:text-3xl md:text-[42px] font-semibold text-[#1A1A1A] leading-tight">
                {service.title}
              </h1>
              <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
                {service.short_description}
              </p>
            </div>

            {/* Main Image */}
            <div className="rounded-2xl sm:rounded-[40px] overflow-hidden shadow-xl bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={serviceImage(service.slug, service.image_url) || FALLBACK_IMAGE}
                alt={service.title}
                className="w-full h-[220px] sm:h-[320px] md:h-[450px] object-cover"
              />
            </div>

            {/* Detailed Description */}
            {service.body && (
              <div className="prose-clinic text-gray-500 text-base sm:text-lg leading-relaxed max-w-none">
                <Markdown>{service.body}</Markdown>
              </div>
            )}

            {/* Holistic Health Section */}
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl md:text-[32px] font-semibold text-[#1A1A1A]">
                Holistic Health Consultations
              </h2>
              <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
                Medical services are an essential part of our lives, offering care and treatment for
                various health conditions. These services encompass a wide range of specialties,
                including primary care, pediatrics, cardiology.
              </p>
              <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
                Medical services are an essential part of our lives, offering care and treatment for
                various health conditions. These services are an essential part of our lives,
                offering care and treatment for various health conditions.
              </p>
            </div>

            {/* Health Matters Section */}
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-xl sm:text-2xl md:text-[32px] font-semibold text-[#1A1A1A]">
                Health Matters We Care
              </h2>
              <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
                Medical services are an essential part of our lives, offering care and treatment for
                various health conditions. These services are an essential part of our lives,
                offering care and treatment for various health conditions.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                <div className="space-y-3 sm:space-y-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100">
                    <Stethoscope className="w-6 h-6 sm:w-7 sm:h-7 text-[#1A1A1A]" />
                  </div>
                  <h3 className="text-lg sm:text-[20px] font-semibold text-[#1A1A1A]">
                    Wellness Oasis CarePoint Health the Institute Thrive Wellness Hub
                  </h3>
                  <p className="text-gray-500 text-sm sm:text-base">
                    Health care is a vital aspect maintaining overall well-being, encompassing a
                    range
                  </p>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100">
                    <Droplets className="w-6 h-6 sm:w-7 sm:h-7 text-[#1A1A1A]" />
                  </div>
                  <h3 className="text-lg sm:text-[20px] font-semibold text-[#1A1A1A]">
                    Where health meets hope Your health partner in wellness
                  </h3>
                  <p className="text-gray-500 text-sm sm:text-base">
                    Health care is a vital aspect maintaining overall well-being, encompassing a
                    range
                  </p>
                </div>
              </div>
            </div>

            {/* Partnering Section */}
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl md:text-[32px] font-semibold text-[#1A1A1A]">
                Partnering for Better Health
              </h2>
              <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
                Medical services are an essential part of our lives, offering care and treatment for
                various health conditions. These services are an essential part of our lives,
                offering care and treatment for various health conditions.
              </p>
            </div>
          </div>

          {/* Right Side: Sidebar */}
          <div className="w-full lg:w-[35%] space-y-8 sm:space-y-10">
            {/* Services Category List */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-[30px] shadow-sm border border-gray-50">
              <h2 className="text-xl sm:text-[24px] font-semibold text-[#1A1A1A] mb-6 sm:mb-8">
                Services
              </h2>
              <div className="space-y-3 sm:space-y-4">
                {categories.map((cat, i) => (
                  <Link
                    key={cat.slug}
                    href={`/services/${cat.slug}`}
                    className="flex items-center justify-between p-4 sm:p-5 bg-[#F9FAFB] rounded-2xl hover:bg-[#00A78E] group cursor-pointer transition-all duration-300"
                  >
                    <div className="flex items-center space-x-3">
                      <ChevronRight className="w-5 h-5 text-[#00A78E] group-hover:text-white shrink-0" />
                      <span className="font-semibold text-[#1A1A1A] group-hover:text-white text-sm sm:text-base">
                        {cat.title}
                      </span>
                    </div>
                    <span className="text-gray-400 group-hover:text-white/80 font-semibold shrink-0">
                      ({String(i + 1).padStart(2, "0")})
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Need Help Card */}
            <div className="bg-white p-6 sm:p-10 rounded-2xl sm:rounded-[30px] shadow-sm border border-gray-50 text-center space-y-6 sm:space-y-8">
              <h2 className="text-xl sm:text-[24px] font-semibold text-[#1A1A1A]">
                Need Help? Call Us
              </h2>
              <a
                href="tel:+923003968500"
                aria-label="Call the clinic"
                className="w-16 h-16 sm:w-20 sm:h-20 bg-[#00A78E] rounded-full flex items-center justify-center mx-auto shadow-lg shadow-[#00A78E]/20"
              >
                <Phone className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </a>
              <p className="text-gray-500 font-medium text-sm sm:text-base">
                Health care is a vital aspect of maintaining overall well-being, encompassing a
                range of services from preventive care
              </p>
              <p className="text-xl sm:text-[28px] font-semibold text-[#1A1A1A]">+92 300 3968500</p>
            </div>

            {/* Doctor Profile Card */}
            <div className="bg-white p-6 sm:p-10 rounded-2xl sm:rounded-[30px] shadow-sm border border-gray-50 text-center space-y-5 sm:space-y-6">
              <div className="w-32 h-32 sm:w-48 sm:h-48 mx-auto rounded-full overflow-hidden border-4 sm:border-8 border-[#E0F2F1]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/clone/imm.jpg"
                  alt="Dr. Awais Malik"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl sm:text-[24px] font-semibold text-[#1A1A1A]">
                  Dr. Awais Malik
                </h2>
                <p className="text-gray-400 font-semibold text-xs sm:text-sm uppercase tracking-wider mt-1">
                  Laparoscopic and Bariatric Surgeon
                </p>
              </div>
              <div className="flex items-center justify-center space-x-3 sm:space-x-4 pt-2">
                {[FacebookIcon, InstagramIcon, TwitterIcon, LinkedinIcon].map((IconCmp, i) => (
                  <span
                    key={i}
                    className="w-9 h-9 sm:w-10 sm:h-10 bg-[#F9FAFB] rounded-full flex items-center justify-center text-gray-400 hover:bg-[#00A78E] hover:text-white transition-all cursor-pointer"
                  >
                    <IconCmp className="w-4 h-4 sm:w-5 sm:h-5" />
                  </span>
                ))}
              </div>
            </div>

            {/* Download Files */}
            <div className="space-y-4">
              {["Patient Guide", "Pre-Operative Checklist"].map((file) => (
                <div
                  key={file}
                  className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-[25px] flex items-center justify-between border border-gray-50 hover:shadow-lg transition-all cursor-pointer group"
                >
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#F9FAFB] rounded-full flex items-center justify-center group-hover:bg-[#00A78E] transition-colors shrink-0">
                      <Download className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs sm:text-sm font-semibold">(1.5Mb)</p>
                      <h3 className="text-[#1A1A1A] font-semibold text-sm sm:text-base">{file}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
