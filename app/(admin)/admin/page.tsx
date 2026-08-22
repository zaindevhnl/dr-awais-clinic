import Link from "next/link";
import { format } from "date-fns";
import {
  CalendarCheck,
  CalendarClock,
  Mail,
  Newspaper,
  Quote,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const { supabase } = await requireAdmin();
  const todayIso = new Date().toISOString().slice(0, 10);

  const [pending, todays, unread, posts, testimonials, recent] =
    await Promise.all([
      supabase
        .from("appointments")
        .select("id", { count: "exact", head: true })
        .eq("status", "pending"),
      supabase
        .from("appointments")
        .select("id", { count: "exact", head: true })
        .eq("preferred_date", todayIso),
      supabase
        .from("contact_messages")
        .select("id", { count: "exact", head: true })
        .eq("is_read", false),
      supabase
        .from("posts")
        .select("id", { count: "exact", head: true })
        .eq("is_published", true),
      supabase
        .from("testimonials")
        .select("id", { count: "exact", head: true })
        .eq("is_approved", false),
      supabase
        .from("appointments")
        .select("id, full_name, phone, preferred_date, preferred_time_slot, status")
        .order("created_at", { ascending: false })
        .limit(6),
    ]);

  const stats = [
    {
      label: "Pending requests",
      value: pending.count ?? 0,
      icon: CalendarClock,
      href: "/admin/appointments?status=pending",
    },
    {
      label: "Appointments today",
      value: todays.count ?? 0,
      icon: CalendarCheck,
      href: "/admin/appointments",
    },
    {
      label: "Unread messages",
      value: unread.count ?? 0,
      icon: Mail,
      href: "/admin",
    },
    {
      label: "Published articles",
      value: posts.count ?? 0,
      icon: Newspaper,
      href: "/admin/blog",
    },
    {
      label: "Testimonials to review",
      value: testimonials.count ?? 0,
      icon: Quote,
      href: "/admin/testimonials",
    },
  ];

  return (
    <>
      <h1 className="text-3xl font-bold">Overview</h1>
      <p className="mt-2 text-muted-foreground">
        Everything waiting for your attention.
      </p>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map(({ label, value, icon: Icon, href }) => (
          <li key={label}>
            <Link href={href}>
              <Card className="transition-shadow hover:shadow-md">
                <CardContent className="flex items-center gap-4">
                  <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-heading text-3xl font-bold">
                      {value}
                    </span>
                    <span className="text-sm text-muted-foreground">{label}</span>
                  </span>
                </CardContent>
              </Card>
            </Link>
          </li>
        ))}
      </ul>

      <Card className="mt-8">
        <CardContent>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Latest requests</h2>
            <Button asChild variant="outline" size="sm">
              <Link href="/admin/appointments">View all</Link>
            </Button>
          </div>

          {recent.data && recent.data.length > 0 ? (
            <ul className="mt-5 divide-y divide-border">
              {recent.data.map((row) => (
                <li
                  key={row.id}
                  className="flex flex-wrap items-center justify-between gap-3 py-3"
                >
                  <span>
                    <span className="block font-medium">{row.full_name}</span>
                    <span className="text-sm text-muted-foreground">
                      {format(new Date(row.preferred_date), "d MMM yyyy")} ·{" "}
                      {row.preferred_time_slot} · {row.phone}
                    </span>
                  </span>
                  <Badge variant="secondary">{row.status}</Badge>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-5 text-muted-foreground">No requests yet.</p>
          )}
        </CardContent>
      </Card>
    </>
  );
}
