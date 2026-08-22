import { SettingsForm } from "@/components/admin/settings-form";
import { requireAdmin } from "@/lib/auth";
import { FALLBACK_SETTINGS } from "@/lib/site";
import type { SiteSettings } from "@/types/database.types";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .maybeSingle();

  return (
    <>
      <h1 className="text-3xl font-bold">Site settings</h1>
      <p className="mt-2 text-muted-foreground">
        Contact details, social links and the home-page headline. Changes appear
        on the website immediately.
      </p>
      <SettingsForm settings={(data as SiteSettings) ?? FALLBACK_SETTINGS} />
    </>
  );
}
