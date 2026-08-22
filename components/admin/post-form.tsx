"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FieldError } from "@/components/forms/field-error";
import { MarkdownEditor } from "@/components/admin/markdown-editor";
import { savePost } from "@/app/actions/admin";
import { EMPTY_STATE } from "@/lib/forms";
import type { Post } from "@/types/database.types";

function SubmitButton({ isNew }: { isNew: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending}>
      {pending ? "Saving…" : isNew ? "Create post" : "Save changes"}
    </Button>
  );
}

export function PostForm({ post }: { post?: Post }) {
  const [state, formAction] = useActionState(savePost, EMPTY_STATE);

  return (
    <form action={formAction} className="mt-8 grid gap-5">
      {post ? <input type="hidden" name="id" value={post.id} /> : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            required
            defaultValue={post?.title}
            className="mt-1.5"
          />
          <FieldError id="title-error" messages={state.fieldErrors?.title} />
        </div>
        <div>
          <Label htmlFor="slug">URL slug</Label>
          <Input
            id="slug"
            name="slug"
            required
            defaultValue={post?.slug}
            placeholder="managing-blood-pressure"
            className="mt-1.5"
          />
          <FieldError id="slug-error" messages={state.fieldErrors?.slug} />
        </div>
      </div>

      <div>
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          name="excerpt"
          rows={2}
          defaultValue={post?.excerpt ?? ""}
          className="mt-1.5"
        />
        <FieldError id="excerpt-error" messages={state.fieldErrors?.excerpt} />
      </div>

      <MarkdownEditor
        name="content"
        label="Content"
        defaultValue={post?.content ?? ""}
      />
      <FieldError id="content-error" messages={state.fieldErrors?.content} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="cover_image_url">Cover image URL</Label>
          <Input
            id="cover_image_url"
            name="cover_image_url"
            type="url"
            defaultValue={post?.cover_image_url ?? ""}
            placeholder="https://…"
            className="mt-1.5"
          />
          <FieldError
            id="cover_image_url-error"
            messages={state.fieldErrors?.cover_image_url}
          />
        </div>
        <div>
          <Label htmlFor="tags">Tags (comma separated)</Label>
          <Input
            id="tags"
            name="tags"
            defaultValue={post?.tags?.join(", ") ?? ""}
            className="mt-1.5"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input
          id="is_published"
          name="is_published"
          type="checkbox"
          defaultChecked={post?.is_published ?? false}
          className="size-5 rounded border-input"
        />
        <Label htmlFor="is_published" className="font-normal">
          Published (visible on the website)
        </Label>
      </div>

      {state.error ? (
        <p role="alert" className="font-medium text-destructive">
          {state.error}
        </p>
      ) : null}

      <div>
        <SubmitButton isNew={!post} />
      </div>
    </form>
  );
}
