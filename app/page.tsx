import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight, Check, Sparkles } from "lucide-react";

import { FinalCta } from "@/components/sections/final-cta";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { TechStack } from "@/components/sections/tech-stack";
import { Testimonials } from "@/components/sections/testimonials";
import { ProjectCard } from "@/components/project-card";
import { HeroProjectCarousel } from "@/components/hero-project-carousel";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { getFeaturedProjects } from "@/content/projects";
import { buildMetadata } from "@/lib/seo";
import { cn } from "cn";

export const metadata: Metadata = buildMetadata({
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  path: "/",
});

const highlights = [
  "Fixed scope and quote before we start",
  "A working preview from the first week",
  "You own the code, designs and accounts",
];

export default function HomePage() {
  const featured = getFeaturedProjects();
  const [lead, ...rest] = featured;

  return (
    <>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="hero-glow relative overflow-hidden">
        <div className="bg-grid mask-fade-b pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.18]" />

        <div className="container-page relative pt-10 pb-12 sm:pt-14 sm:pb-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
            <div>
              <p className="border-border bg-background/70 text-muted-foreground inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur">
                <span className="relative flex size-2">
                  <span className="bg-primary absolute inline-flex size-full animate-ping rounded-full opacity-50" />
                  <span className="bg-primary relative inline-flex size-2 rounded-full" />
                </span>
                {site.availability}
              </p>

              <h1 className="mt-6 text-4xl font-semibold tracking-[-0.035em] text-balance sm:text-5xl lg:text-[4.15rem] lg:leading-[1.02]">
                <span className="block">{site.name}</span>
                <span className="text-muted-foreground mt-2 block text-[0.72em] leading-[1.15]">
                  You bring the problem.
                  <span className="text-foreground block">We build the solution.</span>
                </span>
              </h1>

              <p className="text-muted-foreground mt-6 max-w-xl text-base leading-7 text-pretty sm:text-lg">
                {site.shortDescription}
                <span className="mt-2 block">
                  From small businesses and stores to schools and startups, we turn everyday
                  business problems into smart digital solutions.
                </span>
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={site.cta.href}
                  className={cn(buttonVariants({ size: "xl" }), "w-full sm:w-auto")}
                >
                  {site.cta.label}
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

              <ul className="mt-8 grid gap-2 sm:grid-cols-1">
                {highlights.map((item) => (
                  <li
                    key={item}
                    className="text-muted-foreground flex items-center gap-2 text-sm"
                  >
                    <Check
                      aria-hidden="true"
                      className="text-primary size-4 shrink-0"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Hero mockup */}
            <div className="relative">
              <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-primary/10 blur-3xl" />
              <div className="absolute -right-5 -top-5 -z-10 size-24 rotate-12 rounded-[1.5rem] border border-primary/20 bg-primary/5" />
              <HeroProjectCarousel projects={featured} />

              <div className="border-border bg-background/90 absolute -bottom-5 -left-3 hidden items-center gap-2 rounded-xl border px-3 py-2 shadow-lg backdrop-blur sm:flex">
                <span className="bg-signal/20 text-signal-foreground grid size-7 place-items-center rounded-lg">
                  <Sparkles aria-hidden="true" className="size-3.5" />
                </span>
                <span className="text-xs font-medium">Design → Build → Deliver</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------ Services */}
      <section className="container-page py-14 sm:py-16">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="What we do"
            title="Built around the work you actually need"
            description="Most projects need one or two of these, not all of them. We will tell you which ones matter for yours."
          />
          <Link
            href="/services"
            className="text-foreground hover:text-primary inline-flex shrink-0 items-center gap-1.5 text-sm font-medium transition-colors"
          >
            All services
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.slice(0, 4).map((service, index) => (
            <Reveal key={service.slug} delay={index * 0.05}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------- Featured work */}
      <section className="bg-muted/30 border-y">
        <div className="container-page py-14 sm:py-16">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Selected work"
              title="Projects, not portfolio filler"
              description="A few things we have designed and built, with the real constraints they had to work within."
            />
            <Link
              href="/work"
              className="text-foreground hover:text-primary inline-flex shrink-0 items-center gap-1.5 text-sm font-medium transition-colors"
            >
              View all work
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-8">
            <Reveal className="lg:col-span-2">
              <ProjectCard project={lead} priorityLayout preload />
            </Reveal>
            {rest.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.06}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- Process */}
      <section className="container-page py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <SectionHeading
              eyebrow="How we work"
              title="Four steps, no surprises"
              description="You always know what is happening this week, what is next, and what we need from you."
            />
            <Link
              href="/process"
              className={cn(buttonVariants({ variant: "outline", size: "xl" }), "mt-7")}
            >
              See the full process
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>

          <ProcessTimeline compact />
        </div>
      </section>

      <TechStack />

      <Testimonials />

      <FinalCta />
    </>
  );
}
