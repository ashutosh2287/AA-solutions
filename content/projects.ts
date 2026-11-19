import type { Project } from "./types";

/**
 * Project list.
 *
 * Each project expects screenshots in /public/projects/<slug>/:
 *   cover.png     16:10 hero image
 *   desktop-1.png 1440x900
 *   desktop-2.png 1440x900
 *   mobile-1.png  390x844
 *
 * If a file is missing, <ProjectImage> renders a designed placeholder instead —
 * no code changes are needed once the real file is dropped in.
 *
 * Fields set to `null` are intentionally unconfirmed. The UI shows a clearly
 * marked TODO state rather than inventing numbers or outcomes.
 */
export const projects: readonly Project[] = [
  {
    slug: "fastq",
    name: "fastQ",
    subtitle: "Campus canteen ordering platform",
    category: "Web app",
    categories: ["Web app"],
    type: "Web app · Food ordering · Loyalty",
    liveUrl: "https://fastqindia.in",
    client: "fastQ",
    summary:
      "A campus food-ordering app that lets students browse canteens, order ahead and skip the queue, with a loyalty tier for regulars.",
    challenge: null,
    solution: null,
    features: [
      "Campus and canteen selection",
      "Menu browsing by dish",
      "Cart and checkout flow",
      "Order history and status",
      "Student profile management",
      "FastQ Gold loyalty tier",
      "Help centre with terms and privacy pages",
    ],
    tech: [],
    tags: ["Web app", "Food ordering", "Loyalty"],
    results: null,
    featured: true,
    accent: "amber",
    hasCaseStudy: true,
  },
  {
    slug: "kl-boox-house",
    name: "KL Boox House",
    subtitle: "Study library site with a seat-management system",
    category: "Management system",
    categories: ["Management system", "Website"],
    type: "Website · Management system · Admin dashboard",
    liveUrl: "https://kl-boox-house.onrender.com",
    client: "KL Boox House",
    summary:
      "A public site for a private study library, paired with logins for students and staff to manage seats, shifts, renewals and memberships.",
    challenge: null,
    solution: null,
    features: [
      "Public site covering private cabins and facilities",
      "Four daily shifts across 57 seats",
      "Photo gallery and location details",
      "Student login for seat and shift details",
      "Admin tools for seats, shifts and renewals",
      "Membership management",
    ],
    tech: [],
    tags: ["Web app", "Management system", "Admin dashboard"],
    results: null,
    featured: true,
    accent: "emerald",
    hasCaseStudy: true,
  },
  {
    slug: "grizzly-public-school",
    name: "Grizzly Public School",
    subtitle: "School website with admissions and activities",
    category: "Website",
    categories: ["Website"],
    type: "School website",
    liveUrl: "https://grizzlyjmt.com/",
    client: "Grizzly Public School",
    summary:
      "A school website that presents courses, activities, facilities and admissions information to parents in a clear, welcoming structure.",
    challenge: null,
    solution: null,
    features: [
      "Home page with a clear school promise",
      "Course categories and curriculum overview",
      "About the school and its approach",
      "Activities and campus facilities",
      "News and blog updates",
      "Frequently asked questions",
      "Contact and location details",
    ],
    tech: [],
    tags: ["Website", "Education", "Admissions"],
    results: null,
    featured: true,
    accent: "indigo",
    hasCaseStudy: false,
  },
  {
    slug: "jtgc",
    name: "JTGC",
    subtitle: "Club and resort website with membership signup",
    category: "Website",
    categories: ["Website", "Management system"],
    type: "Club website · Membership · Event booking",
    liveUrl: "https://jmtgymkhana.com/",
    client: "Jhumri Telaiya Gymkhana Club",
    summary:
      "A website for a members' club and resort, covering amenities, membership signup, event bookings and a photo gallery.",
    challenge: null,
    solution: null,
    features: [
      "Membership signup flow",
      "Event booking enquiries",
      "Amenities overview — rooms, cafeteria, pool and sports",
      "Photo gallery",
      "News and updates",
      "Contact details and location",
    ],
    tech: [],
    tags: ["Website", "Hospitality", "Membership"],
    results: null,
    featured: false,
    accent: "rose",
    hasCaseStudy: false,
  },
] as const;

export const projectCategories = ["Web app", "Website", "Management system"] as const;

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function getNextProject(slug: string): Project {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}
