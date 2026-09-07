"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { FolderPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createSection } from "@/app/actions/gallery";
import { EMPTY_STATE } from "@/lib/forms";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="outline" disabled={pending}>
      <FolderPlus className="size-4" aria-hidden="true" />
      {pending ? "Adding…" : "Add section"}
    </Button>
  );
}

export function SectionCreateForm() {
  const [state, formAction] = useActionState(createSection, EMPTY_STATE);
  const formRef = useRef<HTMLFormElement>(null);

  // Clear the fields once the section exists, ready for the next one.
  useEffect(() => {
    if (state.ok) formRef.current?.reset();
  }, [state.ok]);

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h2 className="text-lg font-semibold">Sections</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Group photographs the way patients would look for them — theatre, hospitals,
        conferences, teaching. Each section becomes a heading on the gallery page.
      </p>

      <form
        ref={formRef}
        action={formAction}
        className="mt-4 grid gap-3 sm:grid-cols-[1fr_1.5fr_auto] sm:items-end"
      >
        <div>
          <Label htmlFor="new-section-title" className="mb-1.5 text-sm">
            Name
          </Label>
          <Input id="new-section-title" name="title" placeholder="Theatre" required />
        </div>
        <div>
          <Label htmlFor="new-section-description" className="mb-1.5 text-sm">
            Description (optional)
          </Label>
          <Input
            id="new-section-description"
            name="description"
            placeholder="Inside the operating room"
          />
        </div>
        <SubmitButton />
      </form>

      {state.error && (
        <p role="alert" className="mt-3 text-sm text-destructive">
          {state.error}
        </p>
      )}
    </div>
  );
}
