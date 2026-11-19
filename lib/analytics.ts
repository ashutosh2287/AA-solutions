type EventProps = Record<string, string | number | boolean>;

interface PlausibleWindow extends Window {
  plausible?: (event: string, options?: { props?: EventProps }) => void;
  gtag?: (...args: unknown[]) => void;
}

/**
 * Fires a conversion event on whichever analytics provider is configured.
 * Safe to call anywhere in the browser; it is a no-op on the server and when
 * no provider is present.
 */
export function trackEvent(name: string, props?: EventProps): void {
  if (typeof window === "undefined") return;

  const w = window as PlausibleWindow;

  try {
    w.plausible?.(name, props ? { props } : undefined);
    w.gtag?.("event", name, props ?? {});
  } catch {
    // Analytics must never break the user flow.
  }
}
