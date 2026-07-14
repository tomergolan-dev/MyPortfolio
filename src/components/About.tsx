"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import type { SectionWithChildren } from "@/lib/data/sections";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function About({ section }: { section: SectionWithChildren }) {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
      <SectionHeading eyebrow="About" title={section.title} />
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-10 grid gap-10 sm:grid-cols-3 sm:gap-12"
      >
        <div className="space-y-4 sm:col-span-2">
          {section.body_paragraphs.map((paragraph) => (
            <motion.p
              key={paragraph}
              variants={item}
              className="text-base leading-relaxed text-slate-400"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
        <dl className="grid grid-cols-3 gap-3 sm:grid-cols-1 sm:gap-4">
          {section.aboutStats.map((stat) => (
            <motion.div
              key={stat.id}
              variants={item}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm transition-colors hover:border-ide-blue/30"
            >
              <dt className="text-xs text-slate-500">{stat.label}</dt>
              <dd className="mt-1 text-2xl font-semibold text-white">{stat.value}</dd>
            </motion.div>
          ))}
        </dl>
      </motion.div>
    </section>
  );
}
