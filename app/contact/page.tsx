import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle } from "lucide-react";

import { ContactForm } from "@/components/contact-form";
import { PageHeader } from "@/components/page-header";
import { TodoNote } from "@/components/todo-note";
import { JsonLd } from "@/components/json-ld";
import { site } from "@/content/site";
import { buildMetadata, contactPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Start a project with KL Solutions. Tell us what you are building and we will reply within 24 hours with an honest view of scope, timeline and cost.",
  path: "/contact",
});

const steps = [
  "We read your message and reply within one working day.",
  "If it looks like a fit, we book a 30-minute call.",
  "You get a written scope, timeline and fixed quote.",
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Tell us about your project"
        description="The more context you give us, the more useful our first reply will be. No sales calls, no pressure — just a straight answer about whether we can help."
      />

      <section className="container-page py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div>
            <ContactForm />
          </div>

          <aside className="space-y-6">
            <div className="bg-card rounded-2xl border p-6">
              <h2 className="text-sm font-semibold tracking-[0.14em] uppercase">
                Direct contact
              </h2>

              <ul className="mt-4 space-y-4 text-sm">
                <li>
                  <a
                    href={site.contact.emailHref}
                    className="group flex items-start gap-3"
                  >
                    <span className="bg-primary/10 text-primary grid size-9 shrink-0 place-items-center rounded-lg">
                      <Mail aria-hidden="true" className="size-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="text-muted-foreground block text-xs">Email</span>
                      <span className="group-hover:text-primary block font-medium break-all transition-colors">
                        {site.contact.email}
                      </span>
                    </span>
                  </a>
                </li>

                <li>
                  <a
                    href={site.contact.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-3"
                  >
                    <span className="bg-primary/10 text-primary grid size-9 shrink-0 place-items-center rounded-lg">
                      <MessageCircle aria-hidden="true" className="size-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="text-muted-foreground block text-xs">
                        WhatsApp
                      </span>
                      <span className="group-hover:text-primary block font-medium transition-colors">
                        {site.contact.whatsappDisplay}
                      </span>
                    </span>
                  </a>
                </li>

                <li className="flex items-start gap-3">
                  <span className="bg-primary/10 text-primary grid size-9 shrink-0 place-items-center rounded-lg">
                    <MapPin aria-hidden="true" className="size-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="text-muted-foreground block text-xs">
                      Location
                    </span>
                    <span className="block font-medium">{site.contact.location}</span>
                  </span>
                </li>
              </ul>

              <p className="text-muted-foreground mt-5 flex items-center gap-2 border-t pt-4 text-xs">
                <Clock aria-hidden="true" className="size-3.5" />
                {site.responseNote}
              </p>
            </div>

            <div className="bg-muted/40 rounded-2xl border p-6">
              <h2 className="text-sm font-semibold tracking-[0.14em] uppercase">
                What happens next
              </h2>
              <ol className="mt-4 space-y-3">
                {steps.map((step, index) => (
                  <li key={step} className="flex items-start gap-3 text-sm leading-6">
                    <span className="bg-background text-foreground ring-border grid size-6 shrink-0 place-items-center rounded-full text-xs font-semibold ring-1">
                      {index + 1}
                    </span>
                    <span className="text-muted-foreground">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <p className="text-muted-foreground text-xs leading-6">
              Prefer email? Write to{" "}
              <a
                href={site.contact.emailHref}
                className="text-foreground underline underline-offset-4"
              >
                {site.contact.email}
              </a>
              . We read every message ourselves.
            </p>

            <TodoNote>
              The email address, WhatsApp number and location above are placeholders.
              Replace them in{" "}
              <code className="text-foreground text-xs">content/site.ts</code> before
              launch.
            </TodoNote>
          </aside>
        </div>
      </section>

      <JsonLd data={contactPageJsonLd()} />
    </>
  );
}
