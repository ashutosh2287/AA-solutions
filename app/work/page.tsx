import type { Metadata } from "next";
import Link from "next/link";

import { FinalCta } from "@/components/sections/final-cta";
import { PageHeader } from "@/components/page-header";
import { WorkGrid } from "@/components/work-grid";
import { projects } from "@/content/projects";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Work",
  description:
    "Selected projects by KL Solutions — a campus food-ordering app, a study library management system, and school and club websites.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Selected work"
        title="Things we have designed and built"
        description="Four projects across food ordering, education and hospitality. Each one is live — you can open it and judge for yourself."
      />

      <section className="container-page py-14 sm:py-20">
        <h2 className="sr-only">All projects</h2>
        <WorkGrid projects={projects} />

        <p className="text-muted-foreground border-t pt-6 text-sm">
          More projects are being documented. If you want to talk through something
          similar to what you see here,{" "}
          <Link
            href="/contact"
            className="text-foreground underline underline-offset-4"
          >
            get in touch
          </Link>
          .
        </p>
      </section>

      <FinalCta
        title="Your project could be next"
        description="Tell us what you are building. We will reply with an honest view of scope, timeline and cost — even if the answer is that you do not need us."
      />
    </>
  );
}
