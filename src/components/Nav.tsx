import Link from "next/link";
import { navLinks, profile } from "@/data/content";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-900/10 bg-[#faf8f4]/80 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="#top" className="text-sm font-semibold tracking-tight text-stone-900">
          {profile.name}
        </Link>
        <ul className="flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-stone-500 transition-colors hover:text-stone-900"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
