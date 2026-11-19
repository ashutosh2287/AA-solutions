import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Process — AA Solutions";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    title: "A clear way to get from idea to launch",
    subtitle: "Discover, design, build, then launch and support.",
    label: "Process",
  });
}
