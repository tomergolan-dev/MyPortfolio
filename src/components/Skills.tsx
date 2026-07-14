import { skills, skillsSection } from "@/data/content";
import SectionHeading from "@/components/SectionHeading";

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
      <SectionHeading
        eyebrow={skillsSection.eyebrow}
        title={skillsSection.title}
        description={skillsSection.description}
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-6">
        {skills.map((group) => (
          <div
            key={group.category}
            className="rounded-2xl border border-stone-900/10 bg-white/60 p-6"
          >
            <h3 className="text-sm font-medium text-stone-900">{group.category}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full bg-stone-900/5 px-3 py-1 text-xs text-stone-600"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
