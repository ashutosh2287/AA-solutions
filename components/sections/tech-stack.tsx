const technologies = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "PostgreSQL",
  "Prisma",
  "Framer Motion",
  "Vercel",
  "Resend",
  "Stripe",
  "Figma",
];

/**
 * Quiet, continuously scrolling tech strip.
 * Pauses for reduced-motion users and on hover/focus.
 */
export function TechStack() {
  const track = [...technologies, ...technologies];

  return (
    <section
      aria-labelledby="tech-stack-heading"
      className="bg-muted/30 border-y py-10"
    >
      <div className="container-page">
        <h2
          id="tech-stack-heading"
          className="text-muted-foreground text-center text-xs font-semibold tracking-[0.16em] uppercase"
        >
          Tools we build with
        </h2>
      </div>

      <div className="mask-fade-x mt-6 overflow-hidden">
        <ul className="animate-marquee flex w-max items-center gap-3 hover:[animation-play-state:paused]">
          {track.map((tech, index) => (
            <li
              key={`${tech}-${index}`}
              aria-hidden={index >= technologies.length}
              className="bg-background text-muted-foreground rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
