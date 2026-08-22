"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { sendAppointmentConfirmed } from "@/lib/email";
import { referenceFor, type FormState } from "@/lib/forms";
import {
  appointmentStatusSchema,
  postSchema,
  serviceSchema,
  settingsSchema,
  testimonialSchema,
} from "@/lib/validations";

function fail(message: string, fieldErrors?: Record<string, string[]>): FormState {
  return { ok: false, error: message, fieldErrors };
}

function readingMinutes(markdown: string) {
  const words = markdown.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

/* ------------------------------------------------------------------ */
/* Appointments                                                        */
/* ------------------------------------------------------------------ */

export async function updateAppointmentStatus(formData: FormData) {
  const { supabase } = await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const parsedStatus = appointmentStatusSchema.safeParse(formData.get("status"));
  if (!id || !parsedStatus.success) return;

  const status = parsedStatus.data;

  const { data: appointment } = await supabase
    .from("appointments")
    .select("*, services(title)")
    .eq("id", id)
    .maybeSingle();

  await supabase.from("appointments").update({ status }).eq("id", id);

  // Confirming a slot is the one status change the patient hears about.
  if (status === "confirmed" && appointment?.email) {
    await sendAppointmentConfirmed({
      reference: referenceFor(appointment.id),
      full_name: appointment.full_name,
      phone: appointment.phone,
      email: appointment.email,
      preferred_date: appointment.preferred_date,
      preferred_time_slot: appointment.preferred_time_slot,
      service:
        (appointment as { services?: { title?: string } | null }).services
          ?.title ?? null,
    });
  }

  revalidatePath("/admin/appointments");
  revalidatePath("/admin");
}

export async function saveAppointmentNotes(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await supabase
    .from("appointments")
    .update({ admin_notes: String(formData.get("admin_notes") ?? "") })
    .eq("id", id);

  revalidatePath("/admin/appointments");
}

export async function deleteAppointment(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await supabase.from("appointments").delete().eq("id", id);
  revalidatePath("/admin/appointments");
  revalidatePath("/admin");
}

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export async function saveService(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const { supabase } = await requireAdmin();

  const raw = Object.fromEntries(formData.entries());
  const parsed = serviceSchema.safeParse({
    ...raw,
    is_published: formData.get("is_published") === "on",
    price_from: raw.price_from === "" ? null : raw.price_from,
    duration_minutes: raw.duration_minutes === "" ? null : raw.duration_minutes,
  });

  if (!parsed.success) {
    return fail(
      "Please check the highlighted fields.",
      parsed.error.flatten().fieldErrors as Record<string, string[]>,
    );
  }

  const id = String(formData.get("id") ?? "");
  const values = {
    ...parsed.data,
    image_url: parsed.data.image_url || null,
    icon: parsed.data.icon || null,
    short_description: parsed.data.short_description || null,
    body: parsed.data.body || null,
    price_from: parsed.data.price_from ?? null,
    duration_minutes: parsed.data.duration_minutes ?? null,
  };

  const { error } = id
    ? await supabase.from("services").update(values).eq("id", id)
    : await supabase.from("services").insert(values);

  if (error) return fail(error.message);

  revalidatePath("/services");
  revalidatePath(`/services/${parsed.data.slug}`);
  revalidatePath("/");
  revalidatePath("/admin/services");
  redirect("/admin/services");
}

export async function deleteService(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await supabase.from("services").delete().eq("id", id);
  revalidatePath("/services");
  revalidatePath("/");
  revalidatePath("/admin/services");
}

/* ------------------------------------------------------------------ */
/* Blog                                                                */
/* ------------------------------------------------------------------ */

export async function savePost(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const { supabase } = await requireAdmin();

  const parsed = postSchema.safeParse({
    ...Object.fromEntries(formData.entries()),
    is_published: formData.get("is_published") === "on",
  });

  if (!parsed.success) {
    return fail(
      "Please check the highlighted fields.",
      parsed.error.flatten().fieldErrors as Record<string, string[]>,
    );
  }

  const id = String(formData.get("id") ?? "");
  const tags = parsed.data.tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  const values = {
    slug: parsed.data.slug,
    title: parsed.data.title,
    excerpt: parsed.data.excerpt || null,
    content: parsed.data.content,
    cover_image_url: parsed.data.cover_image_url || null,
    tags,
    reading_minutes: readingMinutes(parsed.data.content),
    is_published: parsed.data.is_published,
    published_at: parsed.data.is_published ? new Date().toISOString() : null,
  };

  const { error } = id
    ? await supabase.from("posts").update(values).eq("id", id)
    : await supabase.from("posts").insert(values);

  if (error) return fail(error.message);

  revalidatePath("/blog");
  revalidatePath(`/blog/${parsed.data.slug}`);
  revalidatePath("/");
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

export async function deletePost(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await supabase.from("posts").delete().eq("id", id);
  revalidatePath("/blog");
  revalidatePath("/");
  revalidatePath("/admin/blog");
}

/* ------------------------------------------------------------------ */
/* Testimonials                                                        */
/* ------------------------------------------------------------------ */

export async function saveTestimonial(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const { supabase } = await requireAdmin();

  const parsed = testimonialSchema.safeParse({
    ...Object.fromEntries(formData.entries()),
    is_approved: formData.get("is_approved") === "on",
  });

  if (!parsed.success) {
    return fail(
      "Please check the highlighted fields.",
      parsed.error.flatten().fieldErrors as Record<string, string[]>,
    );
  }

  const id = String(formData.get("id") ?? "");
  const { error } = id
    ? await supabase.from("testimonials").update(parsed.data).eq("id", id)
    : await supabase.from("testimonials").insert(parsed.data);

  if (error) return fail(error.message);

  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  return { ok: true };
}

export async function setTestimonialApproval(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const approve = formData.get("approve") === "true";
  if (!id) return;

  await supabase
    .from("testimonials")
    .update({ is_approved: approve })
    .eq("id", id);

  revalidatePath("/");
  revalidatePath("/admin/testimonials");
}

export async function deleteTestimonial(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await supabase.from("testimonials").delete().eq("id", id);
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
}

/* ------------------------------------------------------------------ */
/* Settings                                                            */
/* ------------------------------------------------------------------ */

export async function saveSettings(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const { supabase } = await requireAdmin();

  const parsed = settingsSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return fail(
      "Please check the highlighted fields.",
      parsed.error.flatten().fieldErrors as Record<string, string[]>,
    );
  }

  const { error } = await supabase
    .from("site_settings")
    .upsert({ id: 1, ...parsed.data });

  if (error) return fail(error.message);

  revalidatePath("/", "layout");
  revalidatePath("/admin/settings");
  return { ok: true };
}

/* ------------------------------------------------------------------ */
/* Contact messages                                                    */
/* ------------------------------------------------------------------ */

export async function markMessageRead(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await supabase.from("contact_messages").update({ is_read: true }).eq("id", id);
  revalidatePath("/admin");
}
