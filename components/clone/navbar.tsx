"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, Menu, X, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BrandLogo } from "@/components/clone/brand-logo";
import { PROCEDURE_GROUPS } from "@/lib/procedures";

type NavLink = {
  name: string;
  path: string;
  hasDropdown: boolean;
  isBooking?: boolean;
  /** Opens the three-column procedures panel instead of a plain list. */
  isMega?: boolean;
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
    name: "Procedures",
    path: "/services",
    hasDropdown: true,
    isMega: true,
  },
  {
    name: "Patient Reviews",
    path: "/reviews",
    hasDropdown: false,
    dropdownItems: [{ name: "All Patient Reviews", path: "/reviews" }],
  },
  {
    name: "Gallery",
    path: "/gallery",
    hasDropdown: false,
    dropdownItems: [{ name: "Full Gallery", path: "/gallery" }],
  },
  {
    name: "Videos",
    path: "/videos",
    hasDropdown: false,
    dropdownItems: [{ name: "All Videos", path: "/videos" }],
  },
  { name: "Contact", path: "/contact", hasDropdown: false },
  { name: "Book Consultation", path: "/contact", isBooking: true, hasDropdown: false },
];

export function Navbar({ phone }: { phone?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileProceduresOpen, setMobileProceduresOpen] = useState(false);
  const pathname = usePathname();

  const isActivePath = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
    setActiveDropdown(null);
  };

  return (
    <nav className="bg-white border-b border-gray-50 py-4 px-6 md:px-12 sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <BrandLogo onClick={handleLinkClick} className="shrink-0 whitespace-nowrap" />

        {/* Desktop Navigation Links */}
        <div
          className="hidden xl:flex items-center space-x-1 2xl:space-x-2 relative"
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
                    className="bg-[#0B3D36] hover:bg-[#0F5249] text-white px-5 py-2.5 rounded-full font-semibold text-[15px] whitespace-nowrap shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer active:translate-y-0 text-center block"
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
                // The procedures panel anchors to the whole row, not to this item.
                className={(link.isMega ? "" : "relative ") + "py-2 flex items-center group"}
                onMouseEnter={() => {
                  setHoveredIndex(index);
                  setActiveDropdown(link.hasDropdown ? link.name : null);
                }}
                onFocus={() => setActiveDropdown(link.hasDropdown ? link.name : null)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setActiveDropdown(null);
                }}
              >
                <Link
                  href={link.path}
                  onClick={handleLinkClick}
                  className="relative px-3 2xl:px-4 py-2 flex items-center cursor-pointer"
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
                      "relative z-10 whitespace-nowrap text-[17px] font-semibold transition-colors duration-300 " +
                      (hoveredIndex === index ||
                      activeDropdown === link.name ||
                      isActive
                        ? "text-[#0B3D36]"
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
                          ? "text-[#0B3D36]"
                          : "text-[#1A1A1A]")
                      }
                    />
                  )}
                </Link>

                {/* Procedures panel: the practice's three groups side by side */}
                <AnimatePresence>
                  {activeDropdown === link.name && link.isMega && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute left-0 top-full z-[60] w-[760px] pt-3"
                    >
                      <div className="overflow-hidden rounded-2xl border border-[#0B3D36]/10 bg-white shadow-2xl shadow-[#0B3D36]/15">
                        <div className="grid grid-cols-3 gap-6 p-7">
                          {PROCEDURE_GROUPS.map((group) => (
                            <div key={group.id}>
                              <Link
                                href={`/services#${group.id}`}
                                onClick={handleLinkClick}
                                className="mb-3 flex items-center gap-2 text-[15px] font-bold text-[#0B3D36] hover:text-[#0F5249]"
                              >
                                <span className="h-2 w-2 rounded-full bg-[#5FD3BC]" />
                                {group.title}
                              </Link>
                              <ul className="space-y-0.5">
                                {group.items.map((item) => {
                                  const href = `/services/${item.slug}`;
                                  return (
                                    <li key={item.slug}>
                                      <Link
                                        href={href}
                                        onClick={handleLinkClick}
                                        className={
                                          "block rounded-lg px-3 py-2 text-[15px] transition-colors duration-200 " +
                                          (pathname === href
                                            ? "bg-[#F4F9F8] font-semibold text-[#0B3D36]"
                                            : "text-slate-600 hover:bg-[#F4F9F8] hover:text-[#0B3D36]")
                                        }
                                      >
                                        {item.label}
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center justify-between border-t border-[#0B3D36]/10 bg-[#F4F9F8] px-7 py-3.5">
                          <span className="text-sm text-slate-600">
                            Not sure which procedure is right for you?
                          </span>
                          <Link
                            href="/services"
                            onClick={handleLinkClick}
                            className="group/all inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B3D36] hover:text-[#0F5249]"
                          >
                            View all procedures
                            <ArrowRight className="h-4 w-4 transition-transform group-hover/all:translate-x-1" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

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
                              ? "text-[#0B3D36] bg-[#F4F9F8]"
                              : "text-[#1A1A1A] hover:text-[#0B3D36] hover:bg-[#F4F9F8]")
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
        <div className="xl:hidden flex items-center">
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
            className="xl:hidden mt-4 space-y-4 pb-6 overflow-hidden flex flex-col"
          >
            {navLinks.map((link) => {
              if (link.isBooking) {
                return (
                  <div key={link.name} className="px-2 pt-2 pb-1">
                    <Link
                      href={link.path}
                      onClick={handleLinkClick}
                      className="w-full text-center bg-[#0B3D36] hover:bg-[#0F5249] text-white py-3 rounded-xl font-bold text-lg shadow-md transition-colors duration-300 block"
                    >
                      {link.name}
                    </Link>
                  </div>
                );
              }

              if (link.isMega) {
                return (
                  <div key={link.name} className="border-b border-gray-50 pb-2">
                    <div className="flex items-center justify-between px-2 py-2">
                      <Link
                        href={link.path}
                        onClick={handleLinkClick}
                        className={
                          "font-bold text-lg transition-colors duration-300 " +
                          (isActivePath(link.path) ? "text-[#0B3D36]" : "text-[#1A1A1A]")
                        }
                      >
                        {link.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setMobileProceduresOpen((open) => !open)}
                        aria-expanded={mobileProceduresOpen}
                        aria-label="Show procedures"
                        className="rounded-full p-2 text-[#0B3D36] hover:bg-[#F4F9F8]"
                      >
                        <ChevronDown
                          className={
                            "h-5 w-5 transition-transform duration-300 " +
                            (mobileProceduresOpen ? "rotate-180" : "")
                          }
                        />
                      </button>
                    </div>
                    {mobileProceduresOpen && (
                      <div className="space-y-4 px-2 pb-2 pt-1">
                        {PROCEDURE_GROUPS.map((group) => (
                          <div key={group.id}>
                            <div className="mb-1 flex items-center gap-2 text-sm font-bold text-[#0B3D36]">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#5FD3BC]" />
                              {group.title}
                            </div>
                            <ul>
                              {group.items.map((item) => (
                                <li key={item.slug}>
                                  <Link
                                    href={`/services/${item.slug}`}
                                    onClick={handleLinkClick}
                                    className="block py-1.5 pl-3.5 text-[15px] text-slate-600 hover:text-[#0B3D36]"
                                  >
                                    {item.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
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
                        (isActivePath(link.path) ? "text-[#0B3D36]" : "text-[#1A1A1A]")
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
                <MessageCircle className="w-6 h-6 text-[#0B3D36]" />
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
