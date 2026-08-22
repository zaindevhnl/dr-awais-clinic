import Link from "next/link";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/icon";
import { deleteService } from "@/app/actions/admin";
import { requireAdmin } from "@/lib/auth";
import type { Service } from "@/types/database.types";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase
    .from("services")
    .select("*")
    .order("display_order", { ascending: true });

  const services = (data ?? []) as Service[];

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Services</h1>
        <Button asChild>
          <Link href="/admin/services/new">
            <Plus className="size-4" aria-hidden="true" />
            New service
          </Link>
        </Button>
      </div>

      {services.length === 0 ? (
        <p className="mt-8 text-muted-foreground">No services yet.</p>
      ) : (
        <ul className="mt-8 space-y-3">
          {services.map((service) => (
            <li key={service.id}>
              <Card>
                <CardContent className="flex flex-wrap items-center gap-4">
                  <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon name={service.icon} className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium">{service.title}</span>
                    <span className="block truncate text-sm text-muted-foreground">
                      /services/{service.slug}
                    </span>
                  </span>
                  <Badge variant={service.is_published ? "default" : "outline"}>
                    {service.is_published ? "Published" : "Draft"}
                  </Badge>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/admin/services/${service.id}`}>Edit</Link>
                  </Button>
                  <form action={deleteService}>
                    <input type="hidden" name="id" value={service.id} />
                    <Button
                      type="submit"
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                    >
                      Delete
                    </Button>
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
