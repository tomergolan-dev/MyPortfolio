"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/supabase/require-admin";

export async function toggleVisible(id: string, visible: boolean) {
  const { supabase } = await requireAdmin();
  await supabase.from("sections").update({ visible }).eq("id", id);
  revalidatePath("/");
  revalidatePath("/admin/sections");
}

export async function moveSection(id: string, direction: "up" | "down") {
  const { supabase } = await requireAdmin();

  const { data: sections } = await supabase
    .from("sections")
    .select("id, order_index")
    .order("order_index", { ascending: true });
  if (!sections) return;

  const index = sections.findIndex((section) => section.id === id);
  if (index === -1) return;

  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (swapIndex < 0 || swapIndex >= sections.length) return;

  const current = sections[index];
  const swap = sections[swapIndex];

  await supabase.from("sections").update({ order_index: swap.order_index }).eq("id", current.id);
  await supabase.from("sections").update({ order_index: current.order_index }).eq("id", swap.id);

  revalidatePath("/");
  revalidatePath("/admin/sections");
}

export type SectionActionResult = { error?: string; success?: boolean };

const simpleSchema = z.object({
  title: z.string().min(1, "Required"),
  description: z.string().min(1, "Required"),
});

export async function updateSimpleSection(
  sectionId: string,
  values: unknown,
): Promise<SectionActionResult> {
  const { supabase } = await requireAdmin();

  const parsed = simpleSchema.safeParse(values);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const { error } = await supabase.from("sections").update(parsed.data).eq("id", sectionId);
  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/sections");
  revalidatePath(`/admin/sections/${sectionId}`);
  return { success: true };
}

const aboutSchema = z.object({
  title: z.string().min(1, "Required"),
  body_paragraphs: z.array(z.string().min(1, "Paragraph can't be empty")),
  stats: z.array(
    z.object({
      label: z.string().min(1, "Required"),
      value: z.string().min(1, "Required"),
    }),
  ),
});

export async function updateAboutSection(
  sectionId: string,
  values: unknown,
): Promise<SectionActionResult> {
  const { supabase } = await requireAdmin();

  const parsed = aboutSchema.safeParse(values);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const { error: sectionError } = await supabase
    .from("sections")
    .update({ title: parsed.data.title, body_paragraphs: parsed.data.body_paragraphs })
    .eq("id", sectionId);
  if (sectionError) return { error: sectionError.message };

  const { error: deleteError } = await supabase
    .from("about_stats")
    .delete()
    .eq("section_id", sectionId);
  if (deleteError) return { error: deleteError.message };

  if (parsed.data.stats.length > 0) {
    const { error: insertError } = await supabase.from("about_stats").insert(
      parsed.data.stats.map((stat, index) => ({
        section_id: sectionId,
        label: stat.label,
        value: stat.value,
        order_index: index,
      })),
    );
    if (insertError) return { error: insertError.message };
  }

  revalidatePath("/");
  revalidatePath("/admin/sections");
  revalidatePath(`/admin/sections/${sectionId}`);
  return { success: true };
}

const skillsSchema = z.object({
  title: z.string().min(1, "Required"),
  description: z.string().min(1, "Required"),
  groups: z.array(
    z.object({
      category: z.string().min(1, "Required"),
      items: z.string().min(1, "Enter at least one item"),
    }),
  ),
});

export async function updateSkillsSection(
  sectionId: string,
  values: unknown,
): Promise<SectionActionResult> {
  const { supabase } = await requireAdmin();

  const parsed = skillsSchema.safeParse(values);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const { error: sectionError } = await supabase
    .from("sections")
    .update({ title: parsed.data.title, description: parsed.data.description })
    .eq("id", sectionId);
  if (sectionError) return { error: sectionError.message };

  const { error: deleteError } = await supabase
    .from("skill_groups")
    .delete()
    .eq("section_id", sectionId);
  if (deleteError) return { error: deleteError.message };

  if (parsed.data.groups.length > 0) {
    const { error: insertError } = await supabase.from("skill_groups").insert(
      parsed.data.groups.map((group, index) => ({
        section_id: sectionId,
        category: group.category,
        items: group.items
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        order_index: index,
      })),
    );
    if (insertError) return { error: insertError.message };
  }

  revalidatePath("/");
  revalidatePath("/admin/sections");
  revalidatePath(`/admin/sections/${sectionId}`);
  return { success: true };
}
