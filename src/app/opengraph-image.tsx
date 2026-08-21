import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = site.seo.title;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#080808",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 140,
            fontWeight: 900,
            letterSpacing: -4,
            color: "#fff800",
            lineHeight: 1,
          }}
        >
          MOVE
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 800,
            color: "#ff4d5a",
            marginTop: 8,
            letterSpacing: 2,
          }}
        >
          SANTANA
        </div>
        <div style={{ fontSize: 26, color: "#b8b8bc", marginTop: 32 }}>
          Não fique parado.
        </div>
      </div>
    ),
    { ...size },
  );
}
