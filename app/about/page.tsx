import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, Check } from "lucide-react";

import { FinalCta } from "@/components/sections/final-cta";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { TodoNote } from "@/components/todo-note";
import { buttonVariants } from "@/components/ui/button";
import { about, aboutFacts, founder } from "@/content/about";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";
import { cn } from "cn";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "AA Solutions is a small app and web development studio working with schools, colleges, local businesses and early-stage startups.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About" title={`${site.name} is a small studio, on purpose`}>
        <p className="text-muted-foreground max-w-2xl text-base leading-7 sm:text-lg">
          {about.intro}
        </p>
      </PageHeader>

      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Why we started
            </h2>
            <div className="mt-5 space-y-4">
              {about.story.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="text-muted-foreground text-base leading-7"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <h2 className="mt-12 text-2xl font-semibold tracking-tight sm:text-3xl">
              How we work
            </h2>
            <ul className="mt-5 space-y-3">
              {about.approach.map((item) => (
                <li key={item} className="flex items-start gap-3 text-base leading-7">
                  <Check
                    aria-hidden="true"
                    className="text-primary mt-1.5 size-4 shrink-0"
                  />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="space-y-4">
            <dl className="bg-card divide-border divide-y rounded-2xl border">
              {aboutFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex items-center justify-between gap-4 p-5"
                >
                  <dt className="text-muted-foreground text-sm">{fact.label}</dt>
                  <dd className="text-right text-sm font-medium">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <div className="bg-muted/40 rounded-2xl border p-5">
              <p className="text-sm leading-6">
                <span className="font-semibold">Working with us directly.</span>{" "}
                <span className="text-muted-foreground">
                  The person who scopes your project is the person who designs and
                  builds it.
                </span>
              </p>
              <Link
                href="/contact"
                className="text-primary mt-3 inline-flex items-center gap-1 text-sm font-medium"
              >
                Start a conversation
                <ArrowUpRight aria-hidden="true" className="size-3.5" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-muted/30 border-y">
        <div className="container-page py-16 sm:py-20">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            What we care about
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {about.values.map((value, index) => (
              <Reveal key={value.title} delay={index * 0.05}>
                <div className="bg-card h-full rounded-2xl border p-6">
                  <h3 className="text-base font-semibold">{value.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-6">
                    {value.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Who you will work with
        </h2>

        <div className="mt-8 grid gap-6 rounded-2xl border p-6 sm:grid-cols-[auto_1fr] sm:items-start sm:p-8">
          <div
            aria-hidden="true"
            className="bg-muted text-muted-foreground grid size-20 place-items-center rounded-2xl border border-dashed text-xs font-semibold tracking-wide"
          >
            TODO
          </div>
          <div>
            <p className="font-display text-xl font-semibold tracking-tight">
              {founder.name}
            </p>
            <p className="text-muted-foreground mt-1 text-sm">{founder.role}</p>
            <p className="text-muted-foreground mt-4 max-w-xl text-sm leading-6">
              {founder.bio}
            </p>
            <TodoNote className="mt-4">
              add the founder&apos;s name, a short bio and a photo (
              <code className="text-foreground">content/about.ts</code> and{" "}
              <code className="text-foreground">/public/team/</code>).
            </TodoNote>
          </div>
        </div>
      </section>

      <FinalCta
        title="Want to work together?"
        description="We take on a small number of projects at a time so each one gets proper attention. Tell us what you have in mind."
      />

      <div className="container-page pb-16">
        <Link
          href="/work"
          className={cn(buttonVariants({ variant: "outline", size: "xl" }))}
        >
          See the work
          <ArrowUpRight aria-hidden="true" />
        </Link>
      </div>
    </>
  );
}
