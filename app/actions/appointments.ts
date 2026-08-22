"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { referenceFor, type FormState } from "@/lib/forms";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendAppointmentEmails } from "@/lib/email";
import { getAvailableSlots } from "@/lib/data";
import {
  MIN_FORM_SECONDS,
  appointmentSchema,
  quickBookingSchema,
} from "@/lib/validations";

export async function createAppointment(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = appointmentSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!parsed.success) {
    return {
      ok: false,
      error: "Please check the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<
        string,
        string[]
      >,
    };
  }

  const data = parsed.data;

  // Honeypot + minimum time-on-form.
  if (data.website) return { ok: false, error: "Submission rejected." };
  if (data.elapsedMs && data.elapsedMs < MIN_FORM_SECONDS * 1000) {
    return { ok: false, error: "That was too quick — please try again." };
  }

  const limit = await checkRateLimit("appointment");
  if (!limit.ok) {
    return {
      ok: false,
      error: `Too many requests from this connection. Please try again in ${limit.retryAfterMinutes} minutes, or call the clinic.`,
    };
  }

  // Re-check the slot server-side: the page may be stale.
  const openSlots = await getAvailableSlots(data.preferred_date);
  if (openSlots.length > 0 && !openSlots.includes(data.preferred_time_slot)) {
    return {
      ok: false,
      error: "That slot was just taken. Please pick another time.",
      fieldErrors: { preferred_time_slot: ["No longer available"] },
    };
  }

  const supabase = await createClient();
  const { data: inserted, error } = await supabase
    .from("appointments")
    .insert({
      full_name: data.full_name,
      phone: data.phone,
      email: data.email,
      service_id: data.service_id,
      preferred_date: data.preferred_date,
      preferred_time_slot: data.preferred_time_slot,
      message: data.message || null,
    })
    .select("id")
    .single();

  if (error || !inserted) {
    console.error("[appointments] insert failed:", error);
    return {
      ok: false,
      error:
        "We could not save your request. Please call the clinic directly and we will book you in.",
    };
  }

  const reference = referenceFor(inserted.id);

  let serviceTitle: string | null = null;
  if (data.service_id) {
    const { data: service } = await supabase
      .from("services")
      .select("title")
      .eq("id", data.service_id)
      .maybeSingle();
    serviceTitle = service?.title ?? null;
  }

  await sendAppointmentEmails({
    reference,
    full_name: data.full_name,
    phone: data.phone,
    email: data.email,
    preferred_date: data.preferred_date,
    preferred_time_slot: data.preferred_time_slot,
    service: serviceTitle,
    message: data.message,
  });

  revalidatePath("/admin/appointments");
  redirect(`/appointment/success?ref=${reference}`);
}

/** Home-page CTA band: name + phone + date, slot assigned by the clinic. */
export async function createQuickAppointment(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = quickBookingSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!parsed.success) {
    return {
      ok: false,
      error: "Please check the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<
        string,
        string[]
      >,
    };
  }

  const data = parsed.data;
  if (data.website) return { ok: false, error: "Submission rejected." };

  const limit = await checkRateLimit("appointment");
  if (!limit.ok) {
    return {
      ok: false,
      error: `Too many requests from this connection. Please try again in ${limit.retryAfterMinutes} minutes, or call the clinic.`,
    };
  }

  const supabase = await createClient();
  const { data: inserted, error } = await supabase
    .from("appointments")
    .insert({
      full_name: data.full_name,
      phone: data.phone,
      preferred_date: data.preferred_date,
      preferred_time_slot: "To be confirmed",
      message: "Requested via the home-page quick form.",
    })
    .select("id")
    .single();

  if (error || !inserted) {
    console.error("[appointments] quick insert failed:", error);
    return { ok: false, error: "Something went wrong. Please call the clinic." };
  }

  const reference = referenceFor(inserted.id);

  await sendAppointmentEmails({
    reference,
    full_name: data.full_name,
    phone: data.phone,
    preferred_date: data.preferred_date,
    preferred_time_slot: "To be confirmed",
  });

  revalidatePath("/admin/appointments");
  redirect(`/appointment/success?ref=${reference}`);
}

/** Progressive-enhancement helper: reload the page with the chosen date. */
export async function selectDate(formData: FormData) {
  const date = String(formData.get("preferred_date") ?? "");
  redirect(`/appointment?date=${encodeURIComponent(date)}`);
}
