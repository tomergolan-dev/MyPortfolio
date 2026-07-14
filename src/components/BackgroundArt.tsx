function EdgeArt({ mirrored = false }: { mirrored?: boolean }) {
  return (
    <svg
      viewBox="0 0 240 900"
      preserveAspectRatio="xMidYMid slice"
      className={`h-full w-full text-stone-900 ${mirrored ? "-scale-x-100" : ""}`}
      aria-hidden="true"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M40 60 L20 80 L40 100" opacity="0.5" />
        <path d="M70 55 L58 108" opacity="0.35" />

        <path d="M30 160 L30 220 L90 220 L90 260" strokeDasharray="2 6" opacity="0.4" />
        <circle cx="30" cy="160" r="3" fill="currentColor" stroke="none" opacity="0.5" />
        <circle cx="90" cy="260" r="3" fill="currentColor" stroke="none" opacity="0.5" />

        <path d="M55 320 L35 345 L55 370 M85 320 L105 345 L85 370" opacity="0.45" />
        <path d="M74 310 L66 382" opacity="0.3" />

        <path d="M20 440 L60 440 L60 470 L110 470" strokeDasharray="2 6" opacity="0.35" />
        <circle cx="20" cy="440" r="3" fill="currentColor" stroke="none" opacity="0.5" />

        <path d="M45 540 Q65 560 45 580 Q25 600 45 620" opacity="0.4" />
        <circle cx="45" cy="600" r="3" fill="currentColor" stroke="none" opacity="0.4" />

        <path d="M25 680 L70 680 M25 700 L55 700 M25 720 L65 720" opacity="0.35" />

        <path d="M50 780 L30 800 L50 820 M80 780 L100 800 L80 820" opacity="0.45" />

        <path d="M20 850 L90 850 L90 900" strokeDasharray="2 6" opacity="0.3" />
        <circle cx="90" cy="850" r="3" fill="currentColor" stroke="none" opacity="0.45" />
      </g>
    </svg>
  );
}

export default function BackgroundArt() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden bg-[#faf8f4]"
    >
      <div className="absolute inset-y-0 left-0 w-40 opacity-[0.14] sm:w-52 lg:w-64">
        <EdgeArt />
      </div>
      <div className="absolute inset-y-0 right-0 w-40 opacity-[0.14] sm:w-52 lg:w-64">
        <EdgeArt mirrored />
      </div>
    </div>
  );
}
