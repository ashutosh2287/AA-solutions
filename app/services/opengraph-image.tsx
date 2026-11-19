import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Services — AA Solutions";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    title: "Design and development, end to end",
    subtitle:
      "Web apps, mobile-friendly platforms, business websites, UI/UX and AI features.",
    label: "Services",
  });
}
