import { CountUp } from "@/components/count-up";
import { Reveal } from "@/components/reveal";
import { TRUST_STATS } from "@/lib/site";

export function TrustBar() {
  return (
    <section aria-label="Practice at a glance" className="border-b border-border">
      <div className="container-page grid grid-cols-2 gap-8 py-12 lg:grid-cols-4">
        {TRUST_STATS.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 80} className="text-center">
            <p className="font-heading text-4xl font-bold text-primary">
              <CountUp value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
