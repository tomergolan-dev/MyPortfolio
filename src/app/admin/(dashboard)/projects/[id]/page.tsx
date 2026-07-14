import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/supabase/require-admin";
import ProjectForm from "./ProjectForm";
import ProjectImagesManager from "./ProjectImagesManager";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { supabase } = await requireAdmin();

  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !project) {
    notFound();
  }

  const { data: images } = await supabase
    .from("project_images")
    .select("*")
    .eq("project_id", id)
    .order("order_index", { ascending: true });

  return (
    <div className="max-w-2xl">
      <Link href="/admin/projects" className="text-sm text-stone-500 hover:text-stone-900">
        ← Projects
      </Link>
      <h1 className="mt-2 text-xl font-semibold text-stone-900">Edit project</h1>

      <div className="mt-6 rounded-2xl border border-stone-900/10 bg-white/60 p-6">
        <ProjectForm project={project} />
      </div>

      <div className="mt-6 rounded-2xl border border-stone-900/10 bg-white/60 p-6">
        <ProjectImagesManager projectId={id} images={images ?? []} />
      </div>
    </div>
  );
}
