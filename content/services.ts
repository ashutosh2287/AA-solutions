import type { Faq, Service } from "./types";

export const services: readonly Service[] = [
  {
    slug: "web-apps",
    title: "Web app development",
    shortTitle: "Web apps",
    summary:
      "Custom web apps with real users, real data and real workflows — built to stay fast as you grow.",
    description:
      "From the first screen to the production database, we design and build web apps that people rely on every day. We start with the workflow, not the framework, then ship a focused product you can put in front of users quickly.",
    icon: "code",
    whoFor: [
      "Startups validating a product idea",
      "Schools and colleges with internal workflows",
      "Small businesses replacing spreadsheets and manual processes",
    ],
    included: [
      "Product scoping and a clear build plan",
      "UI/UX design and a reusable component library",
      "Frontend and backend development",
      "Authentication, roles and permissions",
      "Dashboards, reporting and data exports",
      "Third-party integrations and APIs",
      "Automated tests and deployment pipelines",
    ],
    deliverables: [
      "A deployed, production-ready web app",
      "Source code in a repository you own",
      "Design files and a component library",
      "Technical documentation and a handover session",
    ],
    timeline: "6–12 weeks for a focused first release",
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Tailwind CSS",
      "Vercel",
    ],
    outcomes: [
      "One place for the work that used to live in spreadsheets and WhatsApp",
      "A product you can demo, test and iterate on quickly",
      "A codebase your next developer can actually pick up",
    ],
  },
  {
    slug: "web-platforms",
    title: "Mobile-friendly web platforms",
    shortTitle: "Web platforms",
    summary:
      "Responsive platforms that feel at home on a phone, a tablet and a desktop — without a separate app.",
    description:
      "Most of your users will meet you on a phone. We build responsive, installable web platforms with the speed and polish people expect from a native app, so you can reach everyone with one codebase.",
    icon: "smartphone",
    whoFor: [
      "Schools and colleges reaching students on mobile",
      "Local service businesses taking enquiries on the go",
      "Startups that need a mobile presence before native apps",
    ],
    included: [
      "Mobile-first interface design",
      "Responsive layouts from 360px up",
      "Progressive web app setup where it helps",
      "Fast loading on real-world networks",
      "Accessible navigation and forms",
      "Offline-friendly states and clear error handling",
    ],
    deliverables: [
      "A responsive, installable web platform",
      "Tested layouts across phone, tablet and desktop",
      "Performance and accessibility checks",
      "A handover guide for your team",
    ],
    timeline: "4–10 weeks depending on scope",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PWA APIs", "Vercel"],
    outcomes: [
      "One platform that works on every screen",
      "Lower friction for users on slow connections",
      "No app-store review cycle to ship an update",
    ],
  },
  {
    slug: "business-websites",
    title: "Business websites",
    shortTitle: "Business websites",
    summary:
      "Clear, credible websites that explain what you do and make it easy for the right people to get in touch.",
    description:
      "A good business website does one job well: it helps a visitor decide you are worth contacting. We design and build fast, SEO-ready sites with a clear structure, honest copy and a contact flow that actually works.",
    icon: "globe",
    whoFor: [
      "Schools, colleges and coaching institutes",
      "Local service businesses and clinics",
      "Small companies that have outgrown a template",
    ],
    included: [
      "Content structure and page planning",
      "Custom design matched to your brand",
      "SEO fundamentals and structured data",
      "Contact forms with spam protection",
      "Analytics and conversion tracking",
      "Fast, accessible pages on every device",
    ],
    deliverables: [
      "A complete, launched website",
      "Editable content structure",
      "SEO metadata and a sitemap",
      "Analytics access and a short training session",
    ],
    timeline: "2–5 weeks for a typical business site",
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Resend",
      "Plausible",
      "Vercel",
    ],
    outcomes: [
      "Visitors understand what you offer in seconds",
      "Enquiries arrive with the context you need",
      "A site you are comfortable sharing everywhere",
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
      "Businesses with a site that feels dated or confusing",
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
    timeline: "2–4 weeks for a focused engagement",
    tech: ["Figma", "Design tokens", "Accessibility guidelines", "Prototyping"],
    outcomes: [
      "Fewer confused users and support requests",
      "A shared visual language for your team",
      "A prototype you can test before you build",
    ],
  },
  {
    slug: "ai-features",
    title: "AI-powered features",
    shortTitle: "AI features",
    summary:
      "Practical AI that saves time or helps users decide — scoped carefully, evaluated honestly and built to fail safely.",
    description:
      "AI is useful when it removes real work, not when it is bolted on for the demo. We help you find the right use case, build a reliable implementation and measure whether it actually helps.",
    icon: "sparkles",
    whoFor: [
      "Businesses with repetitive document or support work",
      "Schools and colleges exploring smarter search and assistance",
      "Startups adding AI to an existing product",
    ],
    included: [
      "Use-case discovery and feasibility review",
      "Prompt and retrieval design",
      "Integration with your existing data and workflows",
      "Guardrails, fallbacks and human review",
      "Evaluation and quality checks",
      "Cost and latency monitoring",
    ],
    deliverables: [
      "A scoped AI feature with clear success criteria",
      "Working integration in your product",
      "Evaluation notes and known limitations",
      "Documentation for your team",
    ],
    timeline: "3–8 weeks for a focused feature",
    tech: [
      "LLM APIs",
      "Retrieval (RAG)",
      "Next.js",
      "TypeScript",
      "Vector search",
      "Evaluation tooling",
    ],
    outcomes: [
      "Less time spent on repetitive tasks",
      "A feature you can explain and trust",
      "Clear guardrails instead of open-ended risk",
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
