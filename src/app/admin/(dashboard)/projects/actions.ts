"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAdmin } from "@/lib/supabase/require-admin";
import type { UploadState } from "@/components/admin/FileUploadForm";

export async function toggleProjectVisible(id: string, visible: boolean) {
  const { supabase } = await requireAdmin();
  await supabase.from("projects").update({ visible }).eq("id", id);
  revalidatePath("/");
  revalidatePath("/admin/projects");
}

export async function toggleProjectFeatured(id: string, featured: boolean) {
  const { supabase } = await requireAdmin();
  await supabase.from("projects").update({ featured }).eq("id", id);
  revalidatePath("/");
  revalidatePath("/admin/projects");
}

export async function moveProject(id: string, direction: "up" | "down") {
  const { supabase } = await requireAdmin();

  const { data: projects } = await supabase
    .from("projects")
    .select("id, order_index")
    .order("order_index", { ascending: true });
  if (!projects) return;

  const index = projects.findIndex((project) => project.id === id);
  if (index === -1) return;

  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (swapIndex < 0 || swapIndex >= projects.length) return;

  const current = projects[index];
  const swap = projects[swapIndex];

  await supabase.from("projects").update({ order_index: swap.order_index }).eq("id", current.id);
  await supabase.from("projects").update({ order_index: current.order_index }).eq("id", swap.id);

  revalidatePath("/");
  revalidatePath("/admin/projects");
}

export async function createProject() {
  const { supabase } = await requireAdmin();

  const { data: existing } = await supabase
    .from("projects")
    .select("order_index")
    .order("order_index", { ascending: false })
    .limit(1);
  const nextOrder = existing && existing.length > 0 ? existing[0].order_index + 1 : 0;

  const { data, error } = await supabase
    .from("projects")
    .insert({
      title: "New Project",
      description: "",
      category: "",
      status: "",
      order_index: nextOrder,
      visible: false,
    })
    .select("id")
    .single();
  if (error || !data) return;

  revalidatePath("/admin/projects");
  redirect(`/admin/projects/${data.id}`);
}

export async function deleteProject(id: string) {
  const { supabase } = await requireAdmin();
  await supabase.from("projects").delete().eq("id", id);
  revalidatePath("/");
  revalidatePath("/admin/projects");
}

export type ProjectActionResult = { error?: string; success?: boolean };

const projectSchema = z.object({
  title: z.string().min(1, "Required"),
  description: z.string().min(1, "Required"),
  category: z.string().min(1, "Required"),
  status: z.string().min(1, "Required"),
  technologies: z.string(),
  github_url: z.string(),
  live_url: z.string(),
  project_url: z.string(),
  featured: z.boolean(),
});

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function updateProject(
  projectId: string,
  values: unknown,
): Promise<ProjectActionResult> {
  const { supabase } = await requireAdmin();

  const parsed = projectSchema.safeParse(values);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const { error } = await supabase
    .from("projects")
    .update({
      title: parsed.data.title,
      slug: slugify(parsed.data.title),
      description: parsed.data.description,
      category: parsed.data.category,
      status: parsed.data.status,
      technologies: parsed.data.technologies
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      github_url: parsed.data.github_url || null,
      live_url: parsed.data.live_url || null,
      project_url: parsed.data.project_url || null,
      featured: parsed.data.featured,
    })
    .eq("id", projectId);
  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/projects");
  revalidatePath(`/admin/projects/${projectId}`);
  return { success: true };
}

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function uploadProjectImage(
  projectId: string,
  _prev: UploadState,
  formData: FormData,
): Promise<UploadState> {
  const { supabase } = await requireAdmin();

  const file = formData.get("image");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Choose an image to upload." };
  }
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return { error: "Image must be a JPEG, PNG, or WebP image." };
  }

  try {
    const ext = file.type.split("/")[1];
    const filename = `${projectId}-${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("project-images")
      .upload(filename, file, { contentType: file.type, upsert: true });
    if (uploadError) return { error: uploadError.message };

    const {
      data: { publicUrl },
    } = supabase.storage.from("project-images").getPublicUrl(filename);

    const { data: existing } = await supabase
      .from("project_images")
      .select("order_index")
      .eq("project_id", projectId)
      .order("order_index", { ascending: false })
      .limit(1);
    const nextOrder = existing && existing.length > 0 ? existing[0].order_index + 1 : 0;

    const { error: insertError } = await supabase
      .from("project_images")
      .insert({ project_id: projectId, url: publicUrl, alt_text: "", order_index: nextOrder });
    if (insertError) return { error: insertError.message };

    revalidatePath("/");
    revalidatePath(`/admin/projects/${projectId}`);
    return { success: true };
  } catch (error) {
    console.error("uploadProjectImage failed:", error);
    return { error: error instanceof Error ? error.message : "Upload failed. Please try again." };
  }
}

export async function deleteProjectImage(imageId: string, projectId: string) {
  const { supabase } = await requireAdmin();
  await supabase.from("project_images").delete().eq("id", imageId);
  revalidatePath("/");
  revalidatePath(`/admin/projects/${projectId}`);
}

export async function moveProjectImage(
  imageId: string,
  projectId: string,
  direction: "up" | "down",
) {
  const { supabase } = await requireAdmin();

  const { data: images } = await supabase
    .from("project_images")
    .select("id, order_index")
    .eq("project_id", projectId)
    .order("order_index", { ascending: true });
  if (!images) return;

  const index = images.findIndex((image) => image.id === imageId);
  if (index === -1) return;

  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (swapIndex < 0 || swapIndex >= images.length) return;

  const current = images[index];
  const swap = images[swapIndex];

  await supabase
    .from("project_images")
    .update({ order_index: swap.order_index })
    .eq("id", current.id);
  await supabase
    .from("project_images")
    .update({ order_index: current.order_index })
    .eq("id", swap.id);

  revalidatePath(`/admin/projects/${projectId}`);
}
