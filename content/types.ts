export type ServiceIcon = "globe" | "smartphone" | "palette";

export interface Service {
  slug: string;
  title: string;
  /** Short label used in navigation and compact cards. */
  shortTitle: string;
  /** One-line summary for cards. */
  summary: string;
  /** Two to three sentences for the services page. */
  description: string;
  icon: ServiceIcon;
  whoFor: string[];
  included: string[];
  deliverables: string[];
  timeline: string;
  tech: string[];
  outcomes: string[];
}

export type ProjectCategory = "Custom Website Design";

export type ProjectAccent = "amber" | "emerald" | "indigo" | "rose";

export type ProjectImageSlot = "cover" | "desktop-1" | "desktop-2" | "mobile-1";

export interface Project {
  slug: string;
  name: string;
  /** Short descriptor, e.g. "Campus canteen ordering platform". */
  subtitle: string;
  /** Primary category used in metadata. */
  category: ProjectCategory;
  /** Categories this project appears under in the work filter. */
  categories: ProjectCategory[];
  /** Longer, human-readable type label. */
  type: string;
  liveUrl?: string;
  client: string;
  summary: string;
  /** Null means the detail is not confirmed yet. */
  challenge: string | null;
  /** Null means the detail is not confirmed yet. */
  solution: string | null;
  features: string[];
  /** Empty means the stack is not confirmed yet. */
  tech: string[];
  tags: string[];
  /** Null means results are not confirmed yet. */
  results: string | null;
  featured: boolean;
  accent: ProjectAccent;
  /** Whether a long-form MDX write-up exists in /content/case-studies. */
  hasCaseStudy: boolean;
}

export interface ProcessStep {
  slug: string;
  number: string;
  title: string;
  duration: string;
  description: string;
  clientGets: string[];
}

export interface Value {
  title: string;
  description: string;
}

export interface Founder {
  name: string;
  role: string;
  bio: string;
  /** Path to a photo in /public, or null when no photo is available. */
  photo: string | null;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  /** Optional path to a photo in /public. */
  avatar: string | null;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface PrivacySection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}
