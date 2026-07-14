"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormField from "@/components/admin/FormField";
import { updateProject } from "../actions";
import type { Project } from "@/types/database";

const schema = z.object({
  title: z.string().min(1, "Required"),
  description: z.string().min(1, "Required"),
  category: z.string().min(1, "Required"),
  status: z.string().min(1, "Required"),
  technologies: z.string(),
  github_url: z.string(),
  live_url: z.string(),
  project_url: z.string(),
  featured: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

export default function ProjectForm({ project }: { project: Project }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: project.title,
      description: project.description,
      category: project.category,
      status: project.status,
      technologies: project.technologies.join(", "),
      github_url: project.github_url ?? "",
      live_url: project.live_url ?? "",
      project_url: project.project_url ?? "",
      featured: project.featured,
    },
  });

  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = handleSubmit(async (values) => {
    const result = await updateProject(project.id, values);
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
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          label="Category (e.g. Web App)"
          {...register("category")}
          error={errors.category?.message}
        />
        <FormField
          label="Status (e.g. Completed)"
          {...register("status")}
          error={errors.status?.message}
        />
      </div>
      <FormField
        label="Technologies (comma-separated)"
        {...register("technologies")}
        error={errors.technologies?.message}
      />
      <div className="grid gap-4 sm:grid-cols-3">
        <FormField label="GitHub URL" {...register("github_url")} error={errors.github_url?.message} />
        <FormField label="Live demo URL" {...register("live_url")} error={errors.live_url?.message} />
        <FormField
          label="Project URL"
          {...register("project_url")}
          error={errors.project_url?.message}
        />
      </div>
      <label className="flex items-center gap-2 text-sm text-stone-700">
        <input type="checkbox" {...register("featured")} className="h-4 w-4 rounded" />
        Featured
      </label>
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
