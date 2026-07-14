import { requireAdmin } from "@/lib/supabase/require-admin";
import FileUploadForm from "@/components/admin/FileUploadForm";
import SettingsForm from "./SettingsForm";
import { uploadProfilePhoto, uploadResume } from "./actions";
import type { SiteSettings } from "@/types/database";

export default async function SettingsPage() {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase.from("site_settings").select("*").eq("id", 1).single();

  if (error || !data) {
    return <p className="text-sm text-red-600">Failed to load settings.</p>;
  }

  const settings = data as SiteSettings;

  return (
    <div className="max-w-3xl">
      <h1 className="text-xl font-semibold text-stone-900">Settings</h1>
      <p className="mt-1 text-sm text-stone-600">
        Identity, tagline, social links, WhatsApp, resume, and profile photo.
      </p>

      <div className="mt-8 rounded-2xl border border-stone-900/10 bg-white/60 p-6">
        <SettingsForm settings={settings} />
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-stone-900/10 bg-white/60 p-6">
          <FileUploadForm
            action={uploadResume}
            fieldName="resume"
            accept="application/pdf"
            label="Resume (PDF)"
            currentUrl={settings.resume_url}
            currentLabel={settings.resume_filename ?? "Current resume"}
          />
        </div>
        <div className="rounded-2xl border border-stone-900/10 bg-white/60 p-6">
          <FileUploadForm
            action={uploadProfilePhoto}
            fieldName="photo"
            accept="image/jpeg,image/png,image/webp"
            label="Profile photo"
            currentUrl={settings.profile_image_url}
            currentLabel="Current photo"
          />
        </div>
      </div>
    </div>
  );
}
