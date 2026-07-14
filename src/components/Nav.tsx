"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Nav({ name }: { name: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0d14]/70 backdrop-blur-md">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href="#top"
          className="font-mono text-sm font-semibold tracking-tight text-white"
        >
          <span className="text-ide-blue">&lt;</span>
          {name}
          <span className="text-ide-blue">/&gt;</span>
        </Link>
        <ul className="hidden items-center gap-6 sm:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-slate-400 transition-colors hover:text-ide-cyan"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex h-9 w-9 items-center justify-center rounded-full text-white sm:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      {open && (
        <ul className="flex flex-col gap-1 border-t border-white/10 px-6 py-4 sm:hidden">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-sm text-slate-300 transition-colors hover:text-ide-cyan"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
