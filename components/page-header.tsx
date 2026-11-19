import type { ReactNode } from "react";

import { cn } from "cn";

/**
 * Consistent page intro used by every inner route.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b">
      <div className="bg-grid mask-fade-b pointer-events-none absolute inset-0 opacity-[0.3] dark:opacity-[0.15]" />
      <div className="bg-primary/10 pointer-events-none absolute -top-24 left-1/3 size-72 rounded-full blur-3xl" />

      <div className={cn("container-page relative py-14 sm:py-20", className)}>
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="text-primary mb-3 text-xs font-semibold tracking-[0.16em] uppercase">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="text-muted-foreground mt-5 max-w-2xl text-base leading-7 text-pretty sm:text-lg">
              {description}
            </p>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
