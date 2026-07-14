import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0d14 0%, #12151f 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "monospace",
            fontSize: 92,
            fontWeight: 700,
            letterSpacing: -4,
            background: "linear-gradient(135deg, #60a5fa 0%, #b794f6 100%)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {"</>"}
        </div>
      </div>
    ),
    { ...size },
  );
}
