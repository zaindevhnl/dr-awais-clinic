import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/sections/section-heading";
import type { Post } from "@/types/database.types";

export function PostCard({ post }: { post: Post }) {
  const date = post.published_at ?? post.created_at;
  return (
    <Card className="h-full overflow-hidden pt-0 transition-shadow hover:shadow-md">
      <Image
        src={post.cover_image_url || "/placeholder-wide.svg"}
        alt=""
        width={1200}
        height={630}
        sizes="(max-width: 768px) 92vw, 380px"
        className="aspect-[16/9] w-full object-cover"
      />
      <CardContent className="flex h-full flex-col">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <time dateTime={date}>{format(new Date(date), "d MMM yyyy")}</time>
          {post.reading_minutes ? (
            <span>· {post.reading_minutes} min read</span>
          ) : null}
        </div>
        <h3 className="mt-2 text-xl font-semibold">
          <Link href={`/blog/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-muted-foreground">{post.excerpt}</p>
        {post.tags?.length ? (
          <ul className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li key={tag}>
                <Badge variant="secondary">{tag}</Badge>
              </li>
            ))}
          </ul>
        ) : null}
      </CardContent>
    </Card>
  );
}

export function LatestPosts({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="section">
      <div className="container-page">
        <SectionHeading
          eyebrow="Health articles"
          title="Latest from the clinic"
          description="[General health information — not a substitute for a consultation.]"
        />

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal as="li" key={post.id} delay={i * 90}>
              <PostCard post={post} />
            </Reveal>
          ))}
        </ul>

        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/blog">
              Read all articles
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
