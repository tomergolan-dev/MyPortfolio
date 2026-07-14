import { projects } from "@/data/content";

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-20">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-amber-800">
        Projects
      </h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <article
            key={project.title}
            className="flex flex-col justify-between rounded-2xl border border-stone-900/10 bg-white/60 p-6 transition-colors hover:border-stone-900/25"
          >
            <div>
              <h3 className="text-lg font-semibold text-stone-900">{project.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{project.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-stone-900/5 px-2.5 py-1 text-xs text-stone-600"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 flex gap-4 text-sm font-medium">
              {project.href && (
                <a href={project.href} className="text-stone-900 hover:text-amber-800">
                  Live ↗
                </a>
              )}
              {project.repo && (
                <a href={project.repo} className="text-stone-500 hover:text-amber-800">
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
