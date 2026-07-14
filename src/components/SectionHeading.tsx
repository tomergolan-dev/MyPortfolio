"use client";

import { motion } from "framer-motion";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export default function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex items-center gap-3">
        <span className="h-px w-6 bg-ide-blue/50" />
        <span className="text-xs font-semibold uppercase tracking-widest text-ide-blue">
          {eyebrow}
        </span>
      </div>
      <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">{title}</h2>
      {description && (
        <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-400">{description}</p>
      )}
    </motion.div>
  );
}
