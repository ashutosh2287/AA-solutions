import Link from "next/link";
import {
  ArrowRight,
  Globe,
  Palette,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

import type { Service, ServiceIcon } from "@/content/types";
import { cn } from "cn";

const icons: Record<ServiceIcon, LucideIcon> = {
  globe: Globe,
  smartphone: Smartphone,
  palette: Palette,
};

export function ServiceCard({
  service,
  className,
}: {
  service: Service;
  className?: string;
}) {
  const Icon = icons[service.icon];

  return (
    <Link
      href={`/services#${service.slug}`}
      className={cn(
        "group bg-card focus-visible:ring-ring relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_18px_50px_-24px_color-mix(in_oklch,var(--primary)_55%,transparent)] focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none",
        className,
      )}
    >
      <span className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground grid size-11 place-items-center rounded-xl transition-colors">
        <Icon aria-hidden="true" className="size-5" />
      </span>

      <h3 className="font-display mt-5 text-lg font-semibold tracking-tight">
        {service.title}
      </h3>
      <p className="text-muted-foreground mt-2 flex-1 text-sm leading-6">
        {service.summary}
      </p>

      <span className="text-primary mt-5 inline-flex items-center gap-1.5 text-sm font-medium">
        Learn more
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform group-hover:translate-x-0.5"
        />
      </span>
    </Link>
  );
}
