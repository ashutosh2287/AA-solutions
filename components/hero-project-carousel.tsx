"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

import { ProjectImage } from "@/components/project-image";
import type { Project } from "@/content/types";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { cn } from "cn";

export function HeroProjectCarousel({
  projects,
}: {
  projects: readonly Project[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reduceMotion || projects.length < 2) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % projects.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [activeIndex, projects.length, reduceMotion]);

  const activeProject = projects[activeIndex] ?? projects[0];

  const moveTo = (index: number) => {
    setActiveIndex((index + projects.length) % projects.length);
  };

  return (
    <div className="border-border/70 bg-card/80 rounded-3xl border p-3 shadow-[0_30px_80px_-28px_color-mix(in_oklch,var(--primary)_45%,transparent)] backdrop-blur">
      <div className="relative overflow-hidden rounded-xl">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeProject.slug}
            initial={reduceMotion ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0, x: -24 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProjectImage
              project={activeProject}
              slot="cover"
              preload={activeIndex === 0}
              sizes="(min-width: 1024px) 560px, 92vw"
              className="rounded-xl"
            />
          </motion.div>
        </AnimatePresence>

        {projects.length > 1 ? (
          <div className="absolute right-3 bottom-3 flex items-center gap-1 rounded-full border border-white/20 bg-black/45 p-1 text-white backdrop-blur-md">
            <button
              type="button"
              aria-label="Previous project"
              onClick={() => moveTo(activeIndex - 1)}
              className="grid size-8 place-items-center rounded-full transition-colors hover:bg-white/15"
            >
              <ArrowLeft aria-hidden="true" className="size-3.5" />
            </button>
            <button
              type="button"
              aria-label="Next project"
              onClick={() => moveTo(activeIndex + 1)}
              className="grid size-8 place-items-center rounded-full transition-colors hover:bg-white/15"
            >
              <ArrowRight aria-hidden="true" className="size-3.5" />
            </button>
          </div>
        ) : null}
      </div>

      <div className="flex items-center justify-between gap-3 px-1 pt-3 pb-1">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{activeProject.name}</p>
          <p className="text-muted-foreground truncate text-xs">
            {activeProject.subtitle}
          </p>
        </div>
        <Link
          href={`/work/${activeProject.slug}`}
          className="text-muted-foreground hover:text-foreground inline-flex shrink-0 items-center gap-1 text-xs font-medium"
        >
          View case study
          <ArrowUpRight aria-hidden="true" className="size-3.5" />
        </Link>
      </div>

      {projects.length > 1 ? (
        <div className="flex items-center justify-center gap-1.5 px-1 pb-1">
          {projects.map((project, index) => (
            <button
              key={project.slug}
              type="button"
              aria-label={`Show ${project.name}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => moveTo(index)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                index === activeIndex
                  ? "w-5 bg-primary"
                  : "w-1.5 bg-border hover:bg-muted-foreground",
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
