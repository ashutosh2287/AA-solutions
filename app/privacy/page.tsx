import type { Metadata } from "next";
import { ShieldAlert } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { privacy } from "@/content/privacy";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How AA Solutions collects, uses and protects information submitted through this website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description={`Last updated: ${privacy.lastUpdated}`}
      />

      <div className="container-page py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_280px] lg:gap-16">
          <div className="min-w-0">
            {privacy.needsReview ? (
              <div className="border-destructive/30 bg-destructive/5 mb-10 flex items-start gap-3 rounded-xl border p-4">
                <ShieldAlert
                  aria-hidden="true"
                  className="text-destructive mt-0.5 size-4 shrink-0"
                />
                <p className="text-sm leading-6">
                  <span className="font-semibold">Needs legal review.</span> This policy
                  is a starting template, not legal advice. Replace every bracketed
                  placeholder and have it reviewed by a qualified professional before
                  launch.
                </p>
              </div>
            ) : null}

            <p className="text-muted-foreground text-base leading-7">{privacy.intro}</p>

            <div className="mt-10 space-y-10">
              {privacy.sections.map((section) => (
                <section key={section.heading} aria-labelledby={section.heading}>
                  <h2
                    id={section.heading}
                    className="text-xl font-semibold tracking-tight"
                  >
                    {section.heading}
                  </h2>
                  <div className="mt-3 space-y-3">
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 40)}
                        className="text-muted-foreground text-sm leading-7"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {section.bullets ? (
                    <ul className="text-muted-foreground mt-3 list-disc space-y-1.5 pl-5 text-sm leading-7">
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <nav
              aria-label="On this page"
              className="bg-card rounded-2xl border p-5 text-sm"
            >
              <p className="text-xs font-semibold tracking-[0.14em] uppercase">
                On this page
              </p>
              <ul className="mt-3 space-y-2">
                {privacy.sections.map((section) => (
                  <li key={section.heading}>
                    <a
                      href={`#${section.heading}`}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <p className="text-muted-foreground mt-4 text-xs leading-6">
              Questions? Email{" "}
              <a
                href={site.contact.emailHref}
                className="text-foreground underline underline-offset-4"
              >
                {site.contact.email}
              </a>
              .
            </p>
          </aside>
        </div>
      </div>
    </>
  );
}
