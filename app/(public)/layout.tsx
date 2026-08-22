import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MobileActionBar } from "@/components/layout/mobile-action-bar";
import { JsonLd, breadcrumbLd, physicianLd } from "@/components/seo/json-ld";
import { getSettings } from "@/lib/data";

export default async function PublicLayout({ children }: LayoutProps<"/">) {
  const settings = await getSettings();

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <SiteHeader
        clinicName={settings.clinic_name ?? ""}
        phone={settings.phone ?? ""}
      />
      <main id="main" className="flex-1 pb-16 sm:pb-0">
        {children}
      </main>
      <SiteFooter settings={settings} />
      <MobileActionBar phone={settings.phone ?? ""} />
      <JsonLd data={physicianLd(settings)} />
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }])} />
    </>
  );
}
