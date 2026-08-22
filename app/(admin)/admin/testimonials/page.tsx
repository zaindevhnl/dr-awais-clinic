import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TestimonialForm } from "@/components/admin/testimonial-form";
import { deleteTestimonial, setTestimonialApproval } from "@/app/actions/admin";
import { requireAdmin } from "@/lib/auth";
import type { Testimonial } from "@/types/database.types";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .order("display_order", { ascending: true });

  const testimonials = (data ?? []) as Testimonial[];

  return (
    <>
      <h1 className="text-3xl font-bold">Testimonials</h1>
      <p className="mt-2 text-muted-foreground">
        Only approved testimonials appear on the website. Publish a quote only
        with the patient&apos;s consent, and never include clinical details.
      </p>

      <Card className="mt-8">
        <CardContent>
          <h2 className="text-xl font-semibold">Add a testimonial</h2>
          <TestimonialForm />
        </CardContent>
      </Card>

      {testimonials.length === 0 ? (
        <p className="mt-8 text-muted-foreground">No testimonials yet.</p>
      ) : (
        <ul className="mt-8 space-y-3">
          {testimonials.map((item) => (
            <li key={item.id}>
              <Card>
                <CardContent>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-medium">{item.patient_name}</p>
                      <p
                        className="mt-1 flex gap-0.5"
                        aria-label={`Rated ${item.rating ?? 0} out of 5`}
                      >
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            aria-hidden="true"
                            className={
                              i < (item.rating ?? 0)
                                ? "size-4 fill-primary text-primary"
                                : "size-4 text-muted-foreground/40"
                            }
                          />
                        ))}
                      </p>
                    </div>
                    <Badge variant={item.is_approved ? "default" : "outline"}>
                      {item.is_approved ? "Published" : "Awaiting review"}
                    </Badge>
                  </div>

                  <blockquote className="mt-4 text-[0.98rem] leading-relaxed">
                    {item.quote}
                  </blockquote>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <form action={setTestimonialApproval}>
                      <input type="hidden" name="id" value={item.id} />
                      <input
                        type="hidden"
                        name="approve"
                        value={String(!item.is_approved)}
                      />
                      <Button type="submit" size="sm" variant="outline">
                        {item.is_approved ? "Unpublish" : "Approve & publish"}
                      </Button>
                    </form>
                    <form action={deleteTestimonial} className="ml-auto">
                      <input type="hidden" name="id" value={item.id} />
                      <Button
                        type="submit"
                        size="sm"
                        variant="ghost"
                        className="text-destructive"
                      >
                        Delete
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
