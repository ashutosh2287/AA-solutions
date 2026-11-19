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
      <div className="bg-foreground text-background relative overflow-hidden rounded-3xl px-6 py-14 sm:px-12 sm:py-20">
        <div className="bg-grid absolute inset-0 opacity-[0.06]" />
        <div className="bg-signal/20 absolute -top-24 -right-16 size-72 rounded-full blur-3xl" />
        <div className="bg-primary/30 absolute -bottom-28 -left-20 size-72 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-2xl text-center">
          <p className="text-signal mb-4 text-xs font-semibold tracking-[0.16em] uppercase">
            {site.availability}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {title}
          </h2>
          <p className="text-background/70 mx-auto mt-4 max-w-xl text-base leading-7 text-pretty">
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
                "border-background/25 text-background hover:bg-background/10 hover:text-background w-full sm:w-auto",
              )}
            >
              <Mail aria-hidden="true" />
              Email us
            </a>
          </div>

          <div className="text-background/60 mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs">
            <span className="inline-flex items-center gap-1.5">
              <MessageCircle aria-hidden="true" className="size-3.5" />
              <a
                href={site.contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-background underline underline-offset-4"
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
