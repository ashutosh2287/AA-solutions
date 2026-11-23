import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock,
  Globe,
  Palette,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

import { FinalCta } from "@/components/sections/final-cta";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { services, serviceFaqs } from "@/content/services";
import type { ServiceIcon } from "@/content/types";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { cn } from "cn";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "Custom Website Design, Custom Mobile Apps, and UI/UX design for small businesses, schools, and startups.",
  path: "/services",
});

const icons: Record<ServiceIcon, LucideIcon> = {
  globe: Globe,
  smartphone: Smartphone,
  palette: Palette,
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Design and development, end to end"
        description="We keep the offer small on purpose. These are the things we do well, and the work is scoped so you know exactly what you are paying for."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/contact"
            className={cn(buttonVariants({ size: "xl" }), "w-full sm:w-auto")}
          >
            Start a project
            <ArrowUpRight aria-hidden="true" />
          </Link>
          <Link
            href="/work"
            className={cn(
              buttonVariants({ variant: "outline", size: "xl" }),
              "w-full sm:w-auto",
            )}
          >
            See our work
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </PageHeader>

      {/* Service index */}
      <div className="bg-muted/30 border-b">
        <nav aria-label="Services" className="container-page py-5">
          <ul className="flex flex-wrap gap-2">
            {services.map((service) => (
              <li key={service.slug}>
                <a
                  href={`#${service.slug}`}
                  className="bg-background hover:border-primary/40 hover:text-primary inline-flex rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors"
                >
                  {service.shortTitle}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="container-page py-16 sm:py-20">
        <div className="space-y-16 sm:space-y-24">
          {services.map((service, index) => {
            const Icon = icons[service.icon];

            return (
              <section
                key={service.slug}
                id={service.slug}
                aria-labelledby={`${service.slug}-heading`}
                className="scroll-mt-24"
              >
                <Reveal>
                  <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
                    <div className="lg:sticky lg:top-24 lg:self-start">
                      <div className="flex items-center gap-3">
                        <span className="bg-primary/10 text-primary grid size-11 place-items-center rounded-xl">
                          <Icon aria-hidden="true" className="size-5" />
                        </span>
                        <span className="text-muted-foreground text-xs font-semibold tracking-[0.14em] uppercase">
                          0{index + 1}
                        </span>
                      </div>

                      <h2
                        id={`${service.slug}-heading`}
                        className="mt-5 text-2xl font-semibold tracking-tight text-balance sm:text-3xl"
                      >
                        {service.title}
                      </h2>
                      <p className="text-muted-foreground mt-4 text-base leading-7">
                        {service.description}
                      </p>

                      <div className="mt-6 border-t pt-5 text-sm">
                        <div className="flex items-start gap-3">
                          <Clock
                            aria-hidden="true"
                            className="text-muted-foreground mt-0.5 size-4 shrink-0"
                          />
                          <div>
                            <p className="text-foreground font-medium">Timeline</p>
                            <p className="text-muted-foreground">{service.timeline}</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {service.tech.map((tech) => (
                          <Badge key={tech} variant="outline" className="font-normal">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <Panel title="Who it's for" items={service.whoFor} />
                      <Panel title="What's included" items={service.included} />
                      <Panel title="What you get" items={service.deliverables} />
                      <div className="bg-card rounded-2xl border p-5">
                        <h3 className="text-xs font-semibold tracking-[0.14em] uppercase">
                          Why it matters
                        </h3>
                        <ul className="mt-4 space-y-3">
                          {service.outcomes.map((outcome) => (
                            <li
                              key={outcome}
                              className="text-muted-foreground flex items-start gap-2 text-sm leading-6"
                            >
                              <span className="bg-signal mt-1.5 size-1.5 shrink-0 rounded-full" />
                              {outcome}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </section>
            );
          })}
        </div>
      </div>

      {/* FAQ */}
      <section className="bg-muted/30 border-y">
        <div className="container-page py-16 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <p className="text-primary mb-3 text-xs font-semibold tracking-[0.16em] uppercase">
                FAQ
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-balance">
                Questions we get before every project
              </h2>
              <p className="text-muted-foreground mt-4 text-base leading-7">
                If your question is not here, email us — we will answer it directly, not
                with a sales call.
              </p>
            </div>

            <Accordion className="divide-border border-t">
              {serviceFaqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`faq-${index}`}>
                  <AccordionTrigger className="py-4 text-base font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <p className="text-muted-foreground leading-7">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <FinalCta />

      <JsonLd data={faqJsonLd(serviceFaqs)} />
    </>
  );
}

function Panel({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div className="bg-card rounded-2xl border p-5">
      <h3 className="text-xs font-semibold tracking-[0.14em] uppercase">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li
            key={item}
            className="text-muted-foreground flex items-start gap-2 text-sm leading-6"
          >
            <Check aria-hidden="true" className="text-primary mt-1 size-3.5 shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
