/**
 * SINGLE SOURCE OF TRUTH for company identity, contact details and navigation.
 *
 * To rename the company, change `name` here (and optionally `legalName`).
 * Every page, the header, footer, metadata and structured data read from this file.
 */
export const site = {
  name: "AA Solutions",
  legalName: "AA Solutions",
  tagline: "We build apps and websites people actually use",
  description:
    "AA Solutions is an app and web development studio for schools, colleges, small businesses and startups. We design and build web apps, business websites and AI-powered features that are fast, reliable and genuinely useful.",
  shortDescription:
    "An app and web development studio for schools, small businesses and startups.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://aasolutions.example.com",
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
