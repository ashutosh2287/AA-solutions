import { Resend } from "resend";

import { site } from "@/content/site";
import type { ContactSubmission } from "@/lib/validators";

const fromAddress =
  process.env.CONTACT_FROM_EMAIL ?? `KL Solutions <onboarding@resend.dev>`;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Removes CR/LF so user input can never inject extra email headers. */
function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export interface EmailResult {
  ok: boolean;
  /** Present only when the send failed. */
  error?: string;
}

/**
 * Sends the internal notification and the visitor's auto-reply.
 *
 * Returns a result instead of throwing so the route handler can log the real
 * error and still show the visitor a generic message.
 */
export async function sendContactEmails(
  submission: ContactSubmission,
): Promise<EmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    if (process.env.NODE_ENV === "production") {
      console.error("[contact] RESEND_API_KEY or CONTACT_TO_EMAIL is not configured.");
      return { ok: false, error: "email_not_configured" };
    }

    console.warn("[contact] Email is not configured — logging the submission instead.");
    console.info("[contact] Submission:", {
      name: submission.name,
      email: submission.email,
      projectType: submission.projectType,
      budget: submission.budget,
      message: submission.message,
    });
    return { ok: true };
  }

  const resend = new Resend(apiKey);

  const safeName = escapeHtml(singleLine(submission.name));
  const safeEmail = escapeHtml(singleLine(submission.email));
  const safeType = escapeHtml(submission.projectType);
  const safeBudget = escapeHtml(submission.budget);
  const safeMessage = escapeHtml(submission.message).replace(/\n/g, "<br />");

  try {
    const notification = await resend.emails.send({
      from: fromAddress,
      to: [to],
      replyTo: singleLine(submission.email),
      subject: `New project enquiry — ${singleLine(submission.name)}`,
      text: [
        `New enquiry from ${site.name}`,
        "",
        `Name: ${submission.name}`,
        `Email: ${submission.email}`,
        `Project type: ${submission.projectType}`,
        `Budget: ${submission.budget}`,
        "",
        "Message:",
        submission.message,
      ].join("\n"),
      html: `
        <div style="font-family:ui-sans-serif,system-ui,sans-serif;line-height:1.6;color:#1a1a1a">
          <h1 style="font-size:18px;margin:0 0 16px">New project enquiry</h1>
          <p style="margin:0 0 8px"><strong>Name:</strong> ${safeName}</p>
          <p style="margin:0 0 8px"><strong>Email:</strong> ${safeEmail}</p>
          <p style="margin:0 0 8px"><strong>Project type:</strong> ${safeType}</p>
          <p style="margin:0 0 16px"><strong>Budget:</strong> ${safeBudget}</p>
          <hr style="border:none;border-top:1px solid #e5e5e5;margin:16px 0" />
          <p style="margin:0">${safeMessage}</p>
        </div>
      `,
    });

    if (notification.error) {
      console.error("[contact] Notification email failed:", notification.error);
      return { ok: false, error: "notification_failed" };
    }

    // The auto-reply is best-effort: a failure here should not fail the request.
    const autoReply = await resend.emails.send({
      from: fromAddress,
      to: [singleLine(submission.email)],
      subject: `We received your message — ${site.name}`,
      text: [
        `Hi ${singleLine(submission.name)},`,
        "",
        `Thanks for getting in touch with ${site.name}. We have received your message and will reply within one working day.`,
        "",
        "For reference, here is what you sent:",
        `Project type: ${submission.projectType}`,
        `Budget: ${submission.budget}`,
        "",
        submission.message,
        "",
        `— ${site.name}`,
        site.contact.email,
      ].join("\n"),
      html: `
        <div style="font-family:ui-sans-serif,system-ui,sans-serif;line-height:1.6;color:#1a1a1a">
          <p>Hi ${safeName},</p>
          <p>Thanks for getting in touch with ${site.name}. We have received your message and will reply within one working day.</p>
          <p style="margin:16px 0 4px"><strong>What you sent</strong></p>
          <p style="margin:0 0 4px"><strong>Project type:</strong> ${safeType}</p>
          <p style="margin:0 0 12px"><strong>Budget:</strong> ${safeBudget}</p>
          <p style="margin:0 0 16px">${safeMessage}</p>
          <p style="margin:0">— ${site.name}<br />${escapeHtml(site.contact.email)}</p>
        </div>
      `,
    });

    if (autoReply.error) {
      console.error("[contact] Auto-reply failed:", autoReply.error);
    }

    return { ok: true };
  } catch (error) {
    console.error("[contact] Unexpected email error:", error);
    return { ok: false, error: "unexpected" };
  }
}
