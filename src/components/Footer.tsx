import { profile } from "@/data/content";

export default function Footer() {
  return (
    <footer className="border-t border-stone-900/10 px-6 py-8">
      <p className="mx-auto max-w-5xl text-center text-xs text-stone-500">
        © {new Date().getFullYear()} {profile.name}. Built with Next.js and Tailwind CSS.
      </p>
    </footer>
  );
}
