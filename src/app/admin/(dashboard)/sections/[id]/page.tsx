import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/supabase/require-admin";
import AboutSectionForm from "./AboutSectionForm";
import SkillsSectionForm from "./SkillsSectionForm";
import SimpleSectionForm from "./SimpleSectionForm";

export default async function EditSectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { supabase } = await requireAdmin();

  const { data: section, error } = await supabase
    .from("sections")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !section) {
    notFound();
  }

  let form = null;
  if (section.type === "about") {
    const { data: stats } = await supabase
      .from("about_stats")
      .select("*")
      .eq("section_id", id)
      .order("order_index", { ascending: true });
    form = <AboutSectionForm section={section} stats={stats ?? []} />;
  } else if (section.type === "skills") {
    const { data: groups } = await supabase
      .from("skill_groups")
      .select("*")
      .eq("section_id", id)
      .order("order_index", { ascending: true });
    form = <SkillsSectionForm section={section} groups={groups ?? []} />;
  } else {
    form = <SimpleSectionForm section={section} />;
  }

  return (
    <div className="max-w-2xl">
      <Link href="/admin/sections" className="text-sm text-stone-500 hover:text-stone-900">
        ← Sections
      </Link>
      <h1 className="mt-2 text-xl font-semibold text-stone-900">
        Edit {section.type} section
      </h1>
      <div className="mt-6 rounded-2xl border border-stone-900/10 bg-white/60 p-6">{form}</div>
    </div>
  );
}
