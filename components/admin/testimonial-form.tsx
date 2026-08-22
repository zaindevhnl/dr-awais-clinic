"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FieldError } from "@/components/forms/field-error";
import { saveTestimonial } from "@/app/actions/admin";
import { EMPTY_STATE } from "@/lib/forms";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving…" : "Add testimonial"}
    </Button>
  );
}

export function TestimonialForm() {
  const [state, formAction] = useActionState(saveTestimonial, EMPTY_STATE);

  return (
    <form action={formAction} className="mt-5 grid gap-4">
      <div className="grid gap-4 sm:grid-cols-[2fr_1fr_1fr]">
        <div>
          <Label htmlFor="patient_name">Patient name</Label>
          <Input id="patient_name" name="patient_name" required className="mt-1.5" />
          <FieldError
            id="patient_name-error"
            messages={state.fieldErrors?.patient_name}
          />
          <p className="text-sm text-muted-foreground">
            Shown publicly as first name + last initial.
          </p>
        </div>
        <div>
          <Label htmlFor="rating">Rating</Label>
          <Input
            id="rating"
            name="rating"
            type="number"
            min={1}
            max={5}
            defaultValue={5}
            required
            className="mt-1.5"
          />
          <FieldError id="rating-error" messages={state.fieldErrors?.rating} />
        </div>
        <div>
          <Label htmlFor="display_order">Order</Label>
          <Input
            id="display_order"
            name="display_order"
            type="number"
            min={0}
            defaultValue={0}
            className="mt-1.5"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="quote">Quote</Label>
        <Textarea id="quote" name="quote" rows={3} required className="mt-1.5" />
        <FieldError id="quote-error" messages={state.fieldErrors?.quote} />
      </div>

      <div className="flex items-center gap-3">
        <input
          id="is_approved"
          name="is_approved"
          type="checkbox"
          className="size-5 rounded border-input"
        />
        <Label htmlFor="is_approved" className="font-normal">
          Publish immediately (patient has consented)
        </Label>
      </div>

      {state.error ? (
        <p role="alert" className="font-medium text-destructive">
          {state.error}
        </p>
      ) : null}
      {state.ok ? (
        <p role="status" className="font-medium text-primary">
          Testimonial saved.
        </p>
      ) : null}

      <div>
        <SubmitButton />
      </div>
    </form>
  );
}
