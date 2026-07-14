import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 7,
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "monospace",
            fontSize: 17,
            fontWeight: 700,
            letterSpacing: -1,
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
