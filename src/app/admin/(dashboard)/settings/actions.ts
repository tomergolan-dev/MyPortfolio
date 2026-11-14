"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/supabase/require-admin";
import type { UploadState } from "@/components/admin/FileUploadForm";

const settingsSchema = z.object({
  name: z.string().min(1, "Required"),
  role: z.string().min(1, "Required"),
  tagline: z.string().min(1, "Required"),
  hero_headline: z.string().min(1, "Required"),
  hero_primary_label: z.string().min(1, "Required"),
  hero_secondary_label: z.string().min(1, "Required"),
  email: z.string().email("Enter a valid email"),
  whatsapp: z.string().min(1, "Required"),
  location: z.string().min(1, "Required"),
  github_url: z.string().min(1, "Required"),
  github_handle: z.string().min(1, "Required"),
  linkedin_url: z.string().min(1, "Required"),
  linkedin_handle: z.string().min(1, "Required"),
  page_title: z.string().min(1, "Required"),
  meta_description: z.string().min(1, "Required"),
});

export type SettingsFormValues = z.infer<typeof settingsSchema>;
export type UpdateSettingsResult = { error?: string; success?: boolean };

export async function updateSettings(values: unknown): Promise<UpdateSettingsResult> {
  const { supabase } = await requireAdmin();

  const parsed = settingsSchema.safeParse(values);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const { error } = await supabase.from("site_settings").update(parsed.data).eq("id", 1);
  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/settings");
  return { success: true };
}

export async function saveResume(file: { path: string; filename: string }): Promise<UploadState> {
  const { supabase } = await requireAdmin();
  if (!/^resume-\d+\.pdf$/.test(file.path)) return { error: "Invalid upload." };

  const {
    data: { publicUrl },
  } = supabase.storage.from("resume").getPublicUrl(file.path);

  const { error } = await supabase
    .from("site_settings")
    .update({ resume_url: publicUrl, resume_filename: file.filename.slice(0, 200) })
    .eq("id", 1);
  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/settings");
  return { success: true };
}

export async function saveProfilePhoto(file: { path: string }): Promise<UploadState> {
  const { supabase } = await requireAdmin();
  if (!/^profile-\d+\.(jpeg|png|webp)$/.test(file.path)) return { error: "Invalid upload." };

  const {
    data: { publicUrl },
  } = supabase.storage.from("profile").getPublicUrl(file.path);

  const { error } = await supabase
    .from("site_settings")
    .update({ profile_image_url: publicUrl })
    .eq("id", 1);
  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/settings");
  return { success: true };
}
