import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Nav from "@/components/Nav";
import { GithubIcon } from "@/components/icons/BrandIcons";
import { getProjectBySlug } from "@/lib/data/projects";
import { getSiteSettings } from "@/lib/data/settings";

export const dynamic = "force-dynamic";

function isRealUrl(url: string | null) {
  return Boolean(url && url !== "#");
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [project, settings] = await Promise.all([getProjectBySlug(slug), getSiteSettings()]);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Nav name={settings.name} />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-1 text-sm text-slate-400 transition-colors hover:text-ide-cyan"
          >
            <ArrowLeft className="h-4 w-4" /> Back to projects
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3">
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

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-400">
            {project.description}
          </p>

          {project.technologies.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2">
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

          <div className="mt-8 flex flex-wrap gap-4">
            {isRealUrl(project.live_url) && (
              <a
                href={project.live_url!}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-blue-500/20 transition-transform duration-300 hover:scale-105"
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
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5"
              >
                <GithubIcon className="h-4 w-4" /> GitHub
              </a>
            )}
            {isRealUrl(project.project_url) && project.project_url !== project.live_url && (
              <a
                href={project.project_url!}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5"
              >
                Project link
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </div>

          {project.images.length > 0 && (
            <div className="mt-12 space-y-4">
              {project.images.map((image) => (
                <Image
                  key={image.id}
                  src={image.url}
                  alt={image.alt_text || project.title}
                  width={1600}
                  height={1000}
                  sizes="(max-width: 768px) 100vw, 900px"
                  className="h-auto w-full rounded-2xl border border-white/10"
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
