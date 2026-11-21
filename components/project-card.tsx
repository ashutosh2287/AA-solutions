import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Project } from "@/content/types";
import { ProjectImage } from "@/components/project-image";
import { Badge } from "@/components/ui/badge";

export function ProjectCard({
  project,
  preload = false,
  priorityLayout = false,
}: {
  project: Project;
  preload?: boolean;
  priorityLayout?: boolean;
}) {
  return (
    <article className="group relative flex h-full flex-col">
      <Link
        href={`/work/${project.slug}`}
        className="focus-visible:ring-ring flex h-full flex-col rounded-2xl focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
      >
        <div className="relative overflow-hidden rounded-2xl border bg-card shadow-sm">
          <ProjectImage
            project={project}
            slot="cover"
            preload={preload}
            sizes={
              priorityLayout
                ? "(min-width: 1024px) 640px, (min-width: 640px) 90vw, 100vw"
                : "(min-width: 1024px) 420px, (min-width: 640px) 45vw, 100vw"
            }
            className="transition-transform duration-500 ease-out group-hover:scale-[1.015]"
          />
          <div className="absolute inset-0 rounded-2xl ring-1 ring-black/5 ring-inset dark:ring-white/10" />
        </div>

        <div className="flex flex-1 flex-col pt-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="font-display text-lg font-semibold tracking-tight">
                {project.name}
              </h3>
              <p className="text-muted-foreground mt-1 text-sm leading-6">
                {project.subtitle}
              </p>
            </div>
            <span className="border-border bg-background text-foreground group-hover:bg-foreground group-hover:text-background grid size-9 shrink-0 place-items-center rounded-full border transition-colors">
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="font-normal">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}
