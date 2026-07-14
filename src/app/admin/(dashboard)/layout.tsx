import Link from "next/link";
import { requireAdmin } from "@/lib/supabase/require-admin";
import { signOut } from "@/app/admin/actions";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/settings", label: "Settings" },
  { href: "/admin/sections", label: "Sections" },
  { href: "/admin/projects", label: "Projects" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = await requireAdmin();

  return (
    <div className="flex min-h-screen bg-[#faf8f4] text-stone-900">
      <aside className="flex w-56 shrink-0 flex-col border-r border-stone-900/10 bg-white/60 p-6">
        <p className="text-sm font-semibold text-stone-900">Admin</p>
        <p className="mt-1 truncate text-xs text-stone-500">{user.email}</p>
        <nav className="mt-6 flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm text-stone-600 transition-colors hover:bg-stone-900/5 hover:text-stone-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <form action={signOut} className="mt-6">
          <button
            type="submit"
            className="w-full rounded-lg border border-stone-900/15 px-3 py-2 text-sm text-stone-600 transition-colors hover:bg-stone-900/5"
          >
            Sign out
          </button>
        </form>
        <Link
          href="/"
          className="mt-2 block text-center text-xs text-stone-400 transition-colors hover:text-stone-600"
        >
          ← Back to site
        </Link>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
