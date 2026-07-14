import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { requireAdmin } from "@/lib/supabase/require-admin";
import { moveSection, toggleVisible } from "./actions";

export default async function SectionsPage() {
  const { supabase } = await requireAdmin();
  const { data: sections, error } = await supabase
    .from("sections")
    .select("*")
    .order("order_index", { ascending: true });

  if (error || !sections) {
    return <p className="text-sm text-red-600">Failed to load sections.</p>;
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-xl font-semibold text-stone-900">Sections</h1>
      <p className="mt-1 text-sm text-stone-600">
        Show, hide, reorder, and edit the sections on your homepage.
      </p>

      <ul className="mt-8 space-y-3">
        {sections.map((section, index) => (
          <li
            key={section.id}
            className="flex items-center justify-between gap-4 rounded-2xl border border-stone-900/10 bg-white/60 p-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex flex-col">
                <form action={moveSection.bind(null, section.id, "up")}>
                  <button
                    type="submit"
                    disabled={index === 0}
                    className="text-stone-500 transition-colors hover:text-stone-900 disabled:opacity-20"
                    aria-label="Move up"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </button>
                </form>
                <form action={moveSection.bind(null, section.id, "down")}>
                  <button
                    type="submit"
                    disabled={index === sections.length - 1}
                    className="text-stone-500 transition-colors hover:text-stone-900 disabled:opacity-20"
                    aria-label="Move down"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </form>
              </div>
              <div>
                <p className="text-sm font-medium text-stone-900">{section.title}</p>
                <p className="text-xs uppercase tracking-widest text-stone-400">{section.type}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <form action={toggleVisible.bind(null, section.id, !section.visible)}>
                <button
                  type="submit"
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    section.visible
                      ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                      : "bg-stone-200 text-stone-600 hover:bg-stone-300"
                  }`}
                >
                  {section.visible ? "Visible" : "Hidden"}
                </button>
              </form>
              <Link
                href={`/admin/sections/${section.id}`}
                className="rounded-full border border-stone-900/15 px-3 py-1 text-xs font-medium text-stone-700 transition-colors hover:bg-stone-900/5"
              >
                Edit
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
