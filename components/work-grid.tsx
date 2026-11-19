"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import type { Project, ProjectCategory } from "@/content/types";
import { projectCategories } from "@/content/projects";
import { ProjectCard } from "@/components/project-card";
import { cn } from "cn";

type Filter = "All" | ProjectCategory;

const filters: readonly Filter[] = ["All", ...projectCategories];

export function WorkGrid({ projects }: { projects: readonly Project[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const reduceMotion = useReducedMotion();

  const visible = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((project) => project.categories.includes(filter)),
    [filter, projects],
  );

  return (
    <div>
      <div
        role="group"
        aria-label="Filter projects by category"
        className="flex flex-wrap gap-2"
      >
        {filters.map((option) => {
          const active = filter === option;
          const count =
            option === "All"
              ? projects.length
              : projects.filter((project) => project.categories.includes(option))
                  .length;

          return (
            <button
              key={option}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(option)}
              className={cn(
                "focus-visible:ring-ring inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
                active
                  ? "bg-foreground text-background border-foreground"
                  : "bg-background text-muted-foreground hover:text-foreground hover:border-foreground/30",
              )}
            >
              {option}
              <span
                className={cn(
                  "text-[0.7rem] tabular-nums",
                  active ? "text-background/60" : "text-muted-foreground/70",
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="sr-only">
        {visible.length} {visible.length === 1 ? "project" : "projects"} shown
      </p>

      <motion.ul layout className="mt-10 grid gap-10 sm:grid-cols-2 lg:gap-8">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project) => (
            <motion.li
              key={project.slug}
              layout
              initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard project={project} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
