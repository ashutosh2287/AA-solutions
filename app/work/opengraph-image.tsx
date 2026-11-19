import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Work — AA Solutions";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    title: "Things we have designed and built",
    subtitle:
      "Food ordering, education and hospitality projects — all live and open to inspection.",
    label: "Selected work",
  });
}
