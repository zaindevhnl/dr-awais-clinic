import Link from "next/link";
import { getContent } from "@/lib/content";
import { BrandLogo } from "@/components/clone/brand-logo";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { SocialLinks } from "@/components/social-links";
import type { SocialLink } from "@/lib/social";

const pageLinks = [
  { name: "About Us", path: "/about" },
  { name: "Procedures", path: "/services" },
  { name: "Why Choose Us", path: "/about#why-choose-us" },
  { name: "Doctors", path: "/doctors" },
  { name: "Gallery", path: "/gallery" },
  { name: "Videos", path: "/videos" },
];

const legalLinks = [
  { name: "Terms & Condition", path: "/terms" },
  { name: "Privacy Policy", path: "/privacy" },
  { name: "Contact Us", path: "/contact" },
  { name: "Terms Of Use", path: "/terms" },
];

type Brand = {
  footerBlurb: string;
  newsletterHeading: string;
  newsletterHighlight: string;
  copyright: string;
};

export async function Footer({
  address = "Lahore,Pakistan",
  phone = "0300 3968500",
  email = "abcd@gmail.com",
  socials = [],
}: {
  address?: string;
  phone?: string;
  email?: string;
  socials?: SocialLink[];
}) {
  const content = await getContent<Brand>("brand");

  return (
    <footer className="bg-[#0B3D36] text-white pt-20 pb-8 relative overflow-hidden">
      {/* Heartbeat Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 1000 200" preserveAspectRatio="none">
          <path
            d="M0,100 L200,100 L210,80 L220,120 L230,100 L400,100 L410,20 L420,180 L430,100 L600,100 L610,85 L620,115 L630,100 L800,100 L810,40 L820,160 L830,100 L1000,100"
            stroke="white"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 px-4">
          {/* Heading Section */}
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 leading-tight text-[#FFFFFF]">
            {content.newsletterHeading}{" "}
            <span className="block md:inline">
              <br className="hidden md:block" />
            </span>
            <span className="relative inline-block mt-2 md:mt-0">
              {content.newsletterHighlight}
              <div className="absolute -bottom-2 left-0 w-full h-[6px] bg-[#5FD3BC] rounded-full z-[-1] opacity-80"></div>
            </span>
          </h2>

          {/* Form Container */}
          <div className="max-w-xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center bg-white/5 rounded-[24px] sm:rounded-full p-2.5 sm:p-2 border border-white/10 shadow-2xl shadow-black/10">
            <div className="flex items-center flex-1 px-3 py-3 sm:py-0">
              <Mail className="w-5 h-5 text-white/65 flex-shrink-0" />
              <input
                type="email"
                placeholder="Enter your email"
                aria-label="Enter your email"
                className="bg-transparent flex-1 outline-none text-sm pl-3 text-white placeholder-white/40 w-full"
              />
            </div>

            <button className="bg-[#5FD3BC] text-[#0B3D36] px-8 py-4 sm:py-3 cursor-pointer rounded-[16px] sm:rounded-full font-bold text-sm flex items-center justify-center space-x-2 hover:bg-[#4BC4AB] transition-all duration-300 active:scale-[0.98] mt-2 sm:mt-0 shadow-lg shadow-[#5FD3BC]/10">
              <span>Subscribe Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Footer Box */}
        <div className="bg-[#08302A] rounded-3xl p-8 md:p-12 border border-white/10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Brand & About */}
          <div className="space-y-6">
            <BrandLogo tone="light" />
            <p className="text-white/65 text-sm leading-relaxed">{content.footerBlurb}</p>
            <SocialLinks
              links={socials}
              itemClassName="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white/75 hover:bg-[#5FD3BC] hover:text-[#0B3D36] transition-colors"
            />
          </div>

          {/* Column 2: Page */}
          <div>
            <h3 className="text-xl font-bold mb-6">Page</h3>
            <ul className="space-y-4">
              {pageLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="text-white/65 text-sm hover:text-[#5FD3BC] block transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Link */}
          <div>
            <h3 className="text-xl font-bold mb-6">Link</h3>
            <ul className="space-y-4">
              {legalLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.path}
                    className="text-white/65 text-sm hover:text-[#5FD3BC] block transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-[#5FD3BC]" />
                </div>
                <div>
                  <p className="text-xs text-white/50 font-medium">Address</p>
                  <p className="text-sm text-white/85">{address}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-[#5FD3BC]" />
                </div>
                <div>
                  <p className="text-xs text-white/50 font-medium">Phone Number</p>
                  <p className="text-sm text-white/85">{phone}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-[#5FD3BC]" />
                </div>
                <div>
                  <p className="text-xs text-white/50 font-medium">Email</p>
                  <p className="text-sm text-white/85">{email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 text-center text-sm text-white/50 pt-8 border-t border-white/10">
          <p>{content.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
