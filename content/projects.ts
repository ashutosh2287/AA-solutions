import type { Project } from "./types";

/**
 * Project list.
 *
 * Each project expects screenshots in /public/projects/<slug>/:
 *   cover.webp     16:10 hero image
 *   desktop-1.webp 1440x900
 *   desktop-2.webp 1440x900
 *   mobile-1.webp  390x844
 *
 * If a file is missing, <ProjectImage> renders a designed placeholder instead.
 * The screenshot manifest is generated before dev/build.
 */
export const projects: readonly Project[] = [
  {
    slug: "fastq",
    name: "fastQ",
    subtitle: "Campus canteen ordering platform",
    category: "Custom Website Design",
    categories: ["Custom Website Design"],
    type: "Web app - Food ordering - Loyalty",
    liveUrl: "https://fastqindia.in",
    client: "fastQ",
    summary:
      "A campus food-ordering app that lets students browse canteens, order ahead and skip the queue, with a loyalty tier for regulars.",
    challenge:
      "Students were losing a big part of their break standing in canteen lines, making it hard to order and collect food quickly between classes.",
    solution:
      "I built a web app where students can pick their campus, browse the canteen menu, order ahead, and collect food without waiting in the usual queue. I also added a FastQ Gold plan with discounts and priority access for regular users.",
    features: [
      "Campus and canteen selection",
      "Menu browsing by dish",
      "Cart and checkout flow",
      "Order history and status",
      "Student profile management",
      "FastQ Gold loyalty tier",
      "Help centre with terms and privacy pages",
    ],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    tags: ["Web app", "Food ordering", "Loyalty"],
    results:
      "Students can order from their phone and skip the queue. A public verified usage metric has not been added yet.",
    featured: true,
    accent: "amber",
    hasCaseStudy: true,
  },
  {
    slug: "kl-boox-house",
    name: "KL Boox House",
    subtitle: "Study library site with a seat-management system",
    category: "Custom Website Design",
    categories: ["Custom Website Design"],
    type: "Website - Management system - Admin dashboard",
    liveUrl: "https://kl-boox-house.onrender.com",
    client: "KL Boox House",
    summary:
      "A public site for a private study library, paired with logins for students and staff to manage seats, shifts, renewals and memberships.",
    challenge:
      "The library had 57 seats and 4 daily shifts to manage, along with renewals and memberships. Tracking everything manually made it easy to lose track.",
    solution:
      "I built a clean website and a simple system with separate admin and student logins. The admin can see seats, shifts, and renewals in one dashboard, while students can access their own details.",
    features: [
      "Public site covering private cabins and facilities",
      "Four daily shifts across 57 seats",
      "Photo gallery and location details",
      "Student login for seat and shift details",
      "Admin tools for seats, shifts and renewals",
      "Membership management",
    ],
    tech: ["React", "TypeScript", "Tailwind CSS", "Render"],
    tags: ["Web app", "Management system", "Admin dashboard"],
    results:
      "The owner has one clear view of seats, shifts, and renewals instead of keeping track by memory or notes.",
    featured: true,
    accent: "emerald",
    hasCaseStudy: true,
  },
  {
    slug: "grizzly-public-school",
    name: "Grizzly Public School",
    subtitle: "School website with admissions and activities",
    category: "Custom Website Design",
    categories: ["Custom Website Design"],
    type: "School website",
    liveUrl: "https://grizzlyjmt.com/",
    client: "Grizzly Public School",
    summary:
      "A school website that presents courses, activities, facilities and admissions information to parents in a clear, welcoming structure.",
    challenge:
      "The school needed a proper online presence where parents and students could learn about it, see activities and news, and contact the admission office.",
    solution:
      "I built a multi-page school website with courses, an FAQ, a news and blog section, testimonials, and clear contact and admission details so parents can quickly find what they need.",
    features: [
      "Home page with a clear school promise",
      "Course categories and curriculum overview",
      "About the school and its approach",
      "Activities and campus facilities",
      "News and blog updates",
      "Frequently asked questions",
      "Contact and location details",
    ],
    tech: ["Next.js", "React", "CSS", "Bootstrap", "JavaScript"],
    tags: ["Website", "Education", "Admissions"],
    results:
      "The school now has a modern, mobile-friendly website, and parents can reach the admission office easily.",
    featured: true,
    accent: "indigo",
    hasCaseStudy: false,
  },
  {
    slug: "jtgc",
    name: "JTGC",
    subtitle: "Club and resort website with membership signup",
    category: "Custom Website Design",
    categories: ["Custom Website Design"],
    type: "Club website - Membership - Event booking",
    liveUrl: "https://jmtgymkhana.com/",
    client: "Jhumri Telaiya Gymkhana Club",
    summary:
      "A website for a members' club and resort, covering amenities, membership signup, event bookings and a photo gallery.",
    challenge:
      "The club wanted to show off its facilities and get more event bookings for weddings, corporate events, and parties, while also attracting new members.",
    solution:
      "I built a one-page site with a photo gallery, a list of amenities, and a blog. It also includes two clear forms: one for booking an event and one for joining as a member.",
    features: [
      "Membership signup flow",
      "Event booking enquiries",
      "Amenities overview - rooms, cafeteria, pool and sports",
      "Photo gallery",
      "News and updates",
      "Contact details and location",
    ],
    tech: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    tags: ["Website", "Hospitality", "Membership"],
    results:
      "The club can receive event and membership requests directly from the website. A public verified request metric has not been added yet.",
    featured: false,
    accent: "rose",
    hasCaseStudy: false,
  },] as const;

export const projectCategories = ["Custom Website Design"] as const;

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
