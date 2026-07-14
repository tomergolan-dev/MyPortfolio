import { profile } from "@/data/content";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-8">
      <p className="mx-auto max-w-5xl text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} {profile.name}. Built with Next.js and Tailwind CSS.
      </p>
    </footer>
  );
}
