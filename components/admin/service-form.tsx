"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FieldError } from "@/components/forms/field-error";
import { ICON_NAMES } from "@/components/icon";
import { saveService } from "@/app/actions/admin";
import { EMPTY_STATE } from "@/lib/forms";
import type { Service } from "@/types/database.types";

function SubmitButton({ isNew }: { isNew: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending}>
      {pending ? "Saving…" : isNew ? "Create service" : "Save changes"}
    </Button>
  );
}

export function ServiceForm({ service }: { service?: Service }) {
  const [state, formAction] = useActionState(saveService, EMPTY_STATE);

  return (
    <form action={formAction} className="mt-8 grid gap-5">
      {service ? <input type="hidden" name="id" value={service.id} /> : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            required
            defaultValue={service?.title}
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
            defaultValue={service?.slug}
            placeholder="general-consultation"
            className="mt-1.5"
          />
          <FieldError id="slug-error" messages={state.fieldErrors?.slug} />
        </div>
      </div>

      <div>
        <Label htmlFor="short_description">Short description</Label>
        <Input
          id="short_description"
          name="short_description"
          defaultValue={service?.short_description ?? ""}
          className="mt-1.5"
        />
        <FieldError
          id="short_description-error"
          messages={state.fieldErrors?.short_description}
        />
      </div>

      <div>
        <Label htmlFor="body">Full description (markdown)</Label>
        <Textarea
          id="body"
          name="body"
          rows={12}
          defaultValue={service?.body ?? ""}
          className="mt-1.5 font-mono text-sm"
        />
        <FieldError id="body-error" messages={state.fieldErrors?.body} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Label htmlFor="icon">Icon</Label>
          <select
            id="icon"
            name="icon"
            defaultValue={service?.icon ?? ""}
            className="mt-1.5 h-10 w-full rounded-md border border-input bg-background px-3"
          >
            <option value="">Default</option>
            {ICON_NAMES.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="duration_minutes">Duration (minutes)</Label>
          <Input
            id="duration_minutes"
            name="duration_minutes"
            type="number"
            min={5}
            max={480}
            defaultValue={service?.duration_minutes ?? ""}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="price_from">Price from</Label>
          <Input
            id="price_from"
            name="price_from"
            type="number"
            min={0}
            step="0.01"
            defaultValue={service?.price_from ?? ""}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="display_order">Display order</Label>
          <Input
            id="display_order"
            name="display_order"
            type="number"
            min={0}
            defaultValue={service?.display_order ?? 0}
            className="mt-1.5"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="image_url">Image URL</Label>
        <Input
          id="image_url"
          name="image_url"
          type="url"
          defaultValue={service?.image_url ?? ""}
          placeholder="https://…"
          className="mt-1.5"
        />
        <FieldError id="image_url-error" messages={state.fieldErrors?.image_url} />
      </div>

      <div className="flex items-center gap-3">
        <input
          id="is_published"
          name="is_published"
          type="checkbox"
          defaultChecked={service?.is_published ?? true}
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
        <SubmitButton isNew={!service} />
      </div>
    </form>
  );
}
