import { notFound } from "next/navigation";
import { ServiceForm } from "@/components/admin/service-form";
import { requireAdmin } from "@/lib/auth";
import type { Service } from "@/types/database.types";

export const dynamic = "force-dynamic";

export default async function EditServicePage({
  params,
}: PageProps<"/admin/services/[id]">) {
  const { supabase } = await requireAdmin();
  const { id } = await params;

  const { data } = await supabase
    .from("services")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!data) notFound();

  return (
    <>
      <h1 className="text-3xl font-bold">Edit service</h1>
      <ServiceForm service={data as Service} />
    </>
  );
}
