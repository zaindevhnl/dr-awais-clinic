import { ServiceForm } from "@/components/admin/service-form";
import { requireAdmin } from "@/lib/auth";

export default async function NewServicePage() {
  await requireAdmin();

  return (
    <>
      <h1 className="text-3xl font-bold">New service</h1>
      <ServiceForm />
    </>
  );
}
