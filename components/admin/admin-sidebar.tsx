"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarCheck,
  ExternalLink,
  LayoutDashboard,
  LogOut,
  Newspaper,
  Quote,
  Settings,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/app/actions/auth";
import { ADMIN_NAV } from "@/lib/site";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  LayoutDashboard,
  CalendarCheck,
  Stethoscope,
  Newspaper,
  Quote,
  Settings,
};

export function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname();

  return (
    <aside className="border-b border-border bg-background lg:sticky lg:top-0 lg:h-dvh lg:w-64 lg:shrink-0 lg:border-b-0 lg:border-r">
      <div className="flex h-full flex-col p-4">
        <Link href="/admin" className="flex items-center gap-2 px-2 py-3">
          <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
            <Stethoscope className="size-5" aria-hidden="true" />
          </span>
          <span className="font-heading font-bold">Clinic admin</span>
        </Link>

        <nav aria-label="Admin" className="mt-4 flex flex-wrap gap-1 lg:flex-col">
          {ADMIN_NAV.map((item) => {
            const Icon = ICONS[item.icon] ?? LayoutDashboard;
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-[0.95rem] font-medium transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-secondary",
                )}
              >
                <Icon className="size-4" aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto space-y-2 pt-6">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary"
          >
            <ExternalLink className="size-4" aria-hidden="true" />
            View website
          </Link>
          <p className="truncate px-3 text-sm text-muted-foreground">{email}</p>
          <form action={signOut}>
            <Button type="submit" variant="outline" className="w-full">
              <LogOut className="size-4" aria-hidden="true" />
              Sign out
            </Button>
          </form>
        </div>
      </div>
    </aside>
  );
}
