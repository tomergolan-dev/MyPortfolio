import { createClient } from "@/lib/supabase/server";
import type { Project, ProjectImage } from "@/types/database";

export type ProjectWithImages = Project & { images: ProjectImage[] };

export async function getVisibleProjects(): Promise<ProjectWithImages[]> {
  const supabase = await createClient();
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .eq("visible", true)
    .order("order_index", { ascending: true });

  if (error) throw new Error(`Failed to load projects: ${error.message}`);
  if (!projects || projects.length === 0) return [];

  const projectIds = projects.map((project) => project.id);
  const { data: images } = await supabase
    .from("project_images")
    .select("*")
    .in("project_id", projectIds)
    .order("order_index", { ascending: true });

  return projects.map((project) => ({
    ...project,
    images: (images ?? []).filter((image) => image.project_id === project.id),
  }));
}

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function getProjectBySlug(slugOrId: string): Promise<ProjectWithImages | null> {
  const supabase = await createClient();

  const query = supabase.from("projects").select("*").eq("visible", true);
  const { data: project, error } = UUID_PATTERN.test(slugOrId)
    ? await query.eq("id", slugOrId).maybeSingle()
    : await query.eq("slug", slugOrId).maybeSingle();

  if (error || !project) return null;

  const { data: images } = await supabase
    .from("project_images")
    .select("*")
    .eq("project_id", project.id)
    .order("order_index", { ascending: true });

  return { ...project, images: images ?? [] };
}
