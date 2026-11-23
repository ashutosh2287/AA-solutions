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
      <span
        data-testid="brand-logo"
        style={{ colorScheme: "light" }}
        className="relative size-9 shrink-0 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/10 transition-transform duration-300 group-hover:-rotate-3"
      >
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
