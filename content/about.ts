import type { Founder, Value } from "./types";

export const about = {
  intro:
    "KL Solutions builds digital tools for small businesses, stores, schools and startups. We turn everyday business problems into smart, easy-to-use websites and apps.",
  story: [
    "We started because we kept meeting the same problem: good organisations with real work to do, stuck with a website that misrepresents them or a process held together by spreadsheets and WhatsApp groups.",
    "So we build the opposite. Small, focused products with a clear purpose, designed carefully and built to last longer than the launch announcement.",
    "We stay deliberately small. That means the people who scope your project are the people who design and build it — no handoffs to a team you have never met.",
  ],
  approach: [
    "Start with the workflow, not the framework.",
    "Ship something real early, then improve it with feedback.",
    "Treat performance, accessibility and clarity as part of the product.",
    "Write code and documentation the next person can pick up.",
  ],
  values: [
    {
      title: "Clarity over jargon",
      description:
        "You should always understand what we are building, why it costs what it costs, and what happens next. If something is unclear, that is our problem to fix.",
    },
    {
      title: "Small, finished releases",
      description:
        "A working product in front of real users beats a perfect plan in a document. We ship in increments and keep you in the loop the whole way.",
    },
    {
      title: "Honest scope",
      description:
        "We would rather tell you a feature is not worth building than take the work and watch it go unused. If a deadline slips, you hear it from us first.",
    },
    {
      title: "Built to be handed over",
      description:
        "You own the code, the designs and the accounts. We document what we build so you are never locked in to working with us.",
    },
  ] satisfies readonly Value[],
} as const;

export const founder: Founder = {
  name: "Aryan Sinha",
  role: "Founder & Lead Developer",
  bio: "I'm Aryan Sinha, founder of KL Solutions. I build websites, custom mobile apps, and digital products that look sharp, load fast, and are structured to grow with your business. From campus food ordering to library management, I've built tools that solve real everyday problems, and I like adding AI where it genuinely helps. Tell me what you're trying to build, and I'll help you get it live.",
  photo: null,
};

export const aboutFacts = [
  { label: "Founded", value: "2026" },
  { label: "Based in", value: "Bhagalpur, India" },
  { label: "Working with", value: "Schools, small businesses, startups" },
  { label: "Typical project", value: "2-12 weeks" },
] as const;
