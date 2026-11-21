/**
 * SINGLE SOURCE OF TRUTH for company identity, contact details and navigation.
 *
 * To rename the company, change `name` here (and optionally `legalName`).
 * Every page, the header, footer, metadata and structured data read from this file.
 */
export const site = {
  name: "KL Solutions",
  legalName: "KL Solutions",
  tagline: "You bring the problem. We build the solution.",
  description:
    "KL Solutions builds websites and apps that make businesses easier to manage, reduce manual work, organize data, and help sales grow. We create digital solutions for small businesses, stores, schools and startups.",
  shortDescription:
    "We build websites and apps that make your business easier to manage, reduce boring manual work, keep your data organized, and help you grow your sales.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://klsolutions.example.com",
  locale: "en_IN",
  // TODO: add the real founding year before launch (used in structured data).
  foundingYear: null,
  contact: {
    // TODO: add real details
    email: "hello@example.com",
    emailHref: "mailto:hello@example.com",
    // TODO: add real details (E.164 digits only for the wa.me link)
    whatsappDisplay: "TODO: add real WhatsApp number",
    whatsappHref: "https://wa.me/910000000000",
    // TODO: add real details
    location: "TODO: add city, country",
  },
  availability: "Currently taking on new projects",
  responseNote: "We reply within 24 hours",
  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "Process", href: "/process" },
    { label: "About", href: "/about" },
  ],
  cta: { label: "Start a project", href: "/contact" },
  // TODO: add real social profiles
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "GitHub", href: "https://github.com/" },
  ],
} as const;

export type Site = typeof site;
