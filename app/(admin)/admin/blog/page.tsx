import Link from "next/link";
import { format } from "date-fns";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { deletePost } from "@/app/actions/admin";
import { requireAdmin } from "@/lib/auth";
import type { Post } from "@/types/database.types";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  const posts = (data ?? []) as Post[];

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Blog</h1>
        <Button asChild>
          <Link href="/admin/blog/new">
            <Plus className="size-4" aria-hidden="true" />
            New post
          </Link>
        </Button>
      </div>

      {posts.length === 0 ? (
        <p className="mt-8 text-muted-foreground">No posts yet.</p>
      ) : (
        <ul className="mt-8 space-y-3">
          {posts.map((post) => (
            <li key={post.id}>
              <Card>
                <CardContent className="flex flex-wrap items-center gap-4">
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium">{post.title}</span>
                    <span className="block truncate text-sm text-muted-foreground">
                      /blog/{post.slug} ·{" "}
                      {format(new Date(post.published_at ?? post.created_at), "d MMM yyyy")}
                    </span>
                  </span>
                  <Badge variant={post.is_published ? "default" : "outline"}>
                    {post.is_published ? "Published" : "Draft"}
                  </Badge>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/admin/blog/${post.id}`}>Edit</Link>
                  </Button>
                  <form action={deletePost}>
                    <input type="hidden" name="id" value={post.id} />
                    <Button
                      type="submit"
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                    >
                      Delete
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
