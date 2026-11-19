"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getSnapshot(): boolean {
  return window.matchMedia(QUERY).matches;
}

/**
 * Always matches the server render during hydration.
 *
 * `framer-motion`'s `useReducedMotion()` reads the media query on the client
 * immediately, so its value can differ from the server-rendered value and
 * change props such as `initial`, causing a hydration mismatch for users who
 * prefer reduced motion. `useSyncExternalStore` uses the server snapshot for
 * the hydration render, then updates on the next render.
 */
function getServerSnapshot(): boolean {
  return false;
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
