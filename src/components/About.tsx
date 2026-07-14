import { about } from "@/data/content";
import SectionHeading from "@/components/SectionHeading";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
      <SectionHeading eyebrow={about.eyebrow} title={about.title} />
      <div className="mt-10 grid gap-10 sm:grid-cols-3 sm:gap-12">
        <div className="space-y-4 sm:col-span-2">
          {about.bio.map((paragraph) => (
            <p key={paragraph} className="text-base leading-relaxed text-stone-600">
              {paragraph}
            </p>
          ))}
        </div>
        <dl className="grid grid-cols-3 gap-3 sm:grid-cols-1 sm:gap-4">
          {about.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-stone-900/10 bg-white/60 p-4"
            >
              <dt className="text-xs text-stone-500">{stat.label}</dt>
              <dd className="mt-1 text-2xl font-semibold text-stone-900">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
