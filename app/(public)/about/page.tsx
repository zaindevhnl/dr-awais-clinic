import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Award, GraduationCap, Languages, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/reveal";
import { JsonLd, breadcrumbLd } from "@/components/seo/json-ld";
import { SITE } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About the doctor",
  description:
    "[About page meta description placeholder — training, experience and approach to care.]",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about", images: ["/placeholder-wide.svg"] },
};

const CREDENTIALS = [
  { icon: GraduationCap, label: "[Degree / qualification placeholder]" },
  { icon: Award, label: "[Fellowship or certification placeholder]" },
  { icon: MapPin, label: "[Hospital affiliation placeholder]" },
  { icon: Languages, label: "[Languages spoken placeholder]" },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      <section className="border-b border-border bg-surface">
        <div className="container-page grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[0.8fr_1.2fr]">
          <Image
            src="/dr-awais-malik-formal.jpg"
            alt={`${SITE.doctorName}, ${SITE.credentials}, ${SITE.specialty}`}
            width={854}
            height={1280}
            priority
            sizes="(max-width: 1024px) 90vw, 380px"
            className="mx-auto w-full max-w-sm rounded-3xl border border-border shadow-sm"
          />
          <div>
            <h1 className="text-4xl font-bold sm:text-5xl">{SITE.doctorName}</h1>
            <p className="mt-2 text-lg font-medium text-primary">
              {SITE.credentials} · {SITE.specialty}
            </p>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              [Opening biography paragraph placeholder. Two or three sentences on
              who the doctor is and where they practise.]
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/appointment">Book an appointment</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="prose-clinic text-lg">
            <h2>Background and training</h2>
            <p>
              [Placeholder paragraph about medical education, training hospitals
              and years in practice. Replace with verified details only.]
            </p>

            <h2>Clinical interests</h2>
            <p>[Placeholder paragraph about areas of special interest.]</p>
            <ul>
              <li>[Interest one]</li>
              <li>[Interest two]</li>
              <li>[Interest three]</li>
            </ul>

            <h2>Approach to patient care</h2>
            <p>
              [Placeholder paragraph describing consultation style, time given
              per patient, and follow-up practice.]
            </p>

            <h2>Professional memberships</h2>
            <p>[Placeholder list of memberships and registrations.]</p>
          </div>

          <Reveal>
            <Card className="lg:sticky lg:top-24">
              <CardContent>
                <h2 className="text-lg font-semibold">At a glance</h2>
                <ul className="mt-5 space-y-4">
                  {CREDENTIALS.map(({ icon: Icon, label }) => (
                    <li key={label} className="flex items-start gap-3">
                      <Icon
                        className="mt-0.5 size-5 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span className="text-muted-foreground">{label}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild className="mt-6 w-full">
                  <Link href="/appointment">Book appointment</Link>
                </Button>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </section>
    </>
  );
}
