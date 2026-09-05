import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, PencilLine } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getContentStatus } from "@/lib/content";

export const metadata: Metadata = { title: "Website text" };

export default async function ContentIndexPage() {
  const groups = await getContentStatus();

  // Grouped by where the copy appears, so the list reads like the site.
  const byPage = groups.reduce<Record<string, typeof groups>>((acc, group) => {
    (acc[group.page] ??= []).push(group);
    return acc;
  }, {});

  return (
    <>
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Website text</h1>
        <p className="mt-2 text-muted-foreground">
          Edit the wording on the public site. Every section can be put back to how it started,
          and changes go live as soon as you save.
        </p>
      </header>

      <div className="space-y-8">
        {Object.entries(byPage).map(([page, pageGroups]) => (
          <section key={page}>
            <h2 className="mb-3 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
              {page}
            </h2>
            <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
              {pageGroups.map((group) => (
                <li key={group.key}>
                  <Link
                    href={`/admin/content/${group.key}`}
                    className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-secondary"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
                      <PencilLine className="size-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold">{group.title}</span>
                        {group.edited && <Badge variant="secondary">Edited</Badge>}
                      </span>
                      <span className="mt-0.5 block text-sm text-muted-foreground">
                        {group.description}
                      </span>
                    </span>
                    <ChevronRight className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
