import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mail, MessageCircle } from "lucide-react";

import { site } from "@/content/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

/**
 * Closing call to action used at the bottom of most pages.
 */
export function FinalCta({
  title = "Have a project in mind?",
  description = "Tell us what you are trying to build and what is getting in the way. We will reply within one working day with an honest take on scope, timeline and cost.",
  className,
}: {
  title?: string;
  description?: string;
  className?: string;
}) {
  return (
    <section className={cn("container-page py-20 sm:py-28", className)}>
      <div className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,var(--primary)_0%,color-mix(in_oklch,var(--primary)_82%,#172554)_100%)] px-6 py-14 text-white shadow-[0_30px_90px_-35px_color-mix(in_oklch,var(--primary)_75%,transparent)] sm:px-12 sm:py-20">
        <div className="bg-grid absolute inset-0 opacity-[0.12]" />
        <div className="absolute -top-20 right-0 size-64 rounded-full bg-signal/30 blur-3xl" />
        <div className="absolute bottom-[-10rem] left-[-6rem] size-80 rounded-full bg-white/10 blur-3xl" />

        <div className="relative mx-auto max-w-2xl text-center">
          <p className="mb-4 text-xs font-semibold tracking-[0.16em] uppercase text-signal">
            {site.availability}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-white/75 text-pretty">
            {description}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={site.cta.href}
              className={cn(
                buttonVariants({ size: "xl" }),
                "bg-signal text-signal-foreground hover:bg-signal/90 w-full sm:w-auto",
              )}
            >
              {site.cta.label}
              <ArrowUpRight aria-hidden="true" />
            </Link>
            <a
              href={site.contact.emailHref}
              className={cn(
                buttonVariants({ variant: "outline", size: "xl" }),
                "w-full border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white sm:w-auto",
              )}
            >
              <Mail aria-hidden="true" />
              Email us
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/65">
            <span className="inline-flex items-center gap-1.5">
              <MessageCircle aria-hidden="true" className="size-3.5" />
              <a
                href={site.contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-white"
              >
                WhatsApp
              </a>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ArrowRight aria-hidden="true" className="size-3.5" />
              {site.responseNote}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
