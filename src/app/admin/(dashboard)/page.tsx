import Link from "next/link";

const cards = [
  {
    href: "/admin/settings",
    title: "Settings",
    description: "Identity, tagline, social links, WhatsApp, resume, and profile photo.",
  },
  {
    href: "/admin/sections",
    title: "Sections",
    description: "Show/hide and reorder About, Projects, Skills, and Contact.",
  },
  {
    href: "/admin/projects",
    title: "Projects",
    description: "Add, edit, feature, and reorder your project cards.",
  },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-stone-900">Dashboard</h1>
      <p className="mt-1 text-sm text-stone-600">Manage your portfolio content.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-2xl border border-stone-900/10 bg-white/60 p-5 transition-colors hover:border-stone-900/25"
          >
            <h2 className="text-sm font-semibold text-stone-900">{card.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">{card.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
