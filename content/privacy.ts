import type { PrivacySection } from "./types";

/**
 * Privacy policy template.
 *
 * TODO: have this reviewed by a qualified legal professional before launch.
 * Placeholders in [square brackets] must be replaced with real details.
 */
export const privacy = {
  lastUpdated: "TODO: add effective date",
  needsReview: true,
  intro:
    "This policy explains what information KL Solutions collects when you use this website, why we collect it, and the choices you have. It is a starting template and must be reviewed before launch.",
  sections: [
    {
      heading: "Who we are",
      paragraphs: [
        "KL Solutions builds apps and websites for schools, colleges, small businesses and startups.",
        "For any privacy question, contact us at [TODO: add privacy contact email].",
      ],
    },
    {
      heading: "Information you give us",
      paragraphs: [
        "When you use the contact form, we collect the details you enter: your name, email address, the project type and budget you select, and your message.",
        "We use this information only to respond to your enquiry and, if we work together, to deliver the project.",
      ],
    },
    {
      heading: "Information collected automatically",
      paragraphs: [
        "Like most websites, we collect limited technical information when you visit — for example the pages you view, the device and browser you use, and your approximate location derived from your IP address.",
        "We use privacy-friendly analytics to understand which pages are useful. We do not sell this data or use it to build advertising profiles.",
      ],
      bullets: [
        "Aggregated page-view analytics",
        "Basic device and browser information",
        "Error reports used to fix problems",
      ],
    },
    {
      heading: "Cookies",
      paragraphs: [
        "This site uses only the cookies required to remember your colour-theme preference and, where enabled, privacy-friendly analytics. We do not use advertising or cross-site tracking cookies.",
      ],
    },
    {
      heading: "Spam protection",
      paragraphs: [
        "Our contact form is protected by Cloudflare Turnstile, which may process limited technical signals to distinguish people from automated submissions. See Cloudflare's privacy policy for details.",
      ],
    },
    {
      heading: "How we share information",
      paragraphs: [
        "We share information only with service providers that help us run this website and respond to enquiries — for example our email delivery provider and hosting provider. They process data on our instructions.",
        "We may disclose information if required by law or to protect our legal rights.",
      ],
    },
    {
      heading: "How long we keep information",
      paragraphs: [
        "We keep enquiry emails for as long as needed to respond and maintain a record of our conversation, then delete them on request. Project data is retained according to the agreement we sign with each client.",
      ],
    },
    {
      heading: "Your rights",
      paragraphs: [
        "Depending on where you live, you may have the right to access, correct, export or delete the personal information we hold about you, and to object to certain processing.",
        "To make a request, email [TODO: add privacy contact email] and we will respond within a reasonable timeframe.",
      ],
    },
    {
      heading: "Changes to this policy",
      paragraphs: [
        "We may update this policy as the site or our services change. The effective date at the top of this page will always show the most recent version.",
      ],
    },
    {
      heading: "Contact",
      paragraphs: [
        "Questions about this policy can be sent to [TODO: add privacy contact email] or through the contact page.",
      ],
    },
  ] satisfies readonly PrivacySection[],
} as const;
