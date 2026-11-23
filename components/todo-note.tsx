import { Info } from "lucide-react";

import { cn } from "cn";

/**
 * Clearly marked placeholder for content that must not be invented.
 * Renders a visible, intentional "not yet confirmed" state.
 */
export function TodoNote({
  children,
  label = "Note",
  className,
}: {
  children: React.ReactNode;
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border-border bg-muted/40 flex items-start gap-3 rounded-xl border border-dashed p-4",
        className,
      )}
    >
      <Info
        aria-hidden="true"
        className="text-muted-foreground mt-0.5 size-4 shrink-0"
      />
      <p className="text-muted-foreground text-sm leading-6">
        <span className="text-foreground mr-1.5 font-semibold">{label}:</span>
        {children}
      </p>
    </div>
  );
}
