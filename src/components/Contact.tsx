import { profile } from "@/data/content";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-20">
      <div className="rounded-3xl border border-stone-900/10 bg-white/60 p-10 text-center sm:p-14">
        <h2 className="text-3xl font-semibold tracking-tight text-stone-900">
          Let&apos;s work together
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-stone-600">
          I&apos;m open to new opportunities and interesting projects. Reach out and I&apos;ll get
          back to you.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-stone-700"
          >
            {profile.email}
          </a>
          <a
            href={profile.social.github}
            className="rounded-full border border-stone-900/15 px-6 py-3 text-sm font-medium text-stone-900 transition-colors hover:border-stone-900/30 hover:bg-stone-900/5"
          >
            GitHub
          </a>
          <a
            href={profile.social.linkedin}
            className="rounded-full border border-stone-900/15 px-6 py-3 text-sm font-medium text-stone-900 transition-colors hover:border-stone-900/30 hover:bg-stone-900/5"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
