import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { requireAdmin } from "@/lib/supabase/require-admin";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";
import {
  createProject,
  deleteProject,
  moveProject,
  toggleProjectFeatured,
  toggleProjectVisible,
} from "./actions";

export default async function ProjectsPage() {
  const { supabase } = await requireAdmin();
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("order_index", { ascending: true });

  if (error || !projects) {
    return <p className="text-sm text-red-600">Failed to load projects.</p>;
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-stone-900">Projects</h1>
          <p className="mt-1 text-sm text-stone-600">
            Add, edit, feature, hide, and reorder your project cards.
          </p>
        </div>
        <form action={createProject}>
          <button
            type="submit"
            className="rounded-full bg-stone-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-stone-700"
          >
            New project
          </button>
        </form>
      </div>

      <ul className="mt-8 space-y-3">
        {projects.map((project, index) => (
          <li
            key={project.id}
            className="flex items-center justify-between gap-4 rounded-2xl border border-stone-900/10 bg-white/60 p-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex flex-col">
                <form action={moveProject.bind(null, project.id, "up")}>
                  <button
                    type="submit"
                    disabled={index === 0}
                    className="text-stone-500 transition-colors hover:text-stone-900 disabled:opacity-20"
                    aria-label="Move up"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </button>
                </form>
                <form action={moveProject.bind(null, project.id, "down")}>
                  <button
                    type="submit"
                    disabled={index === projects.length - 1}
                    className="text-stone-500 transition-colors hover:text-stone-900 disabled:opacity-20"
                    aria-label="Move down"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </form>
              </div>
              <div>
                <p className="text-sm font-medium text-stone-900">{project.title}</p>
                <p className="text-xs uppercase tracking-widest text-stone-400">
                  {project.category || "Uncategorized"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <form action={toggleProjectFeatured.bind(null, project.id, !project.featured)}>
                <button
                  type="submit"
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    project.featured
                      ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                      : "bg-stone-200 text-stone-600 hover:bg-stone-300"
                  }`}
                >
                  {project.featured ? "Featured" : "Not featured"}
                </button>
              </form>
              <form action={toggleProjectVisible.bind(null, project.id, !project.visible)}>
                <button
                  type="submit"
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    project.visible
                      ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                      : "bg-stone-200 text-stone-600 hover:bg-stone-300"
                  }`}
                >
                  {project.visible ? "Visible" : "Hidden"}
                </button>
              </form>
              <Link
                href={`/admin/projects/${project.id}`}
                className="rounded-full border border-stone-900/15 px-3 py-1 text-xs font-medium text-stone-700 transition-colors hover:bg-stone-900/5"
              >
                Edit
              </Link>
              <ConfirmDeleteButton
                action={deleteProject.bind(null, project.id)}
                confirmMessage={`Delete "${project.title}"? This can't be undone.`}
              >
                Delete
              </ConfirmDeleteButton>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
