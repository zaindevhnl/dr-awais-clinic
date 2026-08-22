import Link from "next/link";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  deleteAppointment,
  saveAppointmentNotes,
  updateAppointmentStatus,
} from "@/app/actions/admin";
import { referenceFor } from "@/lib/forms";
import { requireAdmin } from "@/lib/auth";
import type { Appointment, AppointmentStatus } from "@/types/database.types";

export const dynamic = "force-dynamic";

const STATUSES: AppointmentStatus[] = [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
  "no_show",
];

const FILTERS = ["all", ...STATUSES] as const;

export default async function AdminAppointmentsPage({
  searchParams,
}: PageProps<"/admin/appointments">) {
  const { supabase } = await requireAdmin();
  const params = await searchParams;
  const status = typeof params.status === "string" ? params.status : "all";

  let query = supabase
    .from("appointments")
    .select("*, services(title)")
    .order("preferred_date", { ascending: false })
    .limit(100);

  if (status !== "all" && STATUSES.includes(status as AppointmentStatus)) {
    query = query.eq("status", status as AppointmentStatus);
  }

  const { data, error } = await query;
  const appointments = (data ?? []) as (Appointment & {
    services: { title: string } | null;
  })[];

  return (
    <>
      <h1 className="text-3xl font-bold">Appointments</h1>
      <p className="mt-2 text-muted-foreground">
        Requests come in as <strong>pending</strong>. Marking one{" "}
        <strong>confirmed</strong> emails the patient if they left an address.
      </p>

      <nav aria-label="Filter by status" className="mt-6 flex flex-wrap gap-2">
        {FILTERS.map((option) => (
          <Link
            key={option}
            href={`/admin/appointments?status=${option}`}
            aria-current={status === option ? "page" : undefined}
          >
            <Badge variant={status === option ? "default" : "outline"}>
              {option.replace("_", " ")}
            </Badge>
          </Link>
        ))}
      </nav>

      {error ? (
        <p role="alert" className="mt-8 font-medium text-destructive">
          Could not load appointments: {error.message}
        </p>
      ) : null}

      {appointments.length === 0 ? (
        <p className="mt-8 text-muted-foreground">Nothing here yet.</p>
      ) : (
        <ul className="mt-8 space-y-4">
          {appointments.map((row) => (
            <li key={row.id}>
              <Card>
                <CardContent>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="font-heading text-lg font-semibold">
                        {row.full_name}{" "}
                        <span className="text-sm font-normal text-muted-foreground">
                          {referenceFor(row.id)}
                        </span>
                      </p>
                      <p className="mt-1 text-muted-foreground">
                        {format(new Date(row.preferred_date), "EEEE d MMM yyyy")} ·{" "}
                        {row.preferred_time_slot}
                      </p>
                      <p className="mt-1">
                        <a href={`tel:${row.phone}`} className="hover:underline">
                          {row.phone}
                        </a>
                        {row.email ? (
                          <>
                            {" · "}
                            <a
                              href={`mailto:${row.email}`}
                              className="hover:underline"
                            >
                              {row.email}
                            </a>
                          </>
                        ) : null}
                      </p>
                      {row.services?.title ? (
                        <p className="mt-1 text-muted-foreground">
                          Service: {row.services.title}
                        </p>
                      ) : null}
                      {row.message ? (
                        <p className="mt-3 rounded-lg bg-muted p-3 text-[0.95rem]">
                          {row.message}
                        </p>
                      ) : null}
                    </div>
                    <Badge variant="secondary">{row.status}</Badge>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    {STATUSES.filter((s) => s !== row.status).map((s) => (
                      <form key={s} action={updateAppointmentStatus}>
                        <input type="hidden" name="id" value={row.id} />
                        <input type="hidden" name="status" value={s} />
                        <Button type="submit" size="sm" variant="outline">
                          Mark {s.replace("_", " ")}
                        </Button>
                      </form>
                    ))}

                    <form action={deleteAppointment} className="ml-auto">
                      <input type="hidden" name="id" value={row.id} />
                      <Button
                        type="submit"
                        size="sm"
                        variant="ghost"
                        className="text-destructive"
                      >
                        Delete
                      </Button>
                    </form>
                  </div>

                  <form action={saveAppointmentNotes} className="mt-4">
                    <input type="hidden" name="id" value={row.id} />
                    <label
                      htmlFor={`notes-${row.id}`}
                      className="text-sm font-medium"
                    >
                      Internal notes
                    </label>
                    <div className="mt-1.5 flex gap-2">
                      <input
                        id={`notes-${row.id}`}
                        name="admin_notes"
                        defaultValue={row.admin_notes ?? ""}
                        className="h-10 flex-1 rounded-md border border-input bg-background px-3"
                      />
                      <Button type="submit" variant="outline">
                        Save
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
