import { createClient } from "@/lib/supabase/server";
import type { SiteSettings } from "@/types/database";

export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .single();

  if (error || !data) {
    throw new Error(`Failed to load site settings: ${error?.message ?? "not found"}`);
  }

  return data;
}
