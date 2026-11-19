"use client";

import Image from "next/image";
import { useState } from "react";
import { Monitor, Smartphone } from "lucide-react";

import type { Project, ProjectAccent, ProjectImageSlot } from "@/content/types";
import { hasProjectImage } from "@/lib/project-images";
import { cn } from "cn";

const accentStyles: Record<
  ProjectAccent,
  { from: string; to: string; glow: string; chip: string }
> = {
  amber: {
    from: "from-amber-400/90",
    to: "to-orange-500/90",
    glow: "bg-amber-300/40",
    chip: "bg-amber-100 text-amber-900 dark:bg-amber-400/15 dark:text-amber-200",
  },
  emerald: {
    from: "from-emerald-400/90",
    to: "to-teal-600/90",
    glow: "bg-emerald-300/40",
    chip: "bg-emerald-100 text-emerald-900 dark:bg-emerald-400/15 dark:text-emerald-200",
  },
  indigo: {
    from: "from-indigo-400/90",
    to: "to-violet-600/90",
    glow: "bg-indigo-300/40",
    chip: "bg-indigo-100 text-indigo-900 dark:bg-indigo-400/15 dark:text-indigo-200",
  },
  rose: {
    from: "from-rose-400/90",
    to: "to-pink-600/90",
    glow: "bg-rose-300/40",
    chip: "bg-rose-100 text-rose-900 dark:bg-rose-400/15 dark:text-rose-200",
  },
};

const slotRatio: Record<ProjectImageSlot, string> = {
  cover: "aspect-[16/10]",
  "desktop-1": "aspect-[16/10]",
  "desktop-2": "aspect-[16/10]",
  "mobile-1": "aspect-[9/19.5]",
};

/**
 * Renders a project screenshot if one exists at
 * /public/projects/<slug>/<slot>.png, and a designed placeholder otherwise.
 *
 * Existence is read from the generated screenshot manifest, so a missing file
 * never triggers a 404 request. The `onError` fallback covers the case where a
 * file is deleted after the manifest was generated.
 */
export function ProjectImage({
  project,
  slot,
  alt,
  className,
  sizes = "(min-width: 1024px) 640px, (min-width: 640px) 90vw, 100vw",
  preload = false,
  chrome = true,
}: {
  project: Project;
  slot: ProjectImageSlot;
  alt?: string;
  className?: string;
  sizes?: string;
  preload?: boolean;
  chrome?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const available = hasProjectImage(project.slug, slot);
  const isMobile = slot === "mobile-1";
  const src = `/projects/${project.slug}/${slot}.png`;
  const label = alt ?? `${project.name} — ${slot.replace("-", " ")} screenshot`;

  return (
    <div
      className={cn(
        "bg-muted/40 relative overflow-hidden rounded-2xl border",
        slotRatio[slot],
        className,
      )}
    >
      {available && !failed ? (
        <Image
          src={src}
          alt={label}
          fill
          sizes={sizes}
          loading={preload ? "eager" : undefined}
          fetchPriority={preload ? "high" : undefined}
          className="object-cover object-top"
          onError={() => setFailed(true)}
        />
      ) : (
        <Placeholder
          project={project}
          slot={slot}
          chrome={chrome}
          isMobile={isMobile}
        />
      )}
    </div>
  );
}

function Placeholder({
  project,
  slot,
  chrome,
  isMobile,
}: {
  project: Project;
  slot: ProjectImageSlot;
  chrome: boolean;
  isMobile: boolean;
}) {
  const accent = accentStyles[project.accent];

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 select-none"
      data-placeholder="true"
    >
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br",
          accent.from,
          accent.to,
          "opacity-[0.16] dark:opacity-25",
        )}
      />
      <div className="bg-dots absolute inset-0 opacity-40" />
      <div
        className={cn(
          "absolute -top-16 -right-10 size-48 rounded-full blur-3xl",
          accent.glow,
        )}
      />

      <div className="relative flex h-full flex-col p-3 sm:p-4">
        {chrome ? (
          <div className="flex items-center gap-2 pb-3">
            <span className="flex gap-1">
              <span className="size-2 rounded-full bg-rose-400/80" />
              <span className="size-2 rounded-full bg-amber-400/80" />
              <span className="size-2 rounded-full bg-emerald-400/80" />
            </span>
            <span className="bg-background/70 text-muted-foreground flex h-5 flex-1 items-center truncate rounded-md px-2 text-[9px] font-medium tracking-wide">
              {project.liveUrl
                ? project.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
                : `${project.slug}.example.com`}
            </span>
          </div>
        ) : null}

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-white/25 bg-white/60 p-3 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-black/25">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-[11px] font-semibold tracking-tight sm:text-xs">
                {project.name}
              </p>
              <p className="text-muted-foreground mt-0.5 truncate text-[8px] sm:text-[9px]">
                {project.subtitle}
              </p>
            </div>
            <span
              className={cn(
                "shrink-0 rounded-full px-1.5 py-0.5 text-[7px] font-semibold sm:text-[8px]",
                accent.chip,
              )}
            >
              {project.category}
            </span>
          </div>

          <div className="mt-2.5 grid flex-1 grid-cols-3 gap-1.5">
            <div className="bg-foreground/[0.06] col-span-2 rounded-md" />
            <div className="flex flex-col gap-1.5">
              <div className="bg-foreground/[0.06] flex-1 rounded-md" />
              <div className="bg-foreground/[0.04] h-1/3 rounded-md" />
            </div>
          </div>

          <div className="mt-1.5 grid grid-cols-3 gap-1.5">
            <div className="bg-foreground/[0.05] h-4 rounded" />
            <div className="bg-foreground/[0.04] h-4 rounded" />
            <div className="bg-foreground/[0.03] h-4 rounded" />
          </div>

          <div className="mt-auto flex items-center justify-between pt-2.5">
            <span className="text-muted-foreground inline-flex items-center gap-1 text-[7px] font-medium sm:text-[8px]">
              {isMobile || slot === "mobile-1" ? (
                <Smartphone className="size-2.5" />
              ) : (
                <Monitor className="size-2.5" />
              )}
              Placeholder — add {slot}.png
            </span>
            <span className="bg-foreground/10 h-1 w-10 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
