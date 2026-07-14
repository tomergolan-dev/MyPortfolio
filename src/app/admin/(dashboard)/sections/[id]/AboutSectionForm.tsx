"use client";

import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import FormField from "@/components/admin/FormField";
import { updateAboutSection } from "../actions";
import type { AboutStat, Section } from "@/types/database";

const schema = z.object({
  title: z.string().min(1, "Required"),
  body_paragraphs: z.array(z.object({ value: z.string().min(1, "Can't be empty") })),
  stats: z.array(
    z.object({
      label: z.string().min(1, "Required"),
      value: z.string().min(1, "Required"),
    }),
  ),
});

type FormValues = z.infer<typeof schema>;

export default function AboutSectionForm({
  section,
  stats,
}: {
  section: Section;
  stats: AboutStat[];
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
      body_paragraphs: section.body_paragraphs.map((value) => ({ value })),
      stats: stats.map((stat) => ({ label: stat.label, value: stat.value })),
    },
  });

  const paragraphs = useFieldArray({ control, name: "body_paragraphs" });
  const statFields = useFieldArray({ control, name: "stats" });

  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = handleSubmit(async (values) => {
    const result = await updateAboutSection(section.id, {
      title: values.title,
      body_paragraphs: values.body_paragraphs.map((p) => p.value),
      stats: values.stats,
    });
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

      <div>
        <p className="text-sm font-medium text-stone-700">Bio paragraphs</p>
        <div className="mt-2 space-y-3">
          {paragraphs.fields.map((field, index) => (
            <div key={field.id} className="flex items-start gap-2">
              <textarea
                {...register(`body_paragraphs.${index}.value` as const)}
                rows={3}
                className="w-full rounded-lg border border-stone-900/15 bg-white px-3 py-2 text-sm text-stone-900 outline-none focus:border-stone-900/40"
              />
              <div className="flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => index > 0 && paragraphs.move(index, index - 1)}
                  disabled={index === 0}
                  className="text-stone-500 hover:text-stone-900 disabled:opacity-20"
                  aria-label="Move up"
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    index < paragraphs.fields.length - 1 && paragraphs.move(index, index + 1)
                  }
                  disabled={index === paragraphs.fields.length - 1}
                  className="text-stone-500 hover:text-stone-900 disabled:opacity-20"
                  aria-label="Move down"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => paragraphs.remove(index)}
                  className="text-red-500 hover:text-red-700"
                  aria-label="Remove paragraph"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => paragraphs.append({ value: "" })}
          className="mt-2 flex items-center gap-1 text-xs font-medium text-stone-600 hover:text-stone-900"
        >
          <Plus className="h-3 w-3" /> Add paragraph
        </button>
      </div>

      <div>
        <p className="text-sm font-medium text-stone-700">Stats</p>
        <div className="mt-2 space-y-3">
          {statFields.fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2">
              <input
                {...register(`stats.${index}.label` as const)}
                placeholder="Label"
                className="w-1/2 rounded-lg border border-stone-900/15 bg-white px-3 py-2 text-sm text-stone-900 outline-none focus:border-stone-900/40"
              />
              <input
                {...register(`stats.${index}.value` as const)}
                placeholder="Value"
                className="w-1/3 rounded-lg border border-stone-900/15 bg-white px-3 py-2 text-sm text-stone-900 outline-none focus:border-stone-900/40"
              />
              <button
                type="button"
                onClick={() => index > 0 && statFields.move(index, index - 1)}
                disabled={index === 0}
                className="text-stone-500 hover:text-stone-900 disabled:opacity-20"
                aria-label="Move up"
              >
                <ChevronUp className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() =>
                  index < statFields.fields.length - 1 && statFields.move(index, index + 1)
                }
                disabled={index === statFields.fields.length - 1}
                className="text-stone-500 hover:text-stone-900 disabled:opacity-20"
                aria-label="Move down"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => statFields.remove(index)}
                className="text-red-500 hover:text-red-700"
                aria-label="Remove stat"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => statFields.append({ label: "", value: "" })}
          className="mt-2 flex items-center gap-1 text-xs font-medium text-stone-600 hover:text-stone-900"
        >
          <Plus className="h-3 w-3" /> Add stat
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
