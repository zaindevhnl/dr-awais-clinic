import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaqList } from "@/components/sections/faq-list";
import { JsonLd, breadcrumbLd, faqLd } from "@/components/seo/json-ld";
import { getFaqs } from "@/lib/data";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Frequently asked questions",
  description:
    "[FAQ meta description placeholder — answers about appointments, fees and visits.]",
  alternates: { canonical: "/faq" },
  openGraph: { url: "/faq", images: ["/placeholder-wide.svg"] },
};

export default async function FaqPage() {
  const faqs = await getFaqs();

  return (
    <>
      <JsonLd data={faqLd(faqs)} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ])}
      />

      <section className="border-b border-border bg-surface">
        <div className="container-page py-14 text-center sm:py-16">
          <h1 className="text-4xl font-bold sm:text-5xl">
            Frequently asked questions
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            [Placeholder intro line for the FAQ page.]
          </p>
        </div>
      </section>

      <FaqList faqs={faqs} showHeading={false} />

      <section className="pb-20 text-center">
        <p className="text-lg text-muted-foreground">
          Still have a question?
        </p>
        <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/contact">Contact the clinic</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/appointment">Book an appointment</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
