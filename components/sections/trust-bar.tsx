import { CountUp } from "@/components/count-up";
import { Reveal } from "@/components/reveal";
import { TRUST_STATS } from "@/lib/site";

export function TrustBar() {
  return (
    <section
      aria-label="Practice at a glance"
      className="border-y border-border bg-background"
    >
      {/* Hairline dividers instead of cards — the numbers are the
          hierarchy here, so the container stays silent. */}
      <div className="container-page grid grid-cols-2 gap-px overflow-hidden py-4 lg:grid-cols-4">
        {TRUST_STATS.map((stat, i) => (
          <Reveal
            key={stat.label}
            delay={i * 80}
            className="relative px-4 py-8 text-center lg:px-8"
          >
            {i % 2 === 1 ? (
              <span
                aria-hidden="true"
                className="absolute inset-y-6 left-0 w-px bg-border lg:hidden"
              />
            ) : null}
            {i > 0 ? (
              <span
                aria-hidden="true"
                className="absolute inset-y-6 left-0 hidden w-px bg-border lg:block"
              />
            ) : null}
            <p className="font-heading text-4xl font-bold tracking-tight text-primary tabular-nums">
              <CountUp value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-3 text-sm text-muted-foreground">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
