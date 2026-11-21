import { Check } from "lucide-react";

import { processSteps } from "@/content/process";
import { Reveal } from "@/components/reveal";
import { cn } from "cn";

/**
 * Vertical, connected timeline of the four delivery phases.
 * Used on the home page (compact) and the process page (full).
 */
export function ProcessTimeline({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <ol className={cn("relative space-y-7 sm:space-y-9", className)}>
      <span
        aria-hidden="true"
        className="bg-border absolute top-2 bottom-2 left-[19px] w-px sm:left-[23px]"
      />

      {processSteps.map((step, index) => (
        <Reveal as="li" key={step.slug} delay={index * 0.06} className="relative">
          <div className="flex gap-5 sm:gap-7">
            <span className="bg-background text-primary ring-border relative z-10 grid size-10 shrink-0 place-items-center rounded-full text-sm font-semibold ring-1 sm:size-12">
              {step.number}
            </span>

            <div className="min-w-0 flex-1 pb-1">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
                  {step.title}
                </h3>
                <span className="text-muted-foreground text-xs font-medium tracking-wide">
                  {step.duration}
                </span>
              </div>

              <p className="text-muted-foreground mt-2 max-w-xl text-sm leading-7 sm:text-base">
                {step.description}
              </p>

              {!compact ? (
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {step.clientGets.map((item) => (
                    <li
                      key={item}
                      className="text-muted-foreground flex items-start gap-2 text-sm"
                    >
                      <Check
                        aria-hidden="true"
                        className="text-primary mt-0.5 size-4 shrink-0"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
