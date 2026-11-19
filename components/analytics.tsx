"use client";

import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import Script from "next/script";

const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/**
 * Analytics.
 *
 * - Vercel Analytics is enabled automatically on Vercel deployments (the
 *   script only exists there, so it is skipped elsewhere to avoid a 404).
 * - Plausible is loaded only when NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set.
 * - GA4 is loaded only when NEXT_PUBLIC_GA_MEASUREMENT_ID is set.
 *
 * Keeping these opt-in means the site ships with zero third-party trackers
 * until you decide which provider to use.
 */
export function Analytics({ vercel = false }: { vercel?: boolean }) {
  return (
    <>
      {vercel ? <VercelAnalytics /> : null}

      {plausibleDomain ? (
        <Script
          defer
          data-domain={plausibleDomain}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      ) : null}

      {gaMeasurementId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaMeasurementId}', { anonymize_ip: true });`}
          </Script>
        </>
      ) : null}
    </>
  );
}
