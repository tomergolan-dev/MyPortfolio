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

const accents = [
  "hover:border-ide-blue/30",
  "hover:border-ide-purple/30",
  "hover:border-ide-cyan/30",
  "hover:border-ide-amber/30",
];

export default function Skills({ section }: { section: SectionWithChildren }) {
  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
      <SectionHeading
        eyebrow="Skills"
        title={section.title}
        description={section.description}
      />
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-6"
      >
        {section.skillGroups.map((group, index) => (
          <motion.div
            key={group.id}
            variants={item}
            whileHover={{ y: -4 }}
            className={`rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-colors ${accents[index % accents.length]}`}
          >
            <h3 className="text-sm font-medium text-white">{group.category}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.items.map((skillItem) => (
                <li
                  key={skillItem}
                  className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300"
                >
                  {skillItem}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
