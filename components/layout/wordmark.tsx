import Link from "next/link";
import Image from "next/image";

import { site } from "@/content/site";
import { cn } from "cn";

/**
 * Brand wordmark using the KL Solutions monogram.
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
      <span className="relative size-9 shrink-0 overflow-hidden rounded-xl shadow-sm ring-1 ring-black/5 transition-transform duration-300 group-hover:-rotate-3 dark:ring-white/10">
        <Image
          src="/kl-solutions-logo.png"
          alt=""
          fill
          sizes="36px"
          className="object-cover"
        />
      </span>
      {showName ? (
        <span className="font-display text-[1.05rem] leading-none font-semibold tracking-tight">
          {site.name}
        </span>
      ) : null}
    </Link>
  );
}
