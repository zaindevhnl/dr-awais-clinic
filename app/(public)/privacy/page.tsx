import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "[Privacy policy meta description placeholder.]",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <section className="section">
      <div className="container-page max-w-3xl">
        <h1 className="text-4xl font-bold">Privacy policy</h1>
        <p className="mt-3 text-muted-foreground">
          Last updated: [DATE]. This is placeholder text — have it reviewed
          before publishing.
        </p>

        <div className="prose-clinic mt-10 text-lg">
          <h2>What we collect</h2>
          <p>
            When you request an appointment we store your name, phone number, an
            optional email address, your preferred date and time, and any note
            you write. Contact-form messages store your name, email, subject and
            message.
          </p>

          <h2>What we do not collect</h2>
          <p>
            This website does not collect medical records, test results or any
            other health information. Please do not send clinical details through
            the forms.
          </p>

          <h2>How we use it</h2>
          <p>
            Only to contact you about your appointment or enquiry. We do not sell
            or share your information with third parties for marketing.
          </p>

          <h2>Where it is stored</h2>
          <p>
            Submissions are stored in our booking database and are accessible only
            to authorised clinic staff. [Add your data-processor details here.]
          </p>

          <h2>Retention</h2>
          <p>[Describe how long appointment requests are kept.]</p>

          <h2>Your rights</h2>
          <p>
            Ask us to correct or delete your details at any time by contacting the
            clinic.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this policy? Contact the clinic. For emergencies, call{" "}
            {SITE.emergencyLabel} ({SITE.emergencyNumber}).
          </p>
        </div>
      </div>
    </section>
  );
}
