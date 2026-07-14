"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormField from "@/components/admin/FormField";
import { updateSimpleSection } from "../actions";
import type { Section } from "@/types/database";

const schema = z.object({
  title: z.string().min(1, "Required"),
  description: z.string().min(1, "Required"),
});

type FormValues = z.infer<typeof schema>;

export default function SimpleSectionForm({ section }: { section: Section }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { title: section.title, description: section.description },
  });

  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = handleSubmit(async (values) => {
    const result = await updateSimpleSection(section.id, values);
    if (result.error) {
      setServerError(result.error);
      setStatus("error");
    } else {
      setServerError(null);
      setStatus("saved");
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <FormField label="Title" {...register("title")} error={errors.title?.message} />
      <FormField
        label="Description"
        {...register("description")}
        error={errors.description?.message}
      />
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
