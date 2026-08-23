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
      <div className="container-page grid grid-cols-1 gap-px overflow-hidden py-4 sm:grid-cols-3">
        {TRUST_STATS.map((stat, i) => (
          <Reveal
            key={stat.label}
            delay={i * 80}
            className="relative px-4 py-8 text-center lg:px-8"
          >
            {/* Divider between columns only; never before the first. */}
            {i > 0 ? (
              <span
                aria-hidden="true"
                className="absolute inset-x-8 top-0 h-px bg-border sm:inset-x-auto sm:inset-y-6 sm:left-0 sm:h-auto sm:w-px"
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
