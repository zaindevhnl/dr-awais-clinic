import Link from "next/link";
import { CalendarPlus, Phone } from "lucide-react";
import { telHref } from "@/lib/site";

/** Sticky call/book bar shown on small screens across all public pages. */
export function MobileActionBar({ phone }: { phone: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur sm:hidden">
      <div className="grid grid-cols-2">
        <a
          href={telHref(phone)}
          className="flex items-center justify-center gap-2 py-4 font-semibold"
        >
          <Phone className="size-5" aria-hidden="true" />
          Call
        </a>
        <Link
          href="/appointment"
          className="flex items-center justify-center gap-2 bg-primary py-4 font-semibold text-primary-foreground"
        >
          <CalendarPlus className="size-5" aria-hidden="true" />
          Book
        </Link>
      </div>
    </div>
  );
}
