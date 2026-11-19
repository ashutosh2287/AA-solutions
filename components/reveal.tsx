"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { cn } from "cn";

/**
 * Small, restrained entrance animation.
 *
 * `initial` is a constant so the server and the first client render produce
 * identical HTML. The reduced-motion preference is read after hydration via
 * `usePrefersReducedMotion`, and CSS forces these elements visible for people
 * who prefer reduced motion (see globals.css).
 *
 * Content is always present in the DOM for SEO and no-JS rendering.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 16,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li" | "span";
}) {
  const reduceMotion = usePrefersReducedMotion();
  const Component = motion[as];

  return (
    <Component
      data-reveal=""
      initial={{ opacity: 0, y }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      animate={reduceMotion ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(className)}
    >
      {children}
    </Component>
  );
}
