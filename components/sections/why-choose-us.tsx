import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/sections/section-heading";
import { DIFFERENTIATORS } from "@/lib/site";

export function WhyChooseUs() {
  return (
    <section className="section">
      <div className="container-page">
        <SectionHeading
          eyebrow="Why patients choose us"
          title="[Section headline placeholder]"
          description="[One-sentence supporting description.]"
        />

        {/* Unboxed: four short items read faster as a sequence than
            as four competing cards. */}
        <ul className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {DIFFERENTIATORS.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 80} className="relative">
              <span className="grid size-12 place-items-center rounded-2xl bg-accent text-accent-foreground ring-1 ring-primary/10">
                <Icon name={item.icon} className="size-6" />
              </span>
              <h3 className="mt-6 text-lg font-semibold tracking-tight">
                {item.title}
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
