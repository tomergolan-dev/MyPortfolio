import { profile } from "@/data/content";

export default function Hero() {
  return (
    <section id="top" className="mx-auto flex max-w-5xl flex-col gap-6 px-6 pb-24 pt-20 sm:pt-28">
      <p className="text-sm font-medium text-emerald-400">Hi, I&apos;m {profile.name}</p>
      <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
        {profile.role} building products people enjoy using.
      </h1>
      <p className="max-w-xl text-lg leading-relaxed text-zinc-400">{profile.tagline}</p>
      <div className="mt-2 flex flex-wrap gap-4">
        <a
          href="#projects"
          className="rounded-full bg-zinc-50 px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
        >
          View projects
        </a>
        <a
          href="#contact"
          className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-zinc-50 transition-colors hover:border-white/30 hover:bg-white/5"
        >
          Get in touch
        </a>
      </div>
    </section>
  );
}
