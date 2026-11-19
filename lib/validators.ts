import { z } from "zod";

export const projectTypes = [
  "Web app",
  "Business website",
  "Management system",
  "UI/UX design",
  "AI feature",
  "Something else",
] as const;

export const budgets = [
  "Under ₹50,000",
  "₹50,000 – ₹1,50,000",
  "₹1,50,000 – ₹5,00,000",
  "₹5,00,000+",
  "Not sure yet",
] as const;

/**
 * Fields shared by the client form and the server route.
 * Keep every rule here so both sides validate identically.
 */
export const contactFieldsSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "Please keep your name under 80 characters."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .max(200, "Please use an email address under 200 characters.")
    .email("Please enter a valid email address."),
  projectType: z.enum(projectTypes, {
    errorMap: () => ({ message: "Please choose a project type." }),
  }),
  budget: z.enum(budgets, {
    errorMap: () => ({ message: "Please choose an approximate budget." }),
  }),
  message: z
    .string()
    .trim()
    .min(20, "Please add a little more detail — at least 20 characters.")
    .max(2000, "Please keep your message under 2000 characters."),
});

export type ContactFields = z.infer<typeof contactFieldsSchema>;

/**
 * Server-side schema: the form fields plus the spam-protection token and a
 * honeypot field that must stay empty.
 */
export const contactSchema = contactFieldsSchema.extend({
  turnstileToken: z.string().max(4096).optional().default(""),
  // Honeypot. Real users never see this field; bots tend to fill it in.
  website: z.string().max(200).optional().default(""),
});

export type ContactSubmission = z.infer<typeof contactSchema>;

export const contactLimits = {
  name: 80,
  email: 200,
  message: 2000,
} as const;
