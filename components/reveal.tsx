"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { cn } from "cn";

/**
 * Lightweight entrance reveal using IntersectionObserver + CSS transitions.
 * Content is always present in the DOM for SEO/no-JS; reduced-motion users
 * see content immediately.
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
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const node = ref.current;
    if (!node || visible) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -80px 0px", threshold: 0.1 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduceMotion, visible]);

  const Component = as;
  const shown = reduceMotion || visible;

  return (
    <Component
      ref={ref as never}
      data-reveal=""
      className={cn("will-change-transform", className)}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : `translate3d(0, ${y}px, 0)`,
        transition: shown
          ? `opacity 550ms cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 550ms cubic-bezier(0.22,1,0.36,1) ${delay}s`
          : undefined,
      }}
    >
      {children}
    </Component>
  );
}
