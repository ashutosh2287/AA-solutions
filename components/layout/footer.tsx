import Link from "next/link";
import { Mail, MapPin, MessageCircle } from "lucide-react";

import { GitHubIcon, InstagramIcon, LinkedInIcon } from "@/components/icons/social";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { Wordmark } from "./wordmark";

/**
 * Prerendered once per build. `new Date()` is not allowed during prerender
 * with Cache Components, so the value is cached explicitly.
 */
async function copyrightYear(): Promise<number> {
  "use cache";
  return new Date().getFullYear();
}

const socialIcons = {
  LinkedIn: LinkedInIcon,
  Instagram: InstagramIcon,
  GitHub: GitHubIcon,
} as const;

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Contact", href: "/contact" },
];

export async function Footer() {
  const year = await copyrightYear();

  return (
    <footer className="border-t bg-[linear-gradient(to_bottom,var(--muted)_0%,var(--background)_100%)]">
      <div className="container-page py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Wordmark />
            <p className="text-muted-foreground mt-4 max-w-xs text-sm leading-6">
              {site.tagline}.
            </p>
            <p className="text-muted-foreground mt-5 inline-flex items-center gap-2 text-xs font-medium">
              <span className="relative flex size-2">
                <span className="bg-signal absolute inline-flex size-full animate-ping rounded-full opacity-60" />
                <span className="bg-signal relative inline-flex size-2 rounded-full" />
              </span>
              {site.availability}
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <h2 className="text-foreground text-xs font-semibold tracking-[0.14em] uppercase">
              Company
            </h2>
            <ul className="mt-4 space-y-3">
              {[...site.nav.slice(1), ...legalLinks].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2">
            <h2 className="text-foreground text-xs font-semibold tracking-[0.14em] uppercase">
              Services
            </h2>
            <ul className="mt-4 space-y-3">
              {services.slice(0, 5).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services#${service.slug}`}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {service.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h2 className="text-foreground text-xs font-semibold tracking-[0.14em] uppercase">
              Get in touch
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={site.contact.emailHref}
                  className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 transition-colors"
                >
                  <Mail aria-hidden="true" className="size-4 shrink-0" />
                  <span className="break-all">{site.contact.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={site.contact.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 transition-colors"
                >
                  <MessageCircle aria-hidden="true" className="size-4 shrink-0" />
                  <span>WhatsApp</span>
                </a>
              </li>
              <li className="text-muted-foreground inline-flex items-start gap-2">
                <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                <span>{site.contact.location}</span>
              </li>
            </ul>

            <div className="mt-5 flex items-center gap-1">
              {site.socials.map((social) => {
                const Icon = socialIcons[social.label];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${site.name} on ${social.label}`}
                    className="text-muted-foreground hover:bg-background hover:text-foreground grid size-9 place-items-center rounded-lg border transition-colors"
                  >
                    <Icon aria-hidden="true" className="size-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted-foreground">
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p className="text-muted-foreground">
            Built in-house with Next.js, TypeScript and Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}
