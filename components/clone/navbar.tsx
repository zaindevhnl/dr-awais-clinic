"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BrandLogo } from "@/components/clone/brand-logo";

type NavLink = {
  name: string;
  path: string;
  hasDropdown: boolean;
  isBooking?: boolean;
  dropdownItems?: { name: string; path: string }[];
};

const navLinks: NavLink[] = [
  {
    name: "Home",
    path: "/",
    hasDropdown: false,
    dropdownItems: [{ name: "Home 1", path: "/" }],
  },
  {
    name: "About",
    path: "/about",
    hasDropdown: false,
    dropdownItems: [
      { name: "About Us", path: "/about" },
      { name: "All Doctors", path: "/doctors" },
    ],
  },
  {
    name: "Services",
    path: "/services",
    hasDropdown: false,
    dropdownItems: [{ name: "All Services", path: "/services" }],
  },
  {
    name: "Reviews",
    path: "/reviews",
    hasDropdown: false,
    dropdownItems: [{ name: "All Reviews", path: "/reviews" }],
  },
  {
    name: "Gallery",
    path: "/gallery",
    hasDropdown: false,
    dropdownItems: [{ name: "Full Gallery", path: "/gallery" }],
  },
  { name: "Book Appointment", path: "/contact", isBooking: true, hasDropdown: false },
];

export function Navbar({ phone }: { phone?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const isActivePath = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-50 py-4 px-6 md:px-12 sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <BrandLogo onClick={handleLinkClick} />

        {/* Desktop Navigation Links */}
        <div
          className="hidden lg:flex items-center space-x-2 relative"
          onMouseLeave={() => {
            setHoveredIndex(null);
            setActiveDropdown(null);
          }}
        >
          {navLinks.map((link, index) => {
            if (link.isBooking) {
              return (
                <div key={link.name} className="relative py-2 flex items-center pl-2">
                  <Link
                    href={link.path}
                    onClick={handleLinkClick}
                    className="bg-[#00A78E] hover:bg-[#008f7a] text-white px-5 py-2.5 rounded-full font-semibold text-[15px] shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer active:translate-y-0 text-center block"
                  >
                    {link.name}
                  </Link>
                </div>
              );
            }

            const isActive = isActivePath(link.path);

            return (
              <div
                key={link.name}
                className="relative py-2 flex items-center group"
                onMouseEnter={() => {
                  setHoveredIndex(index);
                  if (link.hasDropdown) setActiveDropdown(link.name);
                }}
              >
                <Link
                  href={link.path}
                  onClick={handleLinkClick}
                  className="relative px-4 py-2 flex items-center cursor-pointer"
                >
                  <AnimatePresence>
                    {(hoveredIndex === index || isActive) && (
                      <motion.div
                        layoutId="nav-hover"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        className="absolute inset-0 bg-[#F4F9F8] rounded-full z-0"
                      />
                    )}
                  </AnimatePresence>

                  <span
                    className={
                      "relative z-10 text-[17px] font-semibold transition-colors duration-300 " +
                      (hoveredIndex === index ||
                      activeDropdown === link.name ||
                      isActive
                        ? "text-[#00A78E]"
                        : "text-[#1A1A1A]")
                    }
                  >
                    {link.name}
                  </span>
                  {link.hasDropdown && (
                    <ChevronDown
                      className={
                        "relative z-10 ml-1 w-4 h-4 transition-colors duration-300 " +
                        (hoveredIndex === index ||
                        activeDropdown === link.name ||
                        isActive
                          ? "text-[#00A78E]"
                          : "text-[#1A1A1A]")
                      }
                    />
                  )}
                </Link>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {activeDropdown === link.name && link.dropdownItems && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl shadow-black/10 border border-gray-50 py-3 z-[60]"
                    >
                      {link.dropdownItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.path}
                          className={
                            "block px-6 py-3 text-[16px] font-semibold transition-all duration-200 " +
                            (isActivePath(item.path)
                              ? "text-[#00A78E] bg-[#F4F9F8]"
                              : "text-[#1A1A1A] hover:text-[#00A78E] hover:bg-[#F4F9F8]")
                          }
                          onClick={() => {
                            setActiveDropdown(null);
                            handleLinkClick();
                          }}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-md text-slate-600 hover:bg-slate-100 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Expandable) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden mt-4 space-y-4 pb-6 overflow-hidden flex flex-col"
          >
            {navLinks.map((link) => {
              if (link.isBooking) {
                return (
                  <div key={link.name} className="px-2 pt-2 pb-1">
                    <Link
                      href={link.path}
                      onClick={handleLinkClick}
                      className="w-full text-center bg-[#00A78E] hover:bg-[#008f7a] text-white py-3 rounded-xl font-bold text-lg shadow-md transition-colors duration-300 block"
                    >
                      {link.name}
                    </Link>
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={handleLinkClick}
                  className="flex flex-col border-b border-gray-50 pb-2"
                >
                  <div className="flex items-center justify-between px-2 py-2">
                    <span
                      className={
                        "font-bold text-lg transition-colors duration-300 " +
                        (isActivePath(link.path) ? "text-[#00A78E]" : "text-[#1A1A1A]")
                      }
                    >
                      {link.name}
                    </span>
                  </div>
                </Link>
              );
            })}

            {/* Need Help Section */}
            <div className="flex items-center space-x-4 px-2 pt-4 border-t border-gray-50">
              <div className="w-12 h-12 flex items-center justify-center bg-[#F4F9F8] rounded-full">
                <MessageCircle className="w-6 h-6 text-[#00A78E]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 font-medium">Need help?</span>
                <span className="text-lg font-extrabold text-[#1A1A1A]">
                  {phone || "+92 300 3968500"}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
