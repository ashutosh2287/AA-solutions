import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Contact — KL Solutions";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    title: "Tell us about your project",
    subtitle: "A straight answer within one working day.",
    label: "Contact",
  });
}
