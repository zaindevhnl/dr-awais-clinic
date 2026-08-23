import Link from "next/link";
import { CalendarPlus, Phone } from "lucide-react";
import { telHref } from "@/lib/site";

/** Sticky call/book bar shown on small screens across all public pages. */
export function MobileActionBar({ phone }: { phone: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/92 shadow-[0_-4px_20px_-8px_oklch(0.4_0.03_220/0.18)] backdrop-blur-md sm:hidden">
      {/* pb tracks the home-indicator inset so the bar is never
          clipped by iOS chrome; each target clears 56px. */}
      <div className="grid grid-cols-2 gap-2 p-2 pb-[max(--spacing(2),env(safe-area-inset-bottom))]">
        <a
          href={telHref(phone)}
          className="flex min-h-14 items-center justify-center gap-2 rounded-xl border border-border-strong font-semibold transition-colors active:bg-accent"
        >
          <Phone className="size-5" aria-hidden="true" />
          Call
        </a>
        <Link
          href="/appointment"
          className="flex min-h-14 items-center justify-center gap-2 rounded-xl bg-primary font-semibold text-primary-foreground shadow-xs transition-colors active:bg-primary-active"
        >
          <CalendarPlus className="size-5" aria-hidden="true" />
          Book
        </Link>
      </div>
    </div>
  );
}
