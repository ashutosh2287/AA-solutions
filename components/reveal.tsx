"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "cn";

/**
 * Small, restrained entrance animation.
 * Motion is skipped entirely when the user prefers reduced motion, and the
 * content is always present in the DOM for SEO and no-JS rendering.
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
  const reduceMotion = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(className)}
    >
      {children}
    </Component>
  );
}
