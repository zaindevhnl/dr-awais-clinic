import type { Metadata } from "next";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { requireAdmin } from "@/lib/auth";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s · Admin" },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  // Server-side gate. Middleware guards the route too; this guards the render.
  const { user } = await requireAdmin();

  return (
    <div className="flex min-h-dvh flex-col lg:flex-row">
      <AdminSidebar email={user.email ?? ""} />
      <main id="main" className="flex-1 bg-surface">
        <div className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
