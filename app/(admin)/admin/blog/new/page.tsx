import { PostForm } from "@/components/admin/post-form";
import { requireAdmin } from "@/lib/auth";

export default async function NewPostPage() {
  await requireAdmin();

  return (
    <>
      <h1 className="text-3xl font-bold">New post</h1>
      <PostForm />
    </>
  );
}
