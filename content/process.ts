import type { ProcessStep } from "./types";

export const processSteps: readonly ProcessStep[] = [
  {
    slug: "discover",
    number: "01",
    title: "Discover",
    duration: "Week 1",
    description:
      "We start with a conversation about what you actually need. Who uses this, what happens today, and what would make the biggest difference? You get a written scope, a timeline and a fixed quote before any build work begins.",
    clientGets: [
      "A short discovery call, not a sales pitch",
      "A written scope with clear assumptions",
      "A week-by-week timeline",
      "A fixed quote for the agreed scope",
    ],
  },
  {
    slug: "design",
    number: "02",
    title: "Design",
    duration: "Weeks 2–3",
    description:
      "We map the key screens and user journeys, then design them in the browser. You see real layouts on real screen sizes early, so feedback is about the product rather than a static mockup.",
    clientGets: [
      "User flows and information architecture",
      "Wireframes for the important screens",
      "High-fidelity designs on phone and desktop",
      "A component library and design tokens",
    ],
  },
  {
    slug: "build",
    number: "03",
    title: "Build",
    duration: "Weeks 3–8",
    description:
      "We build in short increments and share a working preview link throughout. Every feature is tested on real devices, with accessibility and performance treated as requirements rather than cleanup work at the end.",
    clientGets: [
      "A live preview link from week one",
      "Regular progress updates",
      "Tested, responsive screens",
      "Accessibility and performance checks",
    ],
  },
  {
    slug: "launch",
    number: "04",
    title: "Launch & support",
    duration: "Launch week + 30 days",
    description:
      "We handle deployment, domain setup, analytics and final checks, then hand over the repository and documentation. For 30 days after launch we fix anything that breaks, at no extra cost.",
    clientGets: [
      "Production deployment and domain setup",
      "Analytics and error monitoring",
      "Repository and documentation handover",
      "30 days of post-launch bug fixes",
    ],
  },
] as const;
