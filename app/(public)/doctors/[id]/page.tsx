import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HeartPulse } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "@/components/social-icons";
import { JsonLd, breadcrumbLd } from "@/components/seo/json-ld";
import { DoctorMessageForm } from "@/components/clone/doctor-message-form";
import { DOCTORS, getDoctor } from "@/lib/clone-content";

export const revalidate = 3600;

export function generateStaticParams() {
  return DOCTORS.map((doctor) => ({ id: doctor.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/doctors/[id]">): Promise<Metadata> {
  const { id } = await params;
  const doctor = getDoctor(id);
  if (!doctor) return { title: "Doctor not found" };

  return {
    title: doctor.name,
    description: doctor.description,
    alternates: { canonical: `/doctors/${doctor.id}` },
    openGraph: { url: `/doctors/${doctor.id}`, images: [doctor.image] },
  };
}

export default async function DoctorDetailsPage({ params }: PageProps<"/doctors/[id]">) {
  const { id } = await params;
  const doctor = getDoctor(id);
  if (!doctor) notFound();

  const infoItems = [
    { label: "Expertise", value: doctor.expertise },
    { label: "Education", value: doctor.education.join(", ") },
    { label: "Experience", value: doctor.experience.join(", ") },
    { label: "Specialization", value: doctor.specialization.join(", ") },
    { label: "Working Hours", value: doctor.workingHours },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#F7F7F5]">
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Doctors", path: "/doctors" },
          { name: doctor.name, path: `/doctors/${doctor.id}` },
        ])}
      />

      <section className="py-16 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 w-full">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Left Column */}
          <div className="lg:w-[65%] space-y-8">
            {/* Name & Bio */}
            <div>
              <h1 className="text-[38px] font-semibold text-[#0A0A0A] leading-tight mb-3">
                {doctor.name}
              </h1>
              <span className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-widest uppercase text-[#00A78E] bg-[#E8FAF5] px-3 py-1.5 rounded-full mb-4">
                <HeartPulse className="w-3 h-3" />
                {doctor.expertise}
              </span>
              <p className="text-gray-500 text-[15px] leading-[1.8]">{doctor.biography}</p>
            </div>

            {/* Info Table */}
            <div className="bg-white border border-[#E8E8E4] rounded-2xl overflow-hidden">
              {infoItems.map((item, i) => (
                <div
                  key={i}
                  className="flex items-stretch border-b border-[#F0F0EE] last:border-b-0"
                >
                  <div className="w-[140px] shrink-0 border-r border-[#F0F0EE] px-4 py-4 flex items-center">
                    <span className="text-[10px] font-semibold tracking-widest uppercase text-[#0A0A0A]">
                      {item.label}
                    </span>
                  </div>
                  <div className="px-4 py-4 flex items-center">
                    <span className="text-[13px] font-medium text-[#8A8A82]">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <DoctorMessageForm />
          </div>

          {/* Right Column */}
          <div className="lg:w-[35%] space-y-4 lg:sticky lg:top-24">
            {/* Profile Card */}
            <div className="bg-white border border-[#E8E8E4] rounded-2xl overflow-hidden">
              <div className="relative bg-[#0A0A0A]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover object-top"
                />
                <span className="absolute bottom-3 left-3 bg-[#00A78E] text-[#F7F7F5] text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
                  Available
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-[20px] font-semibold text-[#0A0A0A] mb-1">{doctor.name}</h3>
                <p className="text-[10px] font-semibold tracking-widest uppercase text-[#00A78E] mb-4">
                  {doctor.expertise}
                </p>
                <div className="flex gap-2">
                  {[FacebookIcon, InstagramIcon, TwitterIcon, LinkedinIcon].map((IconCmp, i) => (
                    <span
                      key={i}
                      className="w-8 h-8 rounded-full border border-[#E8E8E4] bg-[#F7F7F5] flex items-center justify-center text-gray-400 hover:bg-[#00A78E] hover:text-white hover:border-[#00A78E] transition-all"
                    >
                      <IconCmp className="w-3.5 h-3.5" />
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { num: "10+", label: "Years exp." },
                { num: "2.4k", label: "Patients" },
                { num: "4.9", label: "Rating" },
                { num: "98%", label: "Success rate" },
              ].map((s, i) => (
                <div key={i} className="bg-white border border-[#E8E8E4] rounded-xl p-4 text-center">
                  <div className="text-[26px] font-semibold text-[#0A0A0A] leading-none">
                    {s.num}
                  </div>
                  <div className="text-[10px] font-semibold tracking-widest uppercase text-[#B0B0A8] mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Schedule Card */}
            <div className="bg-white border border-[#E8E8E4] rounded-2xl p-5 space-y-4">
              <div>
                <h3 className="text-[20px] font-semibold text-[#0A0A0A] mb-1">Schedule</h3>
                <p className="text-[12px] text-gray-400 leading-relaxed">
                  Availability for in-person consultations
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between bg-[#F7F7F5] rounded-lg px-4 py-3">
                  <span className="text-[12px] font-medium text-gray-500">
                    {doctor.workingHours}
                  </span>
                  <span className="text-[12px] font-semibold text-[#0A0A0A]">
                    Contact for schedule
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
