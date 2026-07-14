"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ProjectModal from "@/components/ProjectModal";
import type { SectionWithChildren } from "@/lib/data/sections";
import type { ProjectWithImages } from "@/lib/data/projects";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function Projects({
  section,
  projects,
}: {
  section: SectionWithChildren;
  projects: ProjectWithImages[];
}) {
  const [selected, setSelected] = useState<ProjectWithImages | null>(null);

  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
      <SectionHeading
        eyebrow="Projects"
        title={section.title}
        description={section.description}
      />
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project, index) => {
          const thumbnail = project.images[0];
          return (
            <motion.div key={project.id} variants={item} className="flex flex-col">
              <div className="inline-flex w-fit items-center rounded-t-lg border border-b-0 border-white/10 bg-surface px-4 py-1.5 text-[11px] font-medium uppercase tracking-widest text-slate-400">
                {String(index + 1).padStart(2, "0")} · {project.category}
              </div>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="flex flex-1 flex-col justify-between overflow-hidden rounded-2xl rounded-tl-none border border-white/10 bg-surface shadow-lg shadow-black/20 transition-colors hover:border-ide-blue/30"
              >
                {thumbnail && (
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={thumbnail.url}
                      alt={thumbnail.alt_text || project.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">
                      {project.description}
                    </p>
                  </div>
                  <div>
                    <div className="my-5 h-px bg-white/10" />
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        {project.status}
                      </span>
                      <button
                        type="button"
                        onClick={() => setSelected(project)}
                        className="group flex items-center gap-1 text-sm font-semibold text-white transition-colors hover:text-ide-cyan"
                      >
                        More
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            </motion.div>
          );
        })}
      </motion.div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
