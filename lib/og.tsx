import { ImageResponse } from "next/og";

import { site } from "@/content/site";

export const ogSize = { width: 1200, height: 630 } as const;
export const ogContentType = "image/png";

/**
 * Shared social-card renderer.
 * Kept dependency-free (inline styles only) because ImageResponse does not
 * have access to the app's Tailwind stylesheet.
 */
export function renderOgImage({
  title,
  subtitle,
  label,
}: {
  title: string;
  subtitle?: string;
  label?: string;
}) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px",
        background: "#0f1020",
        color: "#f7f6f2",
        position: "relative",
        fontFamily: "sans-serif",
      }}
    >
      {/* Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          display: "flex",
        }}
      />
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          top: -180,
          right: -120,
          width: 520,
          height: 520,
          borderRadius: 9999,
          background: "rgba(120, 96, 255, 0.35)",
          filter: "blur(120px)",
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -220,
          left: -100,
          width: 480,
          height: 480,
          borderRadius: 9999,
          background: "rgba(190, 240, 90, 0.18)",
          filter: "blur(120px)",
          display: "flex",
        }}
      />

      {/* Brand row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          position: "relative",
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            background: "linear-gradient(135deg, #7c6cff, #4b3fd6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: -1,
          }}
        >
          KL
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 26, fontWeight: 600, letterSpacing: -0.5 }}>
            {site.name}
          </span>
          <span style={{ fontSize: 17, color: "rgba(247,246,242,0.55)" }}>
            App &amp; web development
          </span>
        </div>
      </div>

      {/* Title */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          maxWidth: 940,
        }}
      >
        {label ? (
          <span
            style={{
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#bdf06a",
              marginBottom: 18,
            }}
          >
            {label}
          </span>
        ) : null}
        <span
          style={{
            fontSize: title.length > 42 ? 62 : 76,
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: -2,
          }}
        >
          {title}
        </span>
        {subtitle ? (
          <span
            style={{
              fontSize: 26,
              lineHeight: 1.4,
              color: "rgba(247,246,242,0.62)",
              marginTop: 22,
              maxWidth: 820,
            }}
          >
            {subtitle}
          </span>
        ) : null}
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          fontSize: 20,
          color: "rgba(247,246,242,0.45)",
        }}
      >
        <span>{site.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span>
        <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 9999,
              background: "#bdf06a",
              display: "flex",
            }}
          />
          {site.responseNote}
        </span>
      </div>
    </div>,
    { ...ogSize },
  );
}
