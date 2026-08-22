"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FieldError } from "@/components/forms/field-error";
import { sendContactMessage } from "@/app/actions/contact";
import { EMPTY_STATE } from "@/lib/forms";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
      <Send className="size-4" aria-hidden="true" />
      {pending ? "Sending…" : "Send message"}
    </Button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(sendContactMessage, EMPTY_STATE);
  const mountedAt = useRef(0);
  const elapsedRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  if (state.ok) {
    return (
      <div
        role="status"
        className="rounded-2xl border border-border bg-surface p-8 text-center"
      >
        <CheckCircle2 className="mx-auto size-12 text-primary" aria-hidden="true" />
        <h2 className="mt-4 text-2xl font-bold">Message sent</h2>
        <p className="mt-2 text-muted-foreground">
          Thank you — the clinic will get back to you. For anything urgent, please
          call instead.
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      onSubmit={() => {
        if (elapsedRef.current) {
          elapsedRef.current.value = String(
            Date.now() - (mountedAt.current || Date.now()),
          );
        }
      }}
      className="rounded-2xl border border-border p-6 sm:p-8"
    >
      <h2 className="text-2xl font-bold">Send a message</h2>

      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="elapsedMs" ref={elapsedRef} defaultValue="0" />

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">
            Your name <span aria-hidden="true">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            required
            autoComplete="name"
            aria-describedby="name-error"
            className="mt-1.5"
          />
          <FieldError id="name-error" messages={state.fieldErrors?.name} />
        </div>
        <div>
          <Label htmlFor="contact-email">
            Email <span aria-hidden="true">*</span>
          </Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            aria-describedby="contact-email-error"
            className="mt-1.5"
          />
          <FieldError id="contact-email-error" messages={state.fieldErrors?.email} />
        </div>
      </div>

      <div>
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" name="subject" className="mt-1.5" />
      </div>

      <div className="mt-4">
        <Label htmlFor="contact-message">
          Message <span aria-hidden="true">*</span>
        </Label>
        <Textarea
          id="contact-message"
          name="message"
          rows={6}
          required
          maxLength={2000}
          aria-describedby="contact-message-error"
          className="mt-1.5"
        />
        <FieldError
          id="contact-message-error"
          messages={state.fieldErrors?.message}
        />
        <p className="text-sm text-muted-foreground">
          Please do not include medical details or test results.
        </p>
      </div>

      {state.error ? (
        <p role="alert" className="mt-3 font-medium text-destructive">
          {state.error}
        </p>
      ) : null}

      <div className="mt-6">
        <SubmitButton />
      </div>
    </form>
  );
}
