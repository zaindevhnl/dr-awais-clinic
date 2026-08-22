import type { Metadata } from "next";
import { LoginForm } from "@/components/forms/login-form";
import { Stethoscope } from "lucide-react";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: PageProps<"/admin/login">) {
  const params = await searchParams;
  const redirectTo =
    typeof params.redirect === "string" ? params.redirect : "/admin";
  const notAuthorized = params.error === "not_authorized";
  const notConfigured = params.error === "not_configured";

  return (
    <main className="grid min-h-dvh place-items-center bg-surface px-5 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 flex items-center justify-center gap-3">
          <span className="grid size-11 place-items-center rounded-xl bg-primary text-primary-foreground">
            <Stethoscope className="size-6" aria-hidden="true" />
          </span>
          <span className="font-heading text-xl font-bold">
            {SITE.doctorName}
          </span>
        </div>

        <LoginForm
          redirectTo={redirectTo}
          notAuthorized={notAuthorized}
          notConfigured={notConfigured}
        />

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Staff access only. Accounts are created by the site administrator —
          there is no public sign-up.
        </p>
      </div>
    </main>
  );
}
