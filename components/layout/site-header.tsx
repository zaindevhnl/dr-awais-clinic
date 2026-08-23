"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Phone, Stethoscope, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { PUBLIC_NAV, telHref } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader({
  clinicName,
  phone,
}: {
  clinicName: string;
  phone: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // The header sits flush at rest and gains a hairline + shadow once
  // content passes beneath it, so the hero reads as one uninterrupted
  // surface at the top of the page.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ease-[var(--ease-out-soft)]",
        "border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/65",
        scrolled ? "border-border shadow-xs" : "border-transparent",
      )}
    >
      <div className="container-page flex h-18 items-center gap-4">
        <Link
          href="/"
          className="flex min-h-11 items-center gap-3 rounded-lg font-heading text-lg font-bold tracking-tight"
        >
          <span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground shadow-xs">
            <Stethoscope className="size-5" aria-hidden="true" />
          </span>
          <span className="truncate">{clinicName}</span>
        </Link>

        {/* Nav pill — the active item is filled, not just tinted, so
            current location survives a greyscale/low-vision check. */}
        <nav
          aria-label="Primary"
          className="ml-auto hidden items-center gap-1 rounded-full border border-border bg-surface/70 p-1 lg:flex"
        >
          {PUBLIC_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "flex min-h-11 items-center rounded-full px-4 text-sm font-medium transition-colors duration-200",
                isActive(item.href)
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-4">
          <ThemeToggle />
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="sm:hidden"
            aria-label={`Call ${phone}`}
          >
            <a href={telHref(phone)}>
              <Phone aria-hidden="true" />
            </a>
          </Button>
          <Button asChild variant="outline" className="hidden sm:inline-flex">
            <a href={telHref(phone)}>
              <Phone aria-hidden="true" />
              Call now
            </a>
          </Button>
          <Button asChild className="hidden sm:inline-flex">
            <Link href="/appointment">Book appointment</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu aria-hidden="true" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="flex w-[88vw] max-w-sm flex-col gap-0 p-0"
            >
              <SheetHeader className="flex-row items-center justify-between border-b border-border px-6 py-5">
                <SheetTitle className="font-heading text-base font-bold">
                  {clinicName}
                </SheetTitle>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon-sm">
                    <X aria-hidden="true" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </SheetClose>
              </SheetHeader>

              <nav
                aria-label="Mobile"
                className="flex flex-1 flex-col gap-1 overflow-y-auto p-4"
              >
                {PUBLIC_NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "flex min-h-12 items-center rounded-xl px-4 text-base font-medium transition-colors",
                      isActive(item.href)
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-accent hover:text-accent-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="grid gap-3 border-t border-border p-4 pb-[max(--spacing(4),env(safe-area-inset-bottom))]">
                <Button asChild size="lg" block>
                  <Link href="/appointment" onClick={() => setOpen(false)}>
                    Book appointment
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" block>
                  <a href={telHref(phone)}>
                    <Phone aria-hidden="true" />
                    Call {phone}
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
