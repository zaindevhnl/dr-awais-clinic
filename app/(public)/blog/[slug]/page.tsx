import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Markdown } from "@/components/markdown";
import { JsonLd, articleLd, breadcrumbLd } from "@/components/seo/json-ld";
import { getPostBySlug, getPosts,
  getPublishedPostSlugs,
} from "@/lib/data";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getPublishedPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Article not found" };

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt ?? undefined,
      url: `/blog/${post.slug}`,
      publishedTime: post.published_at ?? undefined,
      images: [post.cover_image_url || "/placeholder-wide.svg"],
    },
  };
}

export default async function BlogPostPage({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const date = post.published_at ?? post.created_at;

  return (
    <>
      <JsonLd data={articleLd(post)} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Health articles", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />

      <article className="section">
        <div className="container-page max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-muted-foreground hover:underline"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            All articles
          </Link>

          <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl">
            {post.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-muted-foreground">
            <time dateTime={date}>{format(new Date(date), "d MMMM yyyy")}</time>
            {post.reading_minutes ? (
              <span>· {post.reading_minutes} min read</span>
            ) : null}
          </div>

          {post.tags?.length ? (
            <ul className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <li key={tag}>
                  <Link href={`/blog?tag=${encodeURIComponent(tag)}`}>
                    <Badge variant="secondary">{tag}</Badge>
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}

          <Image
            src={post.cover_image_url || "/placeholder-wide.svg"}
            alt=""
            width={1200}
            height={630}
            priority
            sizes="(max-width: 768px) 92vw, 720px"
            className="mt-8 aspect-[16/9] w-full rounded-2xl border border-border object-cover"
          />

          <div className="mt-10">
            <Markdown>{post.content}</Markdown>
          </div>

          <aside className="mt-14 rounded-2xl border border-border bg-surface p-6">
            <p className="text-muted-foreground">
              This article is general information and is not a substitute for a
              consultation. If you have a specific concern, book an appointment.
            </p>
            <Button asChild className="mt-5">
              <Link href="/appointment">Book an appointment</Link>
            </Button>
          </aside>
        </div>
      </article>
    </>
  );
}
