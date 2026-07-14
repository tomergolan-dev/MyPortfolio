import { ArrowRight } from "lucide-react";
import { projects, projectsSection } from "@/data/content";
import SectionHeading from "@/components/SectionHeading";

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
      <SectionHeading
        eyebrow={projectsSection.eyebrow}
        title={projectsSection.title}
        description={projectsSection.description}
      />
      <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <div key={project.title} className="flex flex-col">
            <div className="inline-flex w-fit items-center rounded-t-lg border border-b-0 border-white/10 bg-navy px-4 py-1.5 text-[11px] font-medium uppercase tracking-widest text-white/50">
              {String(index + 1).padStart(2, "0")} · {project.category}
            </div>
            <article className="flex flex-1 flex-col justify-between rounded-2xl rounded-tl-none border border-white/10 bg-navy p-6">
              <div>
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {project.description}
                </p>
              </div>
              <div>
                <div className="my-5 h-px bg-white/10" />
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-xs text-white/50">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
                    {project.status}
                  </span>
                  <a
                    href={project.href}
                    className="flex items-center gap-1 text-sm font-semibold text-white transition-colors hover:text-amber-300"
                  >
                    Open file
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
