"use client";

import { useActionState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { UploadState } from "./FileUploadForm";

export type UploadedFile = { path: string; filename: string };

export type DirectUploadConfig = {
  bucket: "resume" | "profile" | "project-images";
  fieldName: string;
  prefix: string;
  allowedTypes: string[];
  maxBytes: number;
  typeError: string;
  // Server action that records the already-uploaded file. Only the storage path
  // crosses the Server Action boundary, so the 1MB body limit never applies.
  onUploaded: (file: UploadedFile) => Promise<UploadState>;
};

const EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpeg",
  "image/png": "png",
  "image/webp": "webp",
  "application/pdf": "pdf",
};

export function useDirectUpload(config: DirectUploadConfig) {
  return useActionState<UploadState, FormData>(async (_prev, formData) => {
    const file = formData.get(config.fieldName);
    if (!(file instanceof File) || file.size === 0) {
      return { error: "Choose a file to upload." };
    }
    if (!config.allowedTypes.includes(file.type)) {
      return { error: config.typeError };
    }
    if (file.size > config.maxBytes) {
      return { error: `File must be smaller than ${Math.round(config.maxBytes / 1024 / 1024)}MB.` };
    }

    try {
      const path = `${config.prefix}-${Date.now()}.${EXTENSIONS[file.type]}`;
      const supabase = createClient();
      const { error } = await supabase.storage
        .from(config.bucket)
        .upload(path, file, { contentType: file.type, upsert: true });
      if (error) return { error: error.message };

      return await config.onUploaded({ path, filename: file.name });
    } catch (error) {
      console.error("Upload failed:", error);
      return { error: error instanceof Error ? error.message : "Upload failed. Please try again." };
    }
  }, {});
}
