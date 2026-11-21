import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Privacy Policy — KL Solutions";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    title: "Privacy Policy",
    subtitle: "What we collect, why, and the choices you have.",
    label: "Legal",
  });
}
