"use server";

import { createClient } from "@/lib/supabase/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendContactNotification } from "@/lib/email";
import { MIN_FORM_SECONDS, contactSchema } from "@/lib/validations";
import type { FormState } from "@/lib/forms";

export async function sendContactMessage(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = contactSchema.safeParse(Object.fromEntries(formData.entries()));

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
  if (data.elapsedMs && data.elapsedMs < MIN_FORM_SECONDS * 1000) {
    return { ok: false, error: "That was too quick — please try again." };
  }

  const limit = await checkRateLimit("contact");
  if (!limit.ok) {
    return {
      ok: false,
      error: `Too many messages from this connection. Please try again in ${limit.retryAfterMinutes} minutes.`,
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("contact_messages").insert({
    name: data.name,
    email: data.email,
    subject: data.subject || null,
    message: data.message,
  });

  if (error) {
    console.error("[contact] insert failed:", error);
    return { ok: false, error: "We could not send your message. Please call us." };
  }

  await sendContactNotification({
    name: data.name,
    email: data.email,
    subject: data.subject,
    message: data.message,
  });

  return { ok: true };
}
