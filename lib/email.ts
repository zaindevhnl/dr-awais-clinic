import "server-only";
import { Resend } from "resend";
import { SITE } from "@/lib/site";

const apiKey = process.env.RESEND_API_KEY;
const from = process.env.EMAIL_FROM ?? "Clinic <onboarding@resend.dev>";
const clinicInbox = process.env.CLINIC_NOTIFICATION_EMAIL;

const resend = apiKey ? new Resend(apiKey) : null;

type SendArgs = { to: string; subject: string; html: string };

/** Never throws: a failed email must not fail the patient's booking. */
async function send({ to, subject, html }: SendArgs) {
  if (!resend) {
    console.warn(`[email] RESEND_API_KEY missing — skipped "${subject}" to ${to}`);
    return { skipped: true as const };
  }
  try {
    await resend.emails.send({ from, to, subject, html });
    return { skipped: false as const };
  } catch (error) {
    console.error("[email] send failed:", error);
    return { skipped: true as const };
  }
}

function layout(title: string, rows: [string, string][], footer?: string) {
  const cells = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#556;white-space:nowrap">${k}</td><td style="padding:6px 0;font-weight:600">${escapeHtml(v)}</td></tr>`,
    )
    .join("");
  return `<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;font-size:16px;line-height:1.6;color:#122">
    <h2 style="margin:0 0 16px">${escapeHtml(title)}</h2>
    <table style="border-collapse:collapse">${cells}</table>
    ${footer ? `<p style="margin-top:20px;color:#556;font-size:14px">${footer}</p>` : ""}
  </div>`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export type AppointmentEmailData = {
  reference: string;
  full_name: string;
  phone: string;
  email?: string | null;
  preferred_date: string;
  preferred_time_slot: string;
  service?: string | null;
  message?: string | null;
};

export async function sendAppointmentEmails(data: AppointmentEmailData) {
  const rows: [string, string][] = [
    ["Reference", data.reference],
    ["Name", data.full_name],
    ["Phone", data.phone],
    ["Date", data.preferred_date],
    ["Time", data.preferred_time_slot],
    ["Service", data.service ?? "—"],
  ];

  if (data.email) {
    await send({
      to: data.email,
      subject: "We received your appointment request",
      html: layout("Appointment request received", rows,
        `We will confirm this slot by phone shortly. This is a request, not a confirmed booking.<br><br>
         For a medical emergency, call ${SITE.emergencyLabel} (${SITE.emergencyNumber}) or go to your nearest emergency department.`),
    });
  }

  if (clinicInbox) {
    await send({
      to: clinicInbox,
      subject: `New appointment request — ${data.full_name}`,
      html: layout("New appointment request", [
        ...rows,
        ["Email", data.email ?? "—"],
        ["Message", data.message ?? "—"],
      ], `Manage it at ${SITE.url}/admin/appointments`),
    });
  }
}

export async function sendAppointmentConfirmed(data: AppointmentEmailData) {
  if (!data.email) return;
  await send({
    to: data.email,
    subject: "Your appointment is confirmed",
    html: layout("Appointment confirmed", [
      ["Reference", data.reference],
      ["Name", data.full_name],
      ["Date", data.preferred_date],
      ["Time", data.preferred_time_slot],
      ["Service", data.service ?? "—"],
    ], "Please arrive 10 minutes early. To reschedule, reply to this email or call the clinic."),
  });
}

export async function sendContactNotification(data: {
  name: string;
  email: string;
  subject?: string | null;
  message: string;
}) {
  if (!clinicInbox) return;
  await send({
    to: clinicInbox,
    subject: `New website message — ${data.name}`,
    html: layout("New contact message", [
      ["Name", data.name],
      ["Email", data.email],
      ["Subject", data.subject ?? "—"],
      ["Message", data.message],
    ]),
  });
}
