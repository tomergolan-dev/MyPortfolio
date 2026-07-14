import { profile } from "@/data/content";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-20">
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
        <h2 className="text-2xl font-semibold text-zinc-50">Let&apos;s work together</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-zinc-400">
          I&apos;m open to new opportunities and interesting projects. Reach out and I&apos;ll get
          back to you.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full bg-zinc-50 px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
          >
            {profile.email}
          </a>
          <a
            href={profile.social.github}
            className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-zinc-50 transition-colors hover:border-white/30 hover:bg-white/5"
          >
            GitHub
          </a>
          <a
            href={profile.social.linkedin}
            className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-zinc-50 transition-colors hover:border-white/30 hover:bg-white/5"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
