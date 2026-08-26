import { Navbar } from "@/components/clone/navbar";
import { Footer } from "@/components/clone/footer";
import { SiteWidgets } from "@/components/clone/site-widgets";
import { JsonLd, breadcrumbLd, physicianLd } from "@/components/seo/json-ld";
import { getServices, getSettings } from "@/lib/data";

export default async function PublicLayout({ children }: LayoutProps<"/">) {
  const [settings, services] = await Promise.all([getSettings(), getServices()]);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar phone={settings.phone ?? undefined} />

        {/* The in-code fallback catalogue has synthetic ids the booking form
            cannot submit, so only real rows populate the dropdown. */}
        <SiteWidgets
          services={services
            .filter((s) => !s.id.startsWith("fallback-"))
            .map((s) => ({ id: s.id, title: s.title }))}
          whatsapp={settings.whatsapp ?? undefined}
          phone={settings.phone ?? undefined}
        />

        <main id="main" className="flex-1">
          {children}
        </main>

        <Footer
          address={settings.address ?? undefined}
          phone={settings.phone ?? undefined}
          email={settings.email ?? undefined}
        />
      </div>
      <JsonLd data={physicianLd(settings)} />
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }])} />
    </>
  );
}
