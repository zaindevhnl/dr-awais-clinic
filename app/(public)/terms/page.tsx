import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "[Terms of use meta description placeholder.]",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <section className="section">
      <div className="container-page max-w-3xl">
        <h1 className="text-4xl font-bold">Terms of use</h1>
        <p className="mt-3 text-muted-foreground">
          Last updated: [DATE]. This is placeholder text — have it reviewed
          before publishing.
        </p>

        <div className="prose-clinic mt-10 text-lg">
          <h2>Not medical advice</h2>
          <p>
            The information on this website, including any articles, is general
            information only. It is not medical advice and does not replace a
            consultation. Never delay seeking care because of something you read
            here.
          </p>

          <h2>Emergencies</h2>
          <p>
            Do not use this website in an emergency. Call {SITE.emergencyLabel} (
            {SITE.emergencyNumber}) or go to your nearest emergency department.
          </p>

          <h2>Appointment requests</h2>
          <p>
            Submitting the booking form creates a request, not a confirmed
            appointment. The clinic confirms slots separately.
          </p>

          <h2>Acceptable use</h2>
          <p>
            [Placeholder — describe prohibited use, automated scraping, and abuse
            of the booking forms.]
          </p>

          <h2>Liability</h2>
          <p>[Placeholder — limitation of liability wording for your jurisdiction.]</p>

          <h2>Governing law</h2>
          <p>[Placeholder — governing law and jurisdiction.]</p>
        </div>
      </div>
    </section>
  );
}
