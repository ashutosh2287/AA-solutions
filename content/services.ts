import type { Faq, Service } from "./types";

export const services: readonly Service[] = [
  {
    slug: "website-design",
    title: "Custom Website Design",
    shortTitle: "Custom Website Design",
    summary:
      "Websites designed and built around your business, from business sites to full web platforms. Fast, clear, and easy for the right people to get in touch.",
    description:
      "We design and build custom websites around what your business actually needs, from business websites and landing pages to full web platforms. The result is fast, clear, and easy for the right people to understand and contact you.",
    icon: "globe",
    whoFor: [
      "Small businesses that need a clear, credible website",
      "Schools, colleges, and local organizations",
      "Teams that need a web platform, not just a brochure site",
    ],
    included: [
      "Custom website design matched to your brand",
      "Business site pages, landing pages, and custom web platforms",
      "Content structure and page planning",
      "Responsive layouts for mobile, tablet, and desktop",
      "SEO fundamentals and structured data",
      "Contact forms with spam protection",
      "Analytics and conversion tracking",
    ],
    deliverables: [
      "A launched custom website or web platform",
      "Editable content structure",
      "SEO metadata and a sitemap",
      "Analytics access and a short handover session",
    ],
    timeline: "2-8 weeks depending on scope",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Resend", "Vercel"],
    outcomes: [
      "Visitors understand what you offer quickly",
      "The right people can get in touch easily",
      "A site or platform that can grow with your business",
    ],
  },
  {
    slug: "mobile-apps",
    title: "Custom Mobile Apps",
    shortTitle: "Custom Mobile Apps",
    summary:
      "Mobile apps built around your idea. Smooth to use, reliable, and ready to grow with your users.",
    description:
      "We build custom mobile apps around your idea, with a focus on smooth user experience, reliability, and a structure that can grow as your users do. We scope the product carefully so you know what is being built before development starts.",
    icon: "smartphone",
    whoFor: [
      "Founders with a mobile app idea to validate",
      "Businesses that need a customer-facing mobile app",
      "Teams wanting to extend an existing product to mobile",
    ],
    included: [
      "Product scoping and app planning",
      "Mobile-first UI and user flows",
      "Core feature development",
      "Testing across common devices and screen sizes",
      "Launch support and handover documentation",
    ],
    deliverables: [
      "A scoped custom mobile app build plan",
      "Designed screens and core app flows",
      "Source code in a repository you own",
      "Handover documentation for next steps",
    ],
    timeline: "6-12 weeks for a focused first release",
    tech: ["TODO: confirm, e.g. React Native / Flutter"],
    outcomes: [
      "TODO: add verified mobile app results after launch",
      "A clear plan for turning your idea into a usable app",
      "An app foundation ready to grow with your users",
    ],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX design",
    shortTitle: "UI/UX design",
    summary:
      "Interfaces that are easy to understand, pleasant to use and consistent from the first screen to the last.",
    description:
      "Design is how the product works, not just how it looks. We map the user journey, remove unnecessary steps and build a design system that keeps every screen consistent as the product grows.",
    icon: "palette",
    whoFor: [
      "Teams with a product idea but no design direction",
      "Businesses with a site or product that feels dated or confusing",
      "Founders who need a prototype before committing to a build",
    ],
    included: [
      "User research and journey mapping",
      "Information architecture and wireframes",
      "Visual design and interaction design",
      "A reusable design system and tokens",
      "Clickable prototypes for testing",
      "Accessibility and contrast reviews",
    ],
    deliverables: [
      "Wireframes and user flows",
      "High-fidelity screens and prototypes",
      "A documented design system",
      "Design files handed over in Figma",
    ],
    timeline: "2-4 weeks for a focused engagement",
    tech: ["Figma", "Design tokens", "Accessibility guidelines", "Prototyping"],
    outcomes: [
      "Fewer confused users and support requests",
      "A shared visual language for your team",
      "A prototype you can test before you build",
    ],
  },
] as const;

export const serviceFaqs: readonly Faq[] = [
  {
    question: "How do you price projects?",
    answer:
      "Most projects are quoted as a fixed scope after a short discovery call, so you know the cost before we start. Larger or evolving products can run on a monthly retainer. There are no hidden fees, and we will tell you if a request falls outside the agreed scope.",
  },
  {
    question: "How long does a project take?",
    answer:
      "A business website typically takes 2–5 weeks, a focused web app 6–12 weeks, and an AI feature 3–8 weeks. The exact timeline depends on scope, content readiness and how quickly feedback comes back. We share a week-by-week plan before we begin.",
  },
  {
    question: "Do we own the code and design files?",
    answer:
      "Yes. Once the project is paid for, you own the source code, design files and the accounts we set up for you. We hand over the repository, documentation and access at launch.",
  },
  {
    question: "What happens after launch?",
    answer:
      "Every project includes 30 days of bug-fix support after launch. After that, you can choose a monthly care plan for updates, monitoring and small improvements, or take over the codebase yourself with the documentation we provide.",
  },
  {
    question: "Can you work with our existing website or codebase?",
    answer:
      "Often, yes. We start with a short technical review to understand what is worth keeping. If a rebuild is the better long-term choice, we will say so clearly and explain the trade-offs.",
  },
];
