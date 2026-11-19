import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, Check, MessageSquare, Users } from "lucide-react";

import { FinalCta } from "@/components/sections/final-cta";
import { PageHeader } from "@/components/page-header";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { Reveal } from "@/components/reveal";
import { buttonVariants } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";
import { cn } from "cn";

export const metadata: Metadata = buildMetadata({
  title: "Process",
  description:
    "How AA Solutions works: discover, design, build, then launch and support. A clear weekly rhythm with fixed scope and a working preview from week one.",
  path: "/process",
});

const expectations = [
  {
    title: "One point of contact",
    description:
      "You talk to the person building the product, not an account manager relaying messages.",
    icon: MessageSquare,
  },
  {
    title: "A weekly rhythm",
    description:
      "Every week you get a short update: what shipped, what is next, and anything we need from you.",
    icon: Users,
  },
  {
    title: "No surprise invoices",
    description:
      "The quote covers the agreed scope. If something changes, we agree on the cost before doing the work.",
    icon: Check,
  },
];

export default function ProcessPage() {
  return (
    <>
      <PageHeader
        eyebrow="Process"
        title="A clear way to get from idea to launch"
        description="No black boxes and no month-long silences. Here is exactly how a project runs, from the first call to the support window after launch."
      >
        <Link
          href="/contact"
          className={cn(buttonVariants({ size: "xl" }), "w-full sm:w-auto")}
        >
          Start a project
          <ArrowUpRight aria-hidden="true" />
        </Link>
      </PageHeader>

      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Four phases
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-7">
              The timeline below is typical for a focused project. A business website
              moves faster; a larger platform takes longer. You get a specific plan
              before anything starts.
            </p>

            <dl className="mt-8 space-y-4 border-t pt-6 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-muted-foreground">Business website</dt>
                <dd className="font-medium">2–5 weeks</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-muted-foreground">Focused web app</dt>
                <dd className="font-medium">6–12 weeks</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-muted-foreground">AI feature</dt>
                <dd className="font-medium">3–8 weeks</dd>
              </div>
            </dl>
          </div>

          <ProcessTimeline />
        </div>
      </section>

      <section className="bg-muted/30 border-y">
        <div className="container-page py-16 sm:py-20">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            What you can expect
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {expectations.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={index * 0.05}>
                  <div className="bg-card h-full rounded-2xl border p-6">
                    <span className="bg-primary/10 text-primary grid size-10 place-items-center rounded-xl">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <h3 className="mt-4 text-base font-semibold">{item.title}</h3>
                    <p className="text-muted-foreground mt-2 text-sm leading-6">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <FinalCta
        title="Ready to start with a discovery call?"
        description="Thirty minutes, no slides. Tell us what you are trying to do and we will tell you whether we are the right fit."
      />
    </>
  );
}
