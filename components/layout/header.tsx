"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

import { site } from "@/content/site";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";
import { ThemeToggle } from "./theme-toggle";
import { Wordmark } from "./wordmark";

function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const reduceMotion = usePrefersReducedMotion();
  // Tie the menu to the route it was opened on: navigating closes it without
  // needing a state-syncing effect.
  const [openForPath, setOpenForPath] = useState<string | null>(null);
  const open = openForPath === pathname;
  const [scrolled, setScrolled] = useState(false);

  const setOpen = (next: boolean) => setOpenForPath(next ? pathname : null);

  // Add a border/blur once the page is scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on Escape and lock background scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenForPath(null);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-300",
        scrolled || open
          ? "bg-background/85 border-border/70 border-b backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-wide flex h-16 items-center justify-between gap-4">
        <Wordmark />

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {site.nav.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
                {active ? (
                  <span className="bg-primary absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full" />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <Link
            href={site.cta.href}
            className={cn(buttonVariants({ size: "xl" }), "hidden sm:inline-flex")}
          >
            {site.cta.label}
            <ArrowUpRight aria-hidden="true" />
          </Link>
          <button
            type="button"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "md:hidden",
            )}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={reduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={
              reduceMotion ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }
            }
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="bg-background/95 overflow-hidden border-t backdrop-blur-xl md:hidden"
          >
            <nav
              aria-label="Mobile"
              className="container-wide flex flex-col gap-1 py-4"
            >
              {[...site.nav, { label: "Contact", href: "/contact" }].map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-3 py-3 text-base font-medium transition-colors",
                      active
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    {item.label}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="text-muted-foreground size-4"
                    />
                  </Link>
                );
              })}
              <Link
                href={site.cta.href}
                className={cn(buttonVariants({ size: "xl" }), "mt-2 w-full")}
              >
                {site.cta.label}
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
