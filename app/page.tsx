import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight, Check, Sparkles } from "lucide-react";

import { FinalCta } from "@/components/sections/final-cta";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { TechStack } from "@/components/sections/tech-stack";
import { Testimonials } from "@/components/sections/testimonials";
import { ProjectCard } from "@/components/project-card";
import { ProjectImage } from "@/components/project-image";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { getFeaturedProjects, projects } from "@/content/projects";
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

        <div className="container-page relative pt-14 pb-16 sm:pt-20 sm:pb-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <p className="border-border bg-background/70 text-muted-foreground inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur">
                <span className="relative flex size-2">
                  <span className="bg-signal absolute inline-flex size-full animate-ping rounded-full opacity-70" />
                  <span className="bg-signal relative inline-flex size-2 rounded-full" />
                </span>
                {site.availability}
              </p>

              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-[3.6rem] lg:leading-[1.05]">
                <span className="block">{site.name}</span>
                <span className="text-muted-foreground mt-2 block text-[0.72em] leading-[1.15]">
                  Apps and websites people{" "}
                  <span className="text-foreground">actually use</span>.
                </span>
              </h1>

              <p className="text-muted-foreground mt-6 max-w-xl text-base leading-7 text-pretty sm:text-lg">
                {site.shortDescription} We handle the design, the build and the launch —
                so you get something real, not a deck of slides.
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
              <div className="bg-primary/20 absolute -inset-6 -z-10 rounded-[2rem] blur-2xl" />
              <div className="border-border/70 bg-card/70 rounded-3xl border p-3 shadow-xl backdrop-blur">
                <ProjectImage
                  project={lead}
                  slot="cover"
                  preload
                  sizes="(min-width: 1024px) 560px, 92vw"
                  className="rounded-xl"
                />
                <div className="flex items-center justify-between gap-3 px-1 pt-3 pb-1">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{lead.name}</p>
                    <p className="text-muted-foreground truncate text-xs">
                      {lead.subtitle}
                    </p>
                  </div>
                  <Link
                    href={`/work/${lead.slug}`}
                    className="text-muted-foreground hover:text-foreground inline-flex shrink-0 items-center gap-1 text-xs font-medium"
                  >
                    View case study
                    <ArrowUpRight aria-hidden="true" className="size-3.5" />
                  </Link>
                </div>
              </div>

              <div className="border-border bg-background/90 absolute -bottom-5 -left-3 hidden items-center gap-2 rounded-xl border px-3 py-2 shadow-lg backdrop-blur sm:flex">
                <span className="bg-signal/20 text-signal-foreground grid size-7 place-items-center rounded-lg">
                  <Sparkles aria-hidden="true" className="size-3.5" />
                </span>
                <span className="text-xs font-medium">Design → Build → Launch</span>
              </div>
            </div>
          </div>

          {/* Project name strip */}
          <div className="border-border/70 mt-16 border-t pt-6">
            <p className="text-muted-foreground text-xs font-medium tracking-[0.14em] uppercase">
              Selected work
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 sm:flex sm:flex-wrap sm:items-center sm:gap-x-8">
              {projects.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/work/${project.slug}`}
                    className="text-muted-foreground hover:text-foreground font-display inline-flex items-center gap-1 text-sm font-medium transition-colors sm:text-base"
                  >
                    {project.name}
                    <ArrowUpRight aria-hidden="true" className="size-3.5 opacity-50" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ Services */}
      <section className="container-page py-20 sm:py-24">
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
        <div className="container-page py-20 sm:py-24">
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
      <section className="container-page py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
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
