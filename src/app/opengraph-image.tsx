import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt =
  "Hantavirus Prevention outbreak updates, risk map, and prevention guidance";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f7f3e8",
          color: "#17201b",
          fontFamily: "Arial, Helvetica, sans-serif",
          padding: "64px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(25, 83, 72, 0.14), rgba(174, 55, 44, 0.16))",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
          }}
        >
          <div style={{ fontSize: 34, fontWeight: 700 }}>{site.name}</div>
          <div
            style={{
              border: "2px solid #195348",
              color: "#195348",
              fontSize: 22,
              fontWeight: 700,
              padding: "10px 18px",
            }}
          >
            Public health tracker
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            maxWidth: 880,
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 78,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: 0,
            }}
          >
            Hantavirus prevention, risk maps, and outbreak updates
          </div>
          <div style={{ color: "#33443b", fontSize: 30, lineHeight: 1.35 }}>
            Symptoms, transmission, case trends, mortality data, and official
            source summaries in one searchable public health reference.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 18,
            color: "#195348",
            fontSize: 24,
            fontWeight: 700,
            position: "relative",
          }}
        >
          <span>Prevention guidance</span>
          <span>Outbreak alerts</span>
          <span>Case statistics</span>
        </div>
      </div>
    ),
    size,
  );
}
