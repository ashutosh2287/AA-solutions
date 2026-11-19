import type { Testimonial } from "./types";

/**
 * Testimonials.
 *
 * IMPORTANT: leave this array empty until you have real, permission-granted
 * quotes. The <Testimonials /> section hides itself automatically when the
 * array is empty, so the site never shows invented social proof.
 *
 * When you do have a quote, add it in this shape:
 *
 *   {
 *     quote: "…",
 *     name: "…",
 *     role: "…",
 *     company: "…",
 *     avatar: null, // or "/testimonials/name.jpg"
 *   }
 */
export const testimonials: readonly Testimonial[] = [] as const;
