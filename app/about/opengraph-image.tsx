import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "About — KL Solutions";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    title: "A small studio, on purpose",
    subtitle:
      "The person who scopes your project is the person who designs and builds it.",
    label: "About",
  });
}
