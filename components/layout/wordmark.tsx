import Link from "next/link";

import { site } from "@/content/site";
import { cn } from "cn";

/**
 * Temporary text-based wordmark.
 * TODO: replace the "AA" monogram with a real logo when one exists.
 */
export function Wordmark({
  className,
  showName = true,
}: {
  className?: string;
  showName?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} home`}
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-none",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="from-primary to-primary/70 text-primary-foreground relative grid size-9 shrink-0 place-items-center overflow-hidden rounded-xl bg-gradient-to-br shadow-sm ring-1 ring-black/5 transition-transform duration-300 group-hover:-rotate-3 dark:ring-white/10"
      >
        <span className="font-display text-[0.82rem] font-bold tracking-tight">AA</span>
        <span className="bg-signal/70 absolute -right-2 -bottom-2 size-4 rounded-full blur-[6px]" />
      </span>
      {showName ? (
        <span className="font-display text-[1.05rem] leading-none font-semibold tracking-tight">
          {site.name}
        </span>
      ) : null}
    </Link>
  );
}
