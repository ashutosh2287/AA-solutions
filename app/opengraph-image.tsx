import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    title: `${site.name}`,
    subtitle: site.tagline,
    label: "App & web development studio",
  });
}
