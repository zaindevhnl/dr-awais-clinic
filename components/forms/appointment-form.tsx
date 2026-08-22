"use client";

import { useActionState, useEffect, useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { AlertTriangle, CalendarPlus } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FieldError } from "@/components/forms/field-error";
import { createAppointment, selectDate } from "@/app/actions/appointments";
import { EMPTY_STATE } from "@/lib/forms";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";
import type { Service } from "@/types/database.types";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending} className="w-full">
      <CalendarPlus className="size-5" aria-hidden="true" />
      {pending ? "Sending request…" : "Request this appointment"}
    </Button>
  );
}

export function AppointmentForm({
  services,
  slots,
  selectedDate,
  selectedServiceId,
  blockedDates,
  today,
}: {
  services: Service[];
  slots: string[];
  selectedDate: string;
  selectedServiceId?: string;
  blockedDates: string[];
  today: string;
}) {
  const [state, formAction] = useActionState(createAppointment, EMPTY_STATE);
  const router = useRouter();
  const [, startTransition] = useTransition();
  const mountedAt = useRef(0);
  const elapsedRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const isBlocked = blockedDates.includes(selectedDate);

  return (
    <div className="grid gap-8">
      {/* Step 1 — date. Its own form so it still works without JavaScript. */}
      <form action={selectDate} className="rounded-2xl border border-border p-6">
        <h2 className="text-xl font-semibold">1. Choose a date</h2>
        <div className="mt-4 flex flex-wrap items-end gap-3">
          <div>
            <Label htmlFor="date-picker">Preferred date</Label>
            <Input
              id="date-picker"
              name="preferred_date"
              type="date"
              min={today}
              defaultValue={selectedDate}
              className="mt-1.5 w-56"
              onChange={(event) => {
                const value = event.target.value;
                if (value) {
                  startTransition(() =>
                    router.push(`/appointment?date=${value}`, { scroll: false }),
                  );
                }
              }}
            />
          </div>
          {/* Visible only without JS-driven navigation; harmless otherwise. */}
          <Button type="submit" variant="outline">
            Show available times
          </Button>
        </div>

        {isBlocked ? (
          <p role="status" className="mt-4 font-medium text-destructive">
            The clinic is closed on this date. Please choose another day.
          </p>
        ) : null}
      </form>

      {/* Step 2 + 3 — slot and details. */}
      <form
        action={formAction}
        onSubmit={() => {
          if (elapsedRef.current) {
            elapsedRef.current.value = String(
              Date.now() - (mountedAt.current || Date.now()),
            );
          }
        }}
        className="rounded-2xl border border-border p-6"
      >
        <input type="hidden" name="preferred_date" value={selectedDate} />
        <div aria-hidden="true" className="absolute -left-[9999px]">
          <label htmlFor="apt-website">Website</label>
          <input id="apt-website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <input type="hidden" name="elapsedMs" ref={elapsedRef} defaultValue="0" />

        <fieldset>
          <legend className="text-xl font-semibold">2. Choose a time</legend>
          {slots.length === 0 ? (
            <p className="mt-4 text-muted-foreground">
              No times are available on {selectedDate}. Pick another date, or call
              the clinic and we will find a slot for you.
            </p>
          ) : (
            <div
              role="radiogroup"
              aria-label="Available time slots"
              className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4"
            >
              {slots.map((slot, index) => (
                <label
                  key={slot}
                  className={cn(
                    "cursor-pointer rounded-lg border border-border px-3 py-2.5 text-center text-[0.95rem] transition-colors",
                    "has-[:checked]:border-primary has-[:checked]:bg-primary has-[:checked]:text-primary-foreground",
                    "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ring",
                  )}
                >
                  <input
                    type="radio"
                    name="preferred_time_slot"
                    value={slot}
                    defaultChecked={index === 0}
                    required
                    className="sr-only"
                  />
                  {slot}
                </label>
              ))}
            </div>
          )}
          <FieldError
            id="slot-error"
            messages={state.fieldErrors?.preferred_time_slot}
          />
        </fieldset>

        <fieldset className="mt-8">
          <legend className="text-xl font-semibold">3. Your details</legend>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="full_name">
                Full name <span aria-hidden="true">*</span>
              </Label>
              <Input
                id="full_name"
                name="full_name"
                required
                autoComplete="name"
                aria-describedby="full_name-error"
                className="mt-1.5"
              />
              <FieldError
                id="full_name-error"
                messages={state.fieldErrors?.full_name}
              />
            </div>

            <div>
              <Label htmlFor="phone">
                Phone <span aria-hidden="true">*</span>
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                inputMode="tel"
                required
                placeholder="0300 1234567"
                autoComplete="tel"
                aria-describedby="phone-error"
                className="mt-1.5"
              />
              <FieldError id="phone-error" messages={state.fieldErrors?.phone} />
            </div>

            <div>
              <Label htmlFor="email">Email (optional)</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                aria-describedby="email-error"
                className="mt-1.5"
              />
              <FieldError id="email-error" messages={state.fieldErrors?.email} />
              <p className="text-sm text-muted-foreground">
                We send your confirmation here if you provide it.
              </p>
            </div>

            <div>
              <Label htmlFor="service_id">Service (optional)</Label>
              <select
                id="service_id"
                name="service_id"
                defaultValue={selectedServiceId ?? ""}
                className="mt-1.5 h-10 w-full rounded-md border border-input bg-background px-3 text-base"
              >
                <option value="">Not sure / general consultation</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.title}
                  </option>
                ))}
              </select>
              <FieldError
                id="service-error"
                messages={state.fieldErrors?.service_id}
              />
            </div>
          </div>

          <div className="mt-2">
            <Label htmlFor="message">Anything the doctor should know?</Label>
            <Textarea
              id="message"
              name="message"
              rows={4}
              maxLength={1000}
              className="mt-1.5"
              placeholder="Briefly describe your reason for visiting."
            />
            <p className="text-sm text-muted-foreground">
              Please do not share detailed medical or test results here.
            </p>
          </div>
        </fieldset>

        <Alert className="mt-8">
          <AlertTriangle className="size-5" aria-hidden="true" />
          <AlertTitle>This form is not for medical emergencies</AlertTitle>
          <AlertDescription>
            If this is an emergency, call {SITE.emergencyLabel} (
            {SITE.emergencyNumber}) or go to your nearest emergency department
            immediately.
          </AlertDescription>
        </Alert>

        <div className="mt-5 flex items-start gap-3">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            required
            className="mt-1 size-5 rounded border-input"
            aria-describedby="consent-error"
          />
          <Label htmlFor="consent" className="font-normal leading-relaxed">
            I understand this is a request, not a confirmed booking, and that this
            form must not be used for emergencies.
          </Label>
        </div>
        <FieldError id="consent-error" messages={state.fieldErrors?.consent} />

        {state.error ? (
          <p role="alert" className="mt-4 font-medium text-destructive">
            {state.error}
          </p>
        ) : null}

        <div className="mt-6">
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
