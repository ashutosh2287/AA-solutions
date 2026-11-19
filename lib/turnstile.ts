/**
 * Cloudflare Turnstile verification.
 *
 * When TURNSTILE_SECRET_KEY is not configured the check is skipped in
 * development so the form can be tested locally, and fails closed in
 * production so a missing key cannot silently disable spam protection.
 */
export async function verifyTurnstile(
  token: string | undefined,
  remoteIp?: string,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      console.error(
        "[contact] TURNSTILE_SECRET_KEY is not set — rejecting submission.",
      );
      return false;
    }

    console.warn(
      "[contact] TURNSTILE_SECRET_KEY is not set — skipping Turnstile in development.",
    );
    return true;
  }

  if (!token) return false;

  try {
    const body = new URLSearchParams({
      secret,
      response: token,
      ...(remoteIp ? { remoteip: remoteIp } : {}),
    });

    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
        cache: "no-store",
      },
    );

    if (!response.ok) {
      console.error("[contact] Turnstile responded with", response.status);
      return false;
    }

    const result = (await response.json()) as { success?: boolean };
    return result.success === true;
  } catch (error) {
    console.error("[contact] Turnstile verification failed", error);
    return false;
  }
}
