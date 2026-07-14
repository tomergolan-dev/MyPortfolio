import { createClient } from "@/lib/supabase/server";
import type { AboutStat, Section, SkillGroup } from "@/types/database";

export type SectionWithChildren = Section & {
  aboutStats: AboutStat[];
  skillGroups: SkillGroup[];
};

export async function getVisibleSections(): Promise<SectionWithChildren[]> {
  const supabase = await createClient();
  const { data: sections, error } = await supabase
    .from("sections")
    .select("*")
    .eq("visible", true)
    .order("order_index", { ascending: true });

  if (error) throw new Error(`Failed to load sections: ${error.message}`);
  if (!sections || sections.length === 0) return [];

  const sectionIds = sections.map((section) => section.id);

  const [{ data: aboutStats }, { data: skillGroups }] = await Promise.all([
    supabase
      .from("about_stats")
      .select("*")
      .in("section_id", sectionIds)
      .order("order_index", { ascending: true }),
    supabase
      .from("skill_groups")
      .select("*")
      .in("section_id", sectionIds)
      .order("order_index", { ascending: true }),
  ]);

  return sections.map((section) => ({
    ...section,
    aboutStats: (aboutStats ?? []).filter((stat) => stat.section_id === section.id),
    skillGroups: (skillGroups ?? []).filter((group) => group.section_id === section.id),
  }));
}
