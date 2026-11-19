import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { getProject } from "@/content/projects";

export const alt = "Project case study — AA Solutions";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);

  return renderOgImage({
    title: project?.name ?? "Project",
    subtitle: project?.subtitle ?? "A project by AA Solutions.",
    label: project?.category ?? "Case study",
  });
}
