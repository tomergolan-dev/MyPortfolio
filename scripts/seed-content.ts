/**
 * One-time content migration: uploads the real resume PDF and populates
 * site_settings + the about/projects/skills/contact sections + 3 placeholder
 * projects, matching what used to live in src/data/content.ts. Safe to
 * re-run (upserts by unique key).
 *
 * Usage: npm run seed-content
 */
import { config } from "dotenv";
config({ path: ".env.local" });

import { readFileSync } from "node:fs";
import { basename } from "node:path";
import { createAdminClient } from "../src/lib/supabase/admin";
import type { Database } from "../src/types/database";

type SectionInsert = Database["public"]["Tables"]["sections"]["Insert"];

const RESUME_PATH =
  "/Users/tomergolan/Documents/תומר גולן - קורות חיים/Tomer_Golan_CV.pdf";

async function main() {
  const supabase = createAdminClient();

  // --- Resume upload -------------------------------------------------
  const resumeFile = readFileSync(RESUME_PATH);
  const resumeFilename = basename(RESUME_PATH);
  const { error: uploadError } = await supabase.storage
    .from("resume")
    .upload(resumeFilename, resumeFile, {
      contentType: "application/pdf",
      upsert: true,
    });
  if (uploadError) throw new Error(`Resume upload failed: ${uploadError.message}`);

  const {
    data: { publicUrl: resumeUrl },
  } = supabase.storage.from("resume").getPublicUrl(resumeFilename);
  console.log(`✓ Resume uploaded: ${resumeUrl}`);

  // --- site_settings ---------------------------------------------------
  const { error: settingsError } = await supabase
    .from("site_settings")
    .update({
      name: "Tomer Golan",
      role: "Software Engineer",
      tagline:
        "I build fast, reliable web applications — from backend systems to polished, user-facing interfaces.",
      hero_headline: "Software Engineer building products people enjoy using.",
      hero_primary_label: "View projects",
      hero_secondary_label: "Get in touch",
      email: "tomergolan2016@gmail.com",
      whatsapp: "+972533454053",
      location: "Israel",
      github_url: "https://github.com/tomergolan-dev",
      github_handle: "@tomergolan-dev",
      linkedin_url: "#",
      linkedin_handle: "Tomer Golan",
      resume_url: resumeUrl,
      resume_filename: resumeFilename,
    })
    .eq("id", 1);
  if (settingsError) throw new Error(`site_settings update failed: ${settingsError.message}`);
  console.log("✓ site_settings updated");

  // --- sections ----------------------------------------------------------
  const sections: SectionInsert[] = [
    {
      type: "about",
      title: "A bit about me",
      description: "",
      body_paragraphs: [
        "I'm a software engineer who enjoys turning ambiguous problems into clean, working products. I care about code that's easy to read, easy to change, and does exactly what it says.",
        "Outside of shipping features, I like digging into the 'why' behind a system's design and finding the simplest solution that holds up under real use.",
      ],
      order_index: 0,
      visible: true,
    },
    {
      type: "projects",
      title: "Selected Projects",
      description:
        "A few projects that reflect how I approach problems — from first concept to shipped product. Replace these with your own case studies.",
      body_paragraphs: [],
      order_index: 1,
      visible: true,
    },
    {
      type: "skills",
      title: "Toolbox",
      description: "The languages, frameworks, and tools I reach for most often.",
      body_paragraphs: [],
      order_index: 2,
      visible: true,
    },
    {
      type: "contact",
      title: "Let's Talk",
      description:
        "I'm always open to new opportunities and interesting projects. If you're looking for someone who's a fast learner and not afraid of the unexpected — let's talk.",
      body_paragraphs: [],
      order_index: 3,
      visible: true,
    },
  ];

  const sectionIds: Record<string, string> = {};
  for (const section of sections) {
    const { data, error } = await supabase
      .from("sections")
      .upsert(section, { onConflict: "type" })
      .select("id, type")
      .single();
    if (error) throw new Error(`section upsert (${section.type}) failed: ${error.message}`);
    sectionIds[section.type] = data.id;
  }
  console.log("✓ sections upserted:", sectionIds);

  // --- about_stats ---------------------------------------------------
  const aboutSectionId = sectionIds["about"];
  await supabase.from("about_stats").delete().eq("section_id", aboutSectionId);
  const { error: statsError } = await supabase.from("about_stats").insert([
    { section_id: aboutSectionId, label: "Years experience", value: "3+", order_index: 0 },
    { section_id: aboutSectionId, label: "Projects shipped", value: "10+", order_index: 1 },
    { section_id: aboutSectionId, label: "Technologies", value: "15+", order_index: 2 },
  ]);
  if (statsError) throw new Error(`about_stats insert failed: ${statsError.message}`);
  console.log("✓ about_stats seeded");

  // --- skill_groups ----------------------------------------------------
  const skillsSectionId = sectionIds["skills"];
  await supabase.from("skill_groups").delete().eq("section_id", skillsSectionId);
  const { error: skillsError } = await supabase.from("skill_groups").insert([
    {
      section_id: skillsSectionId,
      category: "Languages",
      items: ["TypeScript", "JavaScript", "Python", "SQL"],
      order_index: 0,
    },
    {
      section_id: skillsSectionId,
      category: "Frontend",
      items: ["React", "Next.js", "Tailwind CSS"],
      order_index: 1,
    },
    {
      section_id: skillsSectionId,
      category: "Backend",
      items: ["Node.js", "REST APIs", "PostgreSQL"],
      order_index: 2,
    },
    {
      section_id: skillsSectionId,
      category: "Tools",
      items: ["Git", "Docker", "Vercel", "CI/CD"],
      order_index: 3,
    },
  ]);
  if (skillsError) throw new Error(`skill_groups insert failed: ${skillsError.message}`);
  console.log("✓ skill_groups seeded");

  // --- projects (placeholders) -----------------------------------------
  const placeholderProjects = [
    {
      title: "Project One",
      category: "Web App",
      description: "A short description of what this project does and the problem it solves.",
      status: "Completed",
      project_url: "#",
      order_index: 0,
    },
    {
      title: "Project Two",
      category: "API & Backend",
      description: "A short description of what this project does and the problem it solves.",
      status: "In Progress",
      project_url: "#",
      order_index: 1,
    },
    {
      title: "Project Three",
      category: "Data",
      description: "A short description of what this project does and the problem it solves.",
      status: "MVP",
      project_url: "#",
      order_index: 2,
    },
  ];

  for (const project of placeholderProjects) {
    const { data: existing } = await supabase
      .from("projects")
      .select("id")
      .eq("title", project.title)
      .maybeSingle();

    if (existing) {
      const { error } = await supabase.from("projects").update(project).eq("id", existing.id);
      if (error) throw new Error(`project update (${project.title}) failed: ${error.message}`);
    } else {
      const { error } = await supabase.from("projects").insert(project);
      if (error) throw new Error(`project insert (${project.title}) failed: ${error.message}`);
    }
  }
  console.log("✓ placeholder projects seeded");

  console.log("\nDone.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
