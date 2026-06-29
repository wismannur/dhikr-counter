import { ImageResponse } from "next/og";

export const alt = "Dhikr Counter — Tasbih Digital dengan Target & Laporan";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
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
          gap: 44,
          background: "linear-gradient(135deg, #13916b 0%, #0a5b44 100%)",
          color: "#f3ead1",
          fontFamily: "sans-serif",
        }}
      >
        {/* Motif cincin tasbih */}
        <div
          style={{
            position: "relative",
            display: "flex",
            width: 160,
            height: 160,
            borderRadius: 80,
            border: "13px solid rgba(243,234,209,0.9)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -18,
              left: 62,
              width: 34,
              height: 34,
              borderRadius: 17,
              background: "#e8c14a",
              display: "flex",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 18,
          }}
        >
          <div style={{ fontSize: 82, fontWeight: 700, letterSpacing: -1 }}>
            Dhikr Counter
          </div>
          <div style={{ fontSize: 36, opacity: 0.92 }}>
            Tasbih digital · target · laporan progres
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
