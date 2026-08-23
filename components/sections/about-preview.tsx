import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { SITE } from "@/lib/site";

export function AboutPreview() {
  return (
    <section className="section">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <Image
            src="/dr-awais-malik-formal.jpg"
            alt={`${SITE.doctorName} at the clinic`}
            width={854}
            height={1280}
            sizes="(max-width: 1024px) 90vw, 400px"
            className="mx-auto w-full max-w-sm rounded-3xl border border-border object-cover shadow-sm"
          />
        </Reveal>

        <Reveal delay={100}>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            About the doctor
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl">
            Meet {SITE.doctorName}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            [Placeholder biography paragraph. Describe the doctor&apos;s training,
            areas of focus, and approach to patient care in two or three
            sentences. Do not publish claims you cannot evidence.]
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            [Second placeholder paragraph — clinical interests, languages spoken,
            hospital affiliations.]
          </p>
          <Button asChild variant="outline" size="lg" className="mt-8">
            <Link href="/about">
              Read full profile
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
