import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/sections/section-heading";
import type { Faq } from "@/types/database.types";

export function FaqList({
  faqs,
  showHeading = true,
  showAllLink = false,
}: {
  faqs: Faq[];
  showHeading?: boolean;
  showAllLink?: boolean;
}) {
  if (faqs.length === 0) return null;

  return (
    <section className="section">
      <div className="container-page">
        {showHeading ? (
          <SectionHeading
            eyebrow="Questions"
            title="Frequently asked questions"
            description="[Short intro line for the FAQ section.]"
          />
        ) : null}

        <div className="mx-auto mt-12 max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-left text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {showAllLink ? (
          <div className="mt-10 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/faq">See all questions</Link>
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
