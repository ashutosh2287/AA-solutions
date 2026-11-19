import Link from "next/link";
import type { MDXComponents } from "mdx/types";

import { cn } from "cn";

/**
 * Global element styles for long-form MDX (case studies).
 * Kept intentionally explicit so case-study copy stays consistent with the
 * rest of the design system without relying on a typography plugin.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ className, ...props }) => (
      <h2
        className={cn(
          "font-display mt-12 mb-4 text-2xl font-semibold tracking-tight sm:text-3xl",
          className,
        )}
        {...props}
      />
    ),
    h3: ({ className, ...props }) => (
      <h3
        className={cn(
          "font-display mt-8 mb-3 text-xl font-semibold tracking-tight",
          className,
        )}
        {...props}
      />
    ),
    p: ({ className, ...props }) => (
      <p
        className={cn("text-muted-foreground mb-5 text-base leading-7", className)}
        {...props}
      />
    ),
    ul: ({ className, ...props }) => (
      <ul
        className={cn(
          "text-muted-foreground marker:text-primary mb-6 list-disc space-y-2 pl-5 text-base leading-7",
          className,
        )}
        {...props}
      />
    ),
    ol: ({ className, ...props }) => (
      <ol
        className={cn(
          "text-muted-foreground marker:text-primary mb-6 list-decimal space-y-2 pl-5 text-base leading-7",
          className,
        )}
        {...props}
      />
    ),
    li: ({ className, ...props }) => (
      <li className={cn("pl-1", className)} {...props} />
    ),
    strong: ({ className, ...props }) => (
      <strong className={cn("text-foreground font-semibold", className)} {...props} />
    ),
    a: ({ className, href = "", ...props }) => {
      const isExternal = /^https?:\/\//.test(href);
      return (
        <Link
          href={href}
          className={cn(
            "text-primary decoration-primary/40 hover:decoration-primary font-medium underline underline-offset-4 transition-colors",
            className,
          )}
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...props}
        />
      );
    },
    blockquote: ({ className, ...props }) => (
      <blockquote
        className={cn(
          "border-primary/40 text-foreground my-8 border-l-2 pl-5 text-lg font-medium italic",
          className,
        )}
        {...props}
      />
    ),
    code: ({ className, ...props }) => (
      <code
        className={cn(
          "bg-muted text-foreground rounded-md px-1.5 py-0.5 font-mono text-[0.9em]",
          className,
        )}
        {...props}
      />
    ),
    hr: ({ className, ...props }) => (
      <hr className={cn("border-border my-10", className)} {...props} />
    ),
    ...components,
  };
}
