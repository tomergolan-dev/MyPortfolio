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

const MAX_RESUME_BYTES = 10 * 1024 * 1024;

export async function uploadResume(_prev: UploadState, formData: FormData): Promise<UploadState> {
  const { supabase } = await requireAdmin();

  const file = formData.get("resume");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Choose a PDF file to upload." };
  }
  if (file.type !== "application/pdf") {
    return { error: "Resume must be a PDF file." };
  }
  if (file.size > MAX_RESUME_BYTES) {
    return { error: "Resume must be smaller than 10MB." };
  }

  try {
    const filename = `resume-${Date.now()}.pdf`;
    const { error: uploadError } = await supabase.storage
      .from("resume")
      .upload(filename, file, { contentType: "application/pdf", upsert: true });
    if (uploadError) return { error: uploadError.message };

    const {
      data: { publicUrl },
    } = supabase.storage.from("resume").getPublicUrl(filename);

    const { error: updateError } = await supabase
      .from("site_settings")
      .update({ resume_url: publicUrl, resume_filename: file.name })
      .eq("id", 1);
    if (updateError) return { error: updateError.message };

    revalidatePath("/");
    revalidatePath("/admin/settings");
    return { success: true };
  } catch (error) {
    console.error("uploadResume failed:", error);
    return { error: error instanceof Error ? error.message : "Upload failed. Please try again." };
  }
}

const ALLOWED_PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function uploadProfilePhoto(
  _prev: UploadState,
  formData: FormData,
): Promise<UploadState> {
  const { supabase } = await requireAdmin();

  const file = formData.get("photo");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Choose an image to upload." };
  }
  if (!ALLOWED_PHOTO_TYPES.includes(file.type)) {
    return { error: "Photo must be a JPEG, PNG, or WebP image." };
  }

  try {
    const ext = file.type.split("/")[1];
    const filename = `profile-${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("profile")
      .upload(filename, file, { contentType: file.type, upsert: true });
    if (uploadError) return { error: uploadError.message };

    const {
      data: { publicUrl },
    } = supabase.storage.from("profile").getPublicUrl(filename);

    const { error: updateError } = await supabase
      .from("site_settings")
      .update({ profile_image_url: publicUrl })
      .eq("id", 1);
    if (updateError) return { error: updateError.message };

    revalidatePath("/");
    revalidatePath("/admin/settings");
    return { success: true };
  } catch (error) {
    console.error("uploadProfilePhoto failed:", error);
    return { error: error instanceof Error ? error.message : "Upload failed. Please try again." };
  }
}
