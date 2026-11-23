import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Suspense, type ComponentType } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink } from "lucide-react";

import { ProjectImage } from "@/components/project-image";
import { Reveal } from "@/components/reveal";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { JsonLd } from "@/components/json-ld";
import { getNextProject, getProject, projects } from "@/content/projects";
import { site } from "@/content/site";
import { buildMetadata, creativeWorkJsonLd } from "@/lib/seo";
import { cn } from "cn";

/**
 * Long-form case studies live in /content/case-studies/<slug>.mdx.
 * Only projects with `hasCaseStudy: true` are listed here.
 */
const caseStudies: Record<string, () => Promise<{ default: ComponentType }>> = {
  fastq: () => import("@/content/case-studies/fastq.mdx"),
  "kl-boox-house": () => import("@/content/case-studies/kl-boox-house.mdx"),
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return buildMetadata({
      title: "Project not found",
      description: "This project could not be found.",
      path: `/work/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: project.name,
    description: project.summary,
    path: `/work/${project.slug}`,
  });
}

/**
 * The route shell renders instantly; the slug-dependent content streams inside
 * a Suspense boundary, which is what Cache Components expects for params access.
 */
export default function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  return (
    <Suspense fallback={<ProjectSkeleton />}>
      <ProjectDetail params={params} />
    </Suspense>
  );
}

async function ProjectDetail({
  params,
}: {
  params: PageProps<"/work/[slug]">["params"];
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const nextProject = getNextProject(project.slug);
  const loader = project.hasCaseStudy ? caseStudies[project.slug] : undefined;
  const CaseStudy = loader ? (await loader()).default : null;

  return (
    <>
      <article>
        {/* Header */}
        <header className="relative overflow-hidden border-b">
          <div className="bg-grid mask-fade-b pointer-events-none absolute inset-0 opacity-[0.3] dark:opacity-[0.15]" />
          <div className="bg-primary/10 pointer-events-none absolute -top-24 right-1/4 size-72 rounded-full blur-3xl" />

          <div className="container-page relative py-10 sm:py-16">
            <Link
              href="/work"
              className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              All work
            </Link>

            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{project.category}</Badge>
                {project.liveUrl ? (
                  <Badge variant="outline" className="font-normal">
                    <span className="bg-signal size-1.5 rounded-full" />
                    Live
                  </Badge>
                ) : null}
              </div>

              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                {project.name}
              </h1>
              <p className="text-muted-foreground mt-3 text-lg leading-7 text-pretty sm:text-xl">
                {project.subtitle}
              </p>
              <p className="text-muted-foreground mt-5 max-w-2xl text-base leading-7">
                {project.summary}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(buttonVariants({ size: "xl" }), "w-full sm:w-auto")}
                  >
                    Visit live site
                    <ExternalLink aria-hidden="true" />
                  </a>
                ) : null}
                <Link
                  href={site.cta.href}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "xl" }),
                    "w-full sm:w-auto",
                  )}
                >
                  Start a project like this
                  <ArrowRight aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Cover */}
        <div className="container-wide py-10 sm:py-14">
          <ProjectImage
            project={project}
            slot="cover"
            preload
            sizes="(min-width: 1280px) 1200px, 96vw"
            className="shadow-xl"
          />
        </div>

        {/* Facts + narrative */}
        <div className="container-page grid gap-12 pb-16 lg:grid-cols-[1fr_320px] lg:gap-16">
          <div className="min-w-0">
            <section aria-labelledby="challenge-heading">
              <h2
                id="challenge-heading"
                className="text-2xl font-semibold tracking-tight"
              >
                The challenge
              </h2>
              {project.challenge ? (
                <p className="text-muted-foreground mt-3 text-base leading-7">
                  {project.challenge}
                </p>
              ) : (
                <p className="text-muted-foreground mt-3 text-base leading-7">
                  Challenge details will be added when confirmed.
                </p>
              )}
            </section>

            <section aria-labelledby="solution-heading" className="mt-12">
              <h2
                id="solution-heading"
                className="text-2xl font-semibold tracking-tight"
              >
                The solution
              </h2>
              {project.solution ? (
                <p className="text-muted-foreground mt-3 text-base leading-7">
                  {project.solution}
                </p>
              ) : (
                <p className="text-muted-foreground mt-3 text-base leading-7">
                  Solution details will be added when confirmed.
                </p>
              )}
            </section>

            {CaseStudy ? (
              <div className="mt-12">
                <CaseStudy />
              </div>
            ) : null}

            <section aria-labelledby="features-heading" className="mt-12">
              <h2
                id="features-heading"
                className="text-2xl font-semibold tracking-tight"
              >
                What it includes
              </h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <li
                    key={feature}
                    className="text-muted-foreground flex items-start gap-2 text-sm leading-6"
                  >
                    <span className="bg-primary mt-2 size-1.5 shrink-0 rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="results-heading" className="mt-12">
              <h2
                id="results-heading"
                className="text-2xl font-semibold tracking-tight"
              >
                Results
              </h2>
              {project.results ? (
                <p className="text-muted-foreground mt-3 text-base leading-7">
                  {project.results}
                </p>
              ) : (
                <p className="text-muted-foreground mt-3 text-base leading-7">
                  Measured results will be added when verified.
                </p>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <dl className="bg-card divide-border divide-y rounded-2xl border">
              <div className="p-5">
                <dt className="text-muted-foreground text-xs font-semibold tracking-[0.14em] uppercase">
                  Client
                </dt>
                <dd className="mt-1.5 text-sm font-medium">{project.client}</dd>
              </div>
              <div className="p-5">
                <dt className="text-muted-foreground text-xs font-semibold tracking-[0.14em] uppercase">
                  Project type
                </dt>
                <dd className="mt-1.5 text-sm font-medium">{project.type}</dd>
              </div>
              <div className="p-5">
                <dt className="text-muted-foreground text-xs font-semibold tracking-[0.14em] uppercase">
                  Stack
                </dt>
                <dd className="mt-2">
                  {project.tech.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="secondary" className="font-normal">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">Stack details coming soon.</p>
                  )}
                </dd>
              </div>
              {project.liveUrl ? (
                <div className="p-5">
                  <dt className="text-muted-foreground text-xs font-semibold tracking-[0.14em] uppercase">
                    Live site
                  </dt>
                  <dd className="mt-1.5">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary inline-flex items-center gap-1 text-sm font-medium underline underline-offset-4"
                    >
                      {project.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                      <ArrowUpRight aria-hidden="true" className="size-3.5" />
                    </a>
                  </dd>
                </div>
              ) : null}
            </dl>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="font-normal">
                  {tag}
                </Badge>
              ))}
            </div>
          </aside>
        </div>

        {/* Screens */}
        <section className="bg-muted/30 border-y">
          <div className="container-page py-16 sm:py-20">
            <h2 className="text-2xl font-semibold tracking-tight">Key screens</h2>
            <p className="text-muted-foreground mt-2 max-w-xl text-sm leading-6">
              Desktop and mobile views. Screenshots are captured from the live site — if
              a slot is empty, a placeholder is shown instead.
            </p>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_0.9fr]">
              <div className="space-y-6">
                <Reveal>
                  <ProjectImage
                    project={project}
                    slot="desktop-1"
                    sizes="(min-width: 1024px) 720px, 92vw"
                  />
                </Reveal>
                <Reveal delay={0.05}>
                  <ProjectImage
                    project={project}
                    slot="desktop-2"
                    sizes="(min-width: 1024px) 720px, 92vw"
                  />
                </Reveal>
              </div>
              <Reveal
                delay={0.1}
                className="mx-auto w-full max-w-[280px] lg:max-w-none"
              >
                <ProjectImage
                  project={project}
                  slot="mobile-1"
                  sizes="(min-width: 1024px) 360px, 60vw"
                />
              </Reveal>
            </div>
          </div>
        </section>

        {/* Next project */}
        <section className="container-page py-16 sm:py-20">
          <div className="border-border flex flex-col gap-6 rounded-2xl border p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="text-muted-foreground text-xs font-semibold tracking-[0.14em] uppercase">
                Next project
              </p>
              <p className="font-display mt-2 text-2xl font-semibold tracking-tight">
                {nextProject.name}
              </p>
              <p className="text-muted-foreground mt-1 text-sm">
                {nextProject.subtitle}
              </p>
            </div>
            <Link
              href={`/work/${nextProject.slug}`}
              className={cn(
                buttonVariants({ variant: "outline", size: "xl" }),
                "shrink-0",
              )}
            >
              View project
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </section>
      </article>

      <JsonLd
        data={creativeWorkJsonLd({
          name: project.name,
          description: project.summary,
          path: `/work/${project.slug}`,
          liveUrl: project.liveUrl,
          tags: project.tags,
        })}
      />
    </>
  );
}

function ProjectSkeleton() {
  return (
    <div className="container-page animate-pulse py-16" aria-hidden="true">
      <div className="bg-muted h-4 w-24 rounded" />
      <div className="bg-muted mt-8 h-12 w-2/3 rounded-lg" />
      <div className="bg-muted mt-4 h-5 w-1/2 rounded" />
      <div className="bg-muted mt-8 aspect-[16/10] w-full rounded-2xl" />
    </div>
  );
}
