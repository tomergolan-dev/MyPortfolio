"use client";

import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import FormField from "@/components/admin/FormField";
import { updateSkillsSection } from "../actions";
import type { Section, SkillGroup } from "@/types/database";

const schema = z.object({
  title: z.string().min(1, "Required"),
  description: z.string().min(1, "Required"),
  groups: z.array(
    z.object({
      category: z.string().min(1, "Required"),
      items: z.string().min(1, "Enter at least one item"),
    }),
  ),
});

type FormValues = z.infer<typeof schema>;

export default function SkillsSectionForm({
  section,
  groups,
}: {
  section: Section;
  groups: SkillGroup[];
}) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: section.title,
      description: section.description,
      groups: groups.map((group) => ({
        category: group.category,
        items: group.items.join(", "),
      })),
    },
  });

  const groupFields = useFieldArray({ control, name: "groups" });

  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = handleSubmit(async (values) => {
    const result = await updateSkillsSection(section.id, values);
    if (result.error) {
      setServerError(result.error);
      setStatus("error");
    } else {
      setServerError(null);
      setStatus("saved");
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <FormField label="Title" {...register("title")} error={errors.title?.message} />
      <FormField
        label="Description"
        {...register("description")}
        error={errors.description?.message}
      />

      <div>
        <p className="text-sm font-medium text-stone-700">Skill groups</p>
        <div className="mt-2 space-y-4">
          {groupFields.fields.map((field, index) => (
            <div key={field.id} className="rounded-lg border border-stone-900/10 p-3">
              <div className="flex items-center gap-2">
                <input
                  {...register(`groups.${index}.category` as const)}
                  placeholder="Category (e.g. Frontend)"
                  className="w-full rounded-lg border border-stone-900/15 bg-white px-3 py-2 text-sm text-stone-900 outline-none focus:border-stone-900/40"
                />
                <button
                  type="button"
                  onClick={() => index > 0 && groupFields.move(index, index - 1)}
                  disabled={index === 0}
                  className="text-stone-500 hover:text-stone-900 disabled:opacity-20"
                  aria-label="Move up"
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    index < groupFields.fields.length - 1 && groupFields.move(index, index + 1)
                  }
                  disabled={index === groupFields.fields.length - 1}
                  className="text-stone-500 hover:text-stone-900 disabled:opacity-20"
                  aria-label="Move down"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => groupFields.remove(index)}
                  className="text-red-500 hover:text-red-700"
                  aria-label="Remove group"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <input
                {...register(`groups.${index}.items` as const)}
                placeholder="Items, comma-separated (e.g. React, Next.js, Tailwind CSS)"
                className="mt-2 w-full rounded-lg border border-stone-900/15 bg-white px-3 py-2 text-sm text-stone-900 outline-none focus:border-stone-900/40"
              />
              {errors.groups?.[index]?.items && (
                <p className="mt-1 text-xs text-red-600">{errors.groups[index]?.items?.message}</p>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => groupFields.append({ category: "", items: "" })}
          className="mt-2 flex items-center gap-1 text-xs font-medium text-stone-600 hover:text-stone-900"
        >
          <Plus className="h-3 w-3" /> Add group
        </button>
      </div>

      {serverError && <p className="text-sm text-red-600">{serverError}</p>}
      {status === "saved" && <p className="text-sm text-emerald-700">Saved.</p>}
      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-stone-700 disabled:opacity-60"
      >
        {isSubmitting ? "Saving…" : "Save changes"}
      </button>
    </form>
  );
}
