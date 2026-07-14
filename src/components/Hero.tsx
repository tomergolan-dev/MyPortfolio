import { profile } from "@/data/content";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-[-10%] h-96 w-96 rounded-full bg-amber-200/50 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 left-[-10%] h-72 w-72 rounded-full bg-orange-100/60 blur-3xl"
      />
      <div className="relative mx-auto flex max-w-5xl flex-col gap-6 px-6 pb-24 pt-20 sm:pt-28">
        <p className="text-sm font-medium tracking-wide text-amber-800">
          Hi, I&apos;m {profile.name}
        </p>
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-stone-900 sm:text-6xl">
          {profile.role} building products people enjoy using.
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-stone-600">{profile.tagline}</p>
        <div className="mt-2 flex flex-wrap items-center gap-6">
          <a
            href="#projects"
            className="rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-stone-700"
          >
            View projects
          </a>
          <a
            href="#contact"
            className="group text-sm font-medium text-stone-900 transition-colors hover:text-amber-800"
          >
            Get in touch
            <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
