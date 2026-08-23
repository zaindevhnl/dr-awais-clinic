"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError } from "@/components/forms/field-error";
import { createQuickAppointment } from "@/app/actions/appointments";
import { EMPTY_STATE } from "@/lib/forms";
import { SITE } from "@/lib/site";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    // `cta` is the reserved highest-intent variant; this is the one
    // place on the page that uses it.
    <Button
      type="submit"
      size="lg"
      variant="cta"
      block
      loading={pending}
      loadingText="Sending…"
      className="sm:w-auto"
    >
      <CalendarPlus aria-hidden="true" />
      Request appointment
    </Button>
  );
}

/** Full-width high-contrast band with the shortest possible booking form. */
export function BookingCta() {
  const [state, formAction] = useActionState(
    createQuickAppointment,
    EMPTY_STATE,
  );
  const mountedAt = useRef<number>(0);
  const elapsedRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const today = new Date().toISOString().slice(0, 10);

  return (
    <section className="relative isolate overflow-hidden bg-primary text-primary-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-24 -z-10 size-[30rem] rounded-full bg-primary-foreground/6 blur-3xl"
      />
      <div className="container-page py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to see the doctor?
            </h2>
            <p className="measure mt-5 text-lg text-primary-foreground/90">
              Leave your name, phone number and a preferred date. The clinic will
              call you back to confirm the exact time.
            </p>
            <p className="measure mt-5 rounded-lg bg-primary-foreground/10 px-4 py-3 text-sm text-primary-foreground/90">
              For a medical emergency, call {SITE.emergencyLabel} (
              {SITE.emergencyNumber}) instead — do not use this form.
            </p>
          </div>

          <form
            action={formAction}
            onSubmit={() => {
              if (elapsedRef.current) {
                elapsedRef.current.value = String(
                  Date.now() - (mountedAt.current || Date.now()),
                );
              }
            }}
            className="rounded-3xl border border-border bg-background p-6 text-foreground shadow-xl sm:p-8"
          >
            <h3 className="text-xl font-semibold tracking-tight">
              Quick booking request
            </h3>

            {/* Honeypot — hidden from users, must stay empty. */}
            <div aria-hidden="true" className="absolute -left-[9999px]">
              <label htmlFor="cta-website">Website</label>
              <input
                id="cta-website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            <input type="hidden" name="elapsedMs" ref={elapsedRef} defaultValue="0" />

            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              <div>
                <Label htmlFor="cta-name">Full name</Label>
                <Input
                  id="cta-name"
                  name="full_name"
                  required
                  autoComplete="name"
                  aria-describedby="cta-name-error"
                  className="mt-2"
                />
                <FieldError
                  id="cta-name-error"
                  messages={state.fieldErrors?.full_name}
                />
              </div>
              <div>
                <Label htmlFor="cta-phone">Phone</Label>
                <Input
                  id="cta-phone"
                  name="phone"
                  type="tel"
                  required
                  inputMode="tel"
                  placeholder="0300 1234567"
                  autoComplete="tel"
                  aria-describedby="cta-phone-error"
                  className="mt-2"
                />
                <FieldError
                  id="cta-phone-error"
                  messages={state.fieldErrors?.phone}
                />
              </div>
              <div>
                <Label htmlFor="cta-date">Preferred date</Label>
                <Input
                  id="cta-date"
                  name="preferred_date"
                  type="date"
                  required
                  min={today}
                  defaultValue={today}
                  aria-describedby="cta-date-error"
                  className="mt-2"
                />
                <FieldError
                  id="cta-date-error"
                  messages={state.fieldErrors?.preferred_date}
                />
              </div>
            </div>

            {state.error ? (
              <p
                role="alert"
                className="mt-4 rounded-lg bg-destructive-subtle px-4 py-3 text-sm font-medium text-destructive"
              >
                {state.error}
              </p>
            ) : null}

            <div className="mt-8">
              <SubmitButton />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
