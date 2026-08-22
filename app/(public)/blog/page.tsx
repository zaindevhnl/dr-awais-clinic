import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/sections/latest-posts";
import { Reveal } from "@/components/reveal";
import { JsonLd, breadcrumbLd } from "@/components/seo/json-ld";
import { POSTS_PER_PAGE, getAllTags, getPosts } from "@/lib/data";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Health articles",
  description:
    "[Blog index meta description placeholder — general health information from the clinic.]",
  alternates: { canonical: "/blog" },
  openGraph: { url: "/blog", images: ["/placeholder-wide.svg"] },
};

export default async function BlogIndexPage({
  searchParams,
}: PageProps<"/blog">) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const tag = typeof params.tag === "string" ? params.tag : undefined;

  const [{ posts, total }, tags] = await Promise.all([
    getPosts({ page, tag }),
    getAllTags(),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE));
  const linkFor = (nextPage: number) =>
    `/blog?${new URLSearchParams({
      ...(tag ? { tag } : {}),
      ...(nextPage > 1 ? { page: String(nextPage) } : {}),
    }).toString()}`;

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Health articles", path: "/blog" },
        ])}
      />

      <section className="border-b border-border bg-surface">
        <div className="container-page py-14 text-center sm:py-16">
          <h1 className="text-4xl font-bold sm:text-5xl">Health articles</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            [Placeholder intro. General information only — not a substitute for a
            consultation.]
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          {tags.length > 0 ? (
            <nav aria-label="Filter by topic" className="flex flex-wrap gap-2">
              <Link href="/blog">
                <Badge variant={tag ? "outline" : "default"}>All topics</Badge>
              </Link>
              {tags.map((t) => (
                <Link key={t} href={`/blog?tag=${encodeURIComponent(t)}`}>
                  <Badge variant={tag === t ? "default" : "outline"}>{t}</Badge>
                </Link>
              ))}
            </nav>
          ) : null}

          {posts.length === 0 ? (
            <p className="mt-14 text-center text-muted-foreground">
              No articles published yet.
            </p>
          ) : (
            <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <Reveal as="li" key={post.id} delay={(i % 3) * 80}>
                  <PostCard post={post} />
                </Reveal>
              ))}
            </ul>
          )}

          {totalPages > 1 ? (
            <nav
              aria-label="Pagination"
              className="mt-12 flex items-center justify-center gap-4"
            >
              <Button asChild variant="outline" disabled={page <= 1}>
                <Link
                  href={linkFor(page - 1)}
                  aria-disabled={page <= 1}
                  tabIndex={page <= 1 ? -1 : undefined}
                >
                  Previous
                </Link>
              </Button>
              <p aria-live="polite" className="text-muted-foreground">
                Page {page} of {totalPages}
              </p>
              <Button asChild variant="outline" disabled={page >= totalPages}>
                <Link
                  href={linkFor(page + 1)}
                  aria-disabled={page >= totalPages}
                  tabIndex={page >= totalPages ? -1 : undefined}
                >
                  Next
                </Link>
              </Button>
            </nav>
          ) : null}
        </div>
      </section>
    </>
  );
}
