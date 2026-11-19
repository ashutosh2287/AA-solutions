import { Quote } from "lucide-react";

import { testimonials } from "@/content/testimonials";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

/**
 * Renders nothing at all until real testimonials exist in
 * /content/testimonials.ts. This keeps the site free of invented social proof.
 */
export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section className="container-page py-20 sm:py-24">
      <SectionHeading
        eyebrow="Testimonials"
        title="What clients say"
        description="Real feedback from people we have worked with."
        align="center"
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <Reveal key={`${testimonial.name}-${testimonial.company}`}>
            <figure className="bg-card flex h-full flex-col rounded-2xl border p-6 shadow-sm">
              <Quote aria-hidden="true" className="text-primary size-6" />
              <blockquote className="mt-4 flex-1 text-sm leading-7 text-pretty">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t pt-4">
                <span className="bg-primary/10 text-primary grid size-9 place-items-center rounded-full text-xs font-semibold">
                  {testimonial.name
                    .split(" ")
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join("")}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium">
                    {testimonial.name}
                  </span>
                  <span className="text-muted-foreground block truncate text-xs">
                    {testimonial.role}, {testimonial.company}
                  </span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
