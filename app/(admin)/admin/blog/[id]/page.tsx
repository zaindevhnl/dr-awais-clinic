import { notFound } from "next/navigation";
import { PostForm } from "@/components/admin/post-form";
import { requireAdmin } from "@/lib/auth";
import type { Post } from "@/types/database.types";

export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
}: PageProps<"/admin/blog/[id]">) {
  const { supabase } = await requireAdmin();
  const { id } = await params;

  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!data) notFound();

  return (
    <>
      <h1 className="text-3xl font-bold">Edit post</h1>
      <PostForm post={data as Post} />
    </>
  );
}
