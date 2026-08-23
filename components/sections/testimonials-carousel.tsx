"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/sections/section-heading";
import type { Testimonial } from "@/types/database.types";

/** "Ayesha Khan" -> "Ayesha K." — never publish a full patient name. */
function displayName(name: string) {
  const [first, ...rest] = name.trim().split(/\s+/);
  const initial = rest.at(-1)?.[0];
  return initial ? `${first} ${initial}.` : first;
}

export function TestimonialsCarousel({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [index, setIndex] = useState(0);
  if (testimonials.length === 0) return null;

  const current = testimonials[index];
  const move = (delta: number) =>
    setIndex((i) => (i + delta + testimonials.length) % testimonials.length);

  return (
    <section className="section bg-surface">
      <div className="container-page">
        <SectionHeading
          eyebrow="Patient feedback"
          title="What our patients say"
          description="[Only approved, consented testimonials appear here.]"
        />

        <Card className="mx-auto mt-14 max-w-3xl">
          <CardContent>
            <div aria-live="polite">
              <Quote
                className="size-8 text-primary/40"
                aria-hidden="true"
              />
              <p
                className="mt-1 flex gap-1"
                aria-label={`Rated ${current.rating ?? 0} out of 5`}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    aria-hidden="true"
                    className={
                      i < (current.rating ?? 0)
                        ? "size-5 fill-primary text-primary"
                        : "size-5 text-muted-foreground/40"
                    }
                  />
                ))}
              </p>
              <blockquote className="mt-6 text-xl leading-relaxed text-balance">
                {current.quote}
              </blockquote>
              <footer className="mt-6 font-medium text-muted-foreground">
                — {displayName(current.patient_name)}
              </footer>
            </div>

            {testimonials.length > 1 ? (
              <div className="mt-8 flex items-center justify-between">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => move(-1)}
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="size-5" aria-hidden="true" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => move(1)}
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="size-5" aria-hidden="true" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  {index + 1} of {testimonials.length}
                </p>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
