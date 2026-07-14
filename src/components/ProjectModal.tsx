"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { GithubIcon } from "@/components/icons/BrandIcons";
import type { ProjectWithImages } from "@/lib/data/projects";

function isRealUrl(url: string | null) {
  return Boolean(url && url !== "#");
}

export default function ProjectModal({
  project,
  onClose,
}: {
  project: ProjectWithImages;
  onClose: () => void;
}) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/10 bg-surface p-6 shadow-2xl sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex flex-wrap items-center gap-3 pr-10">
          {project.category && (
            <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-widest text-slate-400">
              {project.category}
            </span>
          )}
          {project.status && (
            <span className="flex items-center gap-2 text-xs text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {project.status}
            </span>
          )}
        </div>

        <h2
          id="project-modal-title"
          className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl"
        >
          {project.title}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-slate-400">{project.description}</p>

        {project.technologies.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <li
                key={tech}
                className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300"
              >
                {tech}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          {isRealUrl(project.live_url) && (
            <a
              href={project.live_url!}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-500/20 transition-transform duration-300 hover:scale-105"
            >
              Live demo
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
          {isRealUrl(project.github_url) && (
            <a
              href={project.github_url!}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/5"
            >
              <GithubIcon className="h-4 w-4" /> GitHub
            </a>
          )}
          {isRealUrl(project.project_url) && project.project_url !== project.live_url && (
            <a
              href={project.project_url!}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/5"
            >
              Project link
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </div>

        {project.images.length > 0 && (
          <div className="mt-6 space-y-4">
            {project.images.map((image) => (
              <Image
                key={image.id}
                src={image.url}
                alt={image.alt_text || project.title}
                width={1600}
                height={1000}
                sizes="(max-width: 768px) 100vw, 700px"
                className="h-auto w-full rounded-2xl border border-white/10"
              />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
