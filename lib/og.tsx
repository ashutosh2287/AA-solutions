import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

import { site } from "@/content/site";

export const ogSize = { width: 1200, height: 630 } as const;
export const ogContentType = "image/png";

async function logoDataUri() {
  try {
    const logo = await readFile(path.join(process.cwd(), "public", "kl-solutions-logo.png"));
    return `data:image/png;base64,${logo.toString("base64")}`;
  } catch {
    return null;
  }
}

/**
 * Shared social-card renderer.
 * Kept dependency-free (inline styles only) because ImageResponse does not
 * have access to the app's Tailwind stylesheet.
 */
export async function renderOgImage({
  title,
  subtitle,
  label,
}: {
  title: string;
  subtitle?: string;
  label?: string;
}) {
  const logoSrc = await logoDataUri();
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "68px",
        background: "linear-gradient(135deg, #0f1020 0%, #171a33 55%, #111827 100%)",
        color: "#f7f6f2",
        position: "relative",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          display: "flex",
        }}
      />
      <div style={{ position: "absolute", top: -120, right: -60, width: 420, height: 420, borderRadius: 9999, background: "rgba(124,108,255,0.32)", filter: "blur(90px)", display: "flex" }} />
      <div style={{ position: "absolute", bottom: -160, left: -80, width: 360, height: 360, borderRadius: 9999, background: "rgba(189,240,106,0.18)", filter: "blur(90px)", display: "flex" }} />
      <div style={{ position: "absolute", inset: 24, border: "1px solid rgba(255,255,255,0.08)", borderRadius: 28, display: "flex" }} />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {logoSrc ? (
            // eslint-disable-next-line @next/next/no-img-element -- next/og ImageResponse requires img.
            <img src={logoSrc} width={58} height={58} alt="" style={{ borderRadius: 16 }} />
          ) : (
            <div style={{ width: 58, height: 58, borderRadius: 16, background: "linear-gradient(135deg, #7c6cff, #4b3fd6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700 }}>KL</div>
          )}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.6 }}>{site.name}</span>
            <span style={{ fontSize: 17, color: "rgba(247,246,242,0.62)" }}>{site.tagline}</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", borderRadius: 9999, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", fontSize: 15, color: "rgba(247,246,242,0.78)" }}>
          <span style={{ width: 8, height: 8, borderRadius: 9999, background: "#bdf06a", display: "flex" }} />
          {site.availability}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", position: "relative", maxWidth: 960 }}>
        {label ? <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#bdf06a", marginBottom: 18 }}>{label}</span> : null}
        <span style={{ fontSize: title.length > 42 ? 62 : 76, fontWeight: 700, lineHeight: 1.06, letterSpacing: -2.2 }}>{title}</span>
        {subtitle ? <span style={{ fontSize: 27, lineHeight: 1.4, color: "rgba(247,246,242,0.68)", marginTop: 22, maxWidth: 840 }}>{subtitle}</span> : null}
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", fontSize: 20, color: "rgba(247,246,242,0.52)" }}>
        <span>{site.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span>
        <span style={{ display: "flex", gap: 18 }}>
          <span>Web apps</span>
          <span style={{ color: "#bdf06a" }}>•</span>
          <span>Websites</span>
          <span style={{ color: "#bdf06a" }}>•</span>
          <span>Design</span>
        </span>
      </div>
    </div>,
    { ...ogSize },
  );
}
