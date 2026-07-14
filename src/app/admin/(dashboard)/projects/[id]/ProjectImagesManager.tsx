"use client";

import Image from "next/image";
import { useActionState } from "react";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import type { UploadState } from "@/components/admin/FileUploadForm";
import { deleteProjectImage, moveProjectImage, uploadProjectImage } from "../actions";
import type { ProjectImage } from "@/types/database";

export default function ProjectImagesManager({
  projectId,
  images,
}: {
  projectId: string;
  images: ProjectImage[];
}) {
  const [state, formAction, pending] = useActionState<UploadState, FormData>(
    uploadProjectImage.bind(null, projectId),
    {},
  );

  return (
    <div>
      <p className="text-sm font-medium text-stone-700">Images</p>

      {images.length > 0 ? (
        <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {images.map((image, index) => (
            <li key={image.id} className="overflow-hidden rounded-lg border border-stone-900/10">
              <div className="relative aspect-video bg-stone-100">
                <Image src={image.url} alt={image.alt_text || ""} fill className="object-cover" />
              </div>
              <div className="flex items-center justify-between px-2 py-1.5">
                <div className="flex gap-1">
                  <form action={moveProjectImage.bind(null, image.id, projectId, "up")}>
                    <button
                      type="submit"
                      disabled={index === 0}
                      className="text-stone-500 hover:text-stone-900 disabled:opacity-20"
                      aria-label="Move up"
                    >
                      <ChevronUp className="h-3.5 w-3.5" />
                    </button>
                  </form>
                  <form action={moveProjectImage.bind(null, image.id, projectId, "down")}>
                    <button
                      type="submit"
                      disabled={index === images.length - 1}
                      className="text-stone-500 hover:text-stone-900 disabled:opacity-20"
                      aria-label="Move down"
                    >
                      <ChevronDown className="h-3.5 w-3.5" />
                    </button>
                  </form>
                </div>
                <form action={deleteProjectImage.bind(null, image.id, projectId)}>
                  <button
                    type="submit"
                    className="text-red-500 hover:text-red-700"
                    aria-label="Delete image"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-sm text-stone-400">No images yet.</p>
      )}

      <form action={formAction} className="mt-4 space-y-2">
        <input
          type="file"
          name="image"
          accept="image/jpeg,image/png,image/webp"
          required
          className="block w-full text-sm text-stone-600 file:mr-3 file:rounded-full file:border-0 file:bg-stone-900 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-white"
        />
        {state.error && <p className="text-sm text-red-600">{state.error}</p>}
        {state.success && <p className="text-sm text-emerald-700">Uploaded.</p>}
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-stone-900 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-stone-700 disabled:opacity-60"
        >
          {pending ? "Uploading…" : "Add image"}
        </button>
      </form>
    </div>
  );
}
