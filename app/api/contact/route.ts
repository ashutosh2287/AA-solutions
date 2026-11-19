import { NextResponse } from "next/server";

import { sendContactEmails } from "@/lib/email";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";
import { contactSchema } from "@/lib/validators";

const GENERIC_ERROR =
  "Something went wrong on our side. Please try again, or email us directly.";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limit = rateLimit(`contact:${ip}`);

  if (!limit.ok) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Too many messages from this address. Please wait a few minutes and try again.",
      },
      {
        status: 429,
        headers: { "Retry-After": String(limit.retryAfter) },
      },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please check the highlighted fields and try again.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  // Honeypot: pretend everything is fine so bots get no signal.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const human = await verifyTurnstile(parsed.data.turnstileToken, ip);

  if (!human) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "We could not verify that you are human. Please refresh the page and try again.",
      },
      { status: 400 },
    );
  }

  const result = await sendContactEmails(parsed.data);

  if (!result.ok) {
    // The real reason is logged server-side; the visitor gets a generic message.
    return NextResponse.json({ ok: false, error: GENERIC_ERROR }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
