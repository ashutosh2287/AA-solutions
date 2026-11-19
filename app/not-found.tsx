import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

export default function NotFound() {
  return (
    <section className="hero-glow relative overflow-hidden">
      <div className="bg-grid mask-fade-b pointer-events-none absolute inset-0 opacity-[0.3] dark:opacity-[0.15]" />

      <div className="container-page relative flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <span className="bg-primary/10 text-primary grid size-14 place-items-center rounded-2xl">
          <Compass aria-hidden="true" className="size-6" />
        </span>

        <p className="text-primary mt-6 text-xs font-semibold tracking-[0.16em] uppercase">
          404
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          This page took a wrong turn
        </h1>
        <p className="text-muted-foreground mt-4 max-w-md text-base leading-7">
          The link may be out of date, or the page may have moved. Try one of these
          instead.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className={cn(buttonVariants({ size: "xl" }))}>
            <ArrowLeft aria-hidden="true" />
            Back to home
          </Link>
          <Link
            href="/work"
            className={cn(buttonVariants({ variant: "outline", size: "xl" }))}
          >
            See our work
          </Link>
        </div>

        <nav aria-label="Useful links" className="mt-10">
          <ul className="text-muted-foreground flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            {[
              { label: "Services", href: "/services" },
              { label: "Process", href: "/process" },
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
