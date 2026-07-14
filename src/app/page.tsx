import About from "@/components/About";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import { getSiteSettings } from "@/lib/data/settings";
import { getVisibleSections, type SectionWithChildren } from "@/lib/data/sections";
import { getVisibleProjects, type ProjectWithImages } from "@/lib/data/projects";
import type { SiteSettings } from "@/types/database";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [settings, sections, projects] = await Promise.all([
    getSiteSettings(),
    getVisibleSections(),
    getVisibleProjects(),
  ]);

  return (
    <>
      <Nav name={settings.name} />
      <main className="flex-1">
        <Hero settings={settings} />
        {sections.map((section) => renderSection(section, settings, projects))}
      </main>
    </>
  );
}

function renderSection(
  section: SectionWithChildren,
  settings: SiteSettings,
  projects: ProjectWithImages[],
) {
  switch (section.type) {
    case "about":
      return <About key={section.id} section={section} />;
    case "skills":
      return <Skills key={section.id} section={section} />;
    case "projects":
      return <Projects key={section.id} section={section} projects={projects} />;
    case "contact":
      return <Contact key={section.id} section={section} settings={settings} />;
    default:
      return null;
  }
}
