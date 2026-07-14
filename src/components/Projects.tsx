import { projects } from "@/data/content";

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-20">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
        Projects
      </h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <article
            key={project.title}
            className="flex flex-col justify-between rounded-2xl border border-white/10 p-6 transition-colors hover:border-white/25"
          >
            <div>
              <h3 className="text-lg font-semibold text-zinc-50">{project.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{project.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-zinc-400"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 flex gap-4 text-sm font-medium">
              {project.href && (
                <a href={project.href} className="text-zinc-50 hover:text-emerald-400">
                  Live ↗
                </a>
              )}
              {project.repo && (
                <a href={project.repo} className="text-zinc-400 hover:text-emerald-400">
                  Code ↗
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
