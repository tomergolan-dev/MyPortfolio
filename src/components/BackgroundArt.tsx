"use client";

import { motion, useScroll, useTransform } from "framer-motion";

function EdgeArt({ mirrored = false }: { mirrored?: boolean }) {
  return (
    <svg
      viewBox="0 0 240 900"
      preserveAspectRatio="xMidYMid slice"
      className={`h-full w-full ${mirrored ? "-scale-x-100" : ""}`}
      aria-hidden="true"
    >
      <g fill="none" strokeWidth="1.5" strokeLinecap="round">
        <path d="M40 60 L20 80 L40 100" stroke="#60a5fa" opacity="0.5" />
        <path d="M70 55 L58 108" stroke="#60a5fa" opacity="0.35" />

        <path
          d="M30 160 L30 220 L90 220 L90 260"
          stroke="#4fd1c5"
          strokeDasharray="2 6"
          opacity="0.4"
        />
        <circle cx="30" cy="160" r="3" fill="#4fd1c5" stroke="none" opacity="0.5" />
        <circle cx="90" cy="260" r="3" fill="#4fd1c5" stroke="none" opacity="0.5" />

        <path
          d="M55 320 L35 345 L55 370 M85 320 L105 345 L85 370"
          stroke="#b794f6"
          opacity="0.45"
        />
        <path d="M74 310 L66 382" stroke="#b794f6" opacity="0.3" />

        <path
          d="M20 440 L60 440 L60 470 L110 470"
          stroke="#f6ad55"
          strokeDasharray="2 6"
          opacity="0.35"
        />
        <circle cx="20" cy="440" r="3" fill="#f6ad55" stroke="none" opacity="0.5" />

        <path d="M45 540 Q65 560 45 580 Q25 600 45 620" stroke="#f687b3" opacity="0.4" />
        <circle cx="45" cy="600" r="3" fill="#f687b3" stroke="none" opacity="0.4" />

        <path
          d="M25 680 L70 680 M25 700 L55 700 M25 720 L65 720"
          stroke="#4fd1c5"
          opacity="0.3"
        />

        <path
          d="M50 780 L30 800 L50 820 M80 780 L100 800 L80 820"
          stroke="#60a5fa"
          opacity="0.45"
        />

        <path
          d="M20 850 L90 850 L90 900"
          stroke="#60a5fa"
          strokeDasharray="2 6"
          opacity="0.3"
        />
        <circle cx="90" cy="850" r="3" fill="#60a5fa" stroke="none" opacity="0.45" />
      </g>
    </svg>
  );
}

const symbols: Array<{
  text: string;
  className: string;
  duration: number;
  delay: number;
}> = [
  { text: "</>", className: "left-[4%] top-[10%] text-3xl text-ide-blue/15", duration: 7, delay: 0 },
  { text: "{ }", className: "left-[9%] top-[30%] text-2xl text-ide-purple/15", duration: 8, delay: 1 },
  { text: "=>", className: "left-[3%] top-[52%] text-2xl text-ide-cyan/15", duration: 6.5, delay: 0.5 },
  { text: "( )", className: "left-[8%] top-[70%] text-xl text-ide-amber/15", duration: 9, delay: 1.5 },
  { text: "<div>", className: "left-[2%] top-[86%] text-lg text-ide-pink/15", duration: 7.5, delay: 0.8 },
  { text: "{ }", className: "right-[5%] top-[16%] text-2xl text-ide-cyan/15", duration: 8.5, delay: 0.3 },
  { text: "</>", className: "right-[3%] top-[38%] text-3xl text-ide-purple/15", duration: 7, delay: 1.2 },
  { text: "=>", className: "right-[9%] top-[58%] text-xl text-ide-blue/15", duration: 6, delay: 0.6 },
  { text: "( )", className: "right-[4%] top-[76%] text-2xl text-ide-pink/15", duration: 9.5, delay: 1.8 },
  { text: "{ }", className: "right-[8%] top-[92%] text-lg text-ide-amber/15", duration: 8, delay: 0.2 },
];

function FloatingSymbol({
  text,
  className,
  duration,
  delay,
}: {
  text: string;
  className: string;
  duration: number;
  delay: number;
}) {
  return (
    <span
      aria-hidden="true"
      className={`absolute select-none font-mono font-semibold ${className}`}
      style={{ animation: `bg-float ${duration}s ease-in-out ${delay}s infinite` }}
    >
      {text}
    </span>
  );
}

export default function BackgroundArt() {
  const { scrollY } = useScroll();
  const yFar = useTransform(scrollY, [0, 2400], [0, 70]);
  const yNear = useTransform(scrollY, [0, 2400], [0, -50]);

  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden bg-[#0a0d14]">
      <div className="absolute -left-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-blue-500/10 blur-[120px]" />
      <div className="absolute -right-40 top-1/3 h-[30rem] w-[30rem] rounded-full bg-purple-500/10 blur-[120px]" />
      <div className="absolute bottom-0 left-1/4 h-[26rem] w-[26rem] rounded-full bg-cyan-500/10 blur-[110px]" />

      <motion.div style={{ y: yFar }} className="absolute inset-0">
        <div className="absolute inset-y-0 left-0 w-40 opacity-40 sm:w-52 lg:w-64">
          <EdgeArt />
        </div>
        <div className="absolute inset-y-0 right-0 w-40 opacity-40 sm:w-52 lg:w-64">
          <EdgeArt mirrored />
        </div>
      </motion.div>

      <motion.div style={{ y: yNear }} className="absolute inset-0">
        {symbols.map((s) => (
          <FloatingSymbol key={`${s.text}-${s.className}`} {...s} />
        ))}
      </motion.div>
    </div>
  );
}
