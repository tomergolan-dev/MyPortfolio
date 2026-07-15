"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormField from "@/components/admin/FormField";
import { updateSettings } from "./actions";
import type { SiteSettings } from "@/types/database";

const schema = z.object({
  name: z.string().min(1, "Required"),
  role: z.string().min(1, "Required"),
  tagline: z.string().min(1, "Required"),
  hero_headline: z.string().min(1, "Required"),
  hero_primary_label: z.string().min(1, "Required"),
  hero_secondary_label: z.string().min(1, "Required"),
  email: z.string().email("Enter a valid email"),
  whatsapp: z.string().min(1, "Required"),
  location: z.string().min(1, "Required"),
  github_url: z.string().min(1, "Required"),
  github_handle: z.string().min(1, "Required"),
  linkedin_url: z.string().min(1, "Required"),
  linkedin_handle: z.string().min(1, "Required"),
  page_title: z.string().min(1, "Required"),
  meta_description: z.string().min(1, "Required"),
});

type FormValues = z.infer<typeof schema>;

export default function SettingsForm({ settings }: { settings: SiteSettings }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: settings.name,
      role: settings.role,
      tagline: settings.tagline,
      hero_headline: settings.hero_headline,
      hero_primary_label: settings.hero_primary_label,
      hero_secondary_label: settings.hero_secondary_label,
      email: settings.email,
      whatsapp: settings.whatsapp,
      location: settings.location,
      github_url: settings.github_url,
      github_handle: settings.github_handle,
      linkedin_url: settings.linkedin_url,
      linkedin_handle: settings.linkedin_handle,
      page_title: settings.page_title,
      meta_description: settings.meta_description,
    },
  });

  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = handleSubmit(async (values) => {
    const result = await updateSettings(values);
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
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Name" {...register("name")} error={errors.name?.message} />
        <FormField label="Role" {...register("role")} error={errors.role?.message} />
      </div>
      <p className="pt-2 text-xs font-semibold uppercase tracking-widest text-stone-500">
        Browser tab &amp; search engines
      </p>
      <FormField
        label="Page title (browser tab)"
        {...register("page_title")}
        error={errors.page_title?.message}
      />
      <FormField
        label="Meta description (search engines)"
        {...register("meta_description")}
        error={errors.meta_description?.message}
      />
      <FormField label="Tagline" {...register("tagline")} error={errors.tagline?.message} />
      <FormField
        label="Hero headline"
        {...register("hero_headline")}
        error={errors.hero_headline?.message}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          label="Hero primary button label"
          {...register("hero_primary_label")}
          error={errors.hero_primary_label?.message}
        />
        <FormField
          label="Hero secondary button label"
          {...register("hero_secondary_label")}
          error={errors.hero_secondary_label?.message}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          label="Email"
          type="email"
          {...register("email")}
          error={errors.email?.message}
        />
        <FormField
          label="WhatsApp (with country code)"
          {...register("whatsapp")}
          error={errors.whatsapp?.message}
        />
      </div>
      <FormField label="Location" {...register("location")} error={errors.location?.message} />
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          label="GitHub URL"
          {...register("github_url")}
          error={errors.github_url?.message}
        />
        <FormField
          label="GitHub handle"
          {...register("github_handle")}
          error={errors.github_handle?.message}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          label="LinkedIn URL"
          {...register("linkedin_url")}
          error={errors.linkedin_url?.message}
        />
        <FormField
          label="LinkedIn handle"
          {...register("linkedin_handle")}
          error={errors.linkedin_handle?.message}
        />
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
