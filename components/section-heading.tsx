import { cn } from "cn";

/**
 * Standard eyebrow + heading + intro block used at the top of sections.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  as: Heading = "h2",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-primary mb-4 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase">
          <span className="h-px w-6 bg-primary" />
          {eyebrow}
        </p>
      ) : null}
      <Heading className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </Heading>
      {description ? (
        <p className="text-muted-foreground mt-4 text-base leading-7 text-pretty sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
