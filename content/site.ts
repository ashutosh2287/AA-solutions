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
    "KL Solutions provides Custom Website Design, Custom Mobile Apps, and UI/UX design for small businesses, stores, schools, and startups. We build digital products that are clear, fast, and ready to grow.",
  shortDescription:
    "We build custom websites, custom mobile apps, and UI/UX design that make your business easier to manage and ready to grow.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://klsolutions.example.com",
  locale: "en_IN",
  foundingYear: 2026,
  contact: {
    email: "ashutoshanand2287@gmail.com",
    emailHref: "mailto:ashutoshanand2287@gmail.com",
    whatsappDisplay: "+91 89555 44280",
    whatsappHref: "https://wa.me/918955544280",
    location: "KL Boox House Library, Parbatti, Bhagalpur, Bihar 812002, India",
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
  socials: [],
} as const;

export type Site = typeof site;
