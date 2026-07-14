"use client";

import { useActionState } from "react";

export type UploadState = { error?: string; success?: boolean };

export default function FileUploadForm({
  action,
  fieldName,
  accept,
  label,
  currentUrl,
  currentLabel,
}: {
  action: (prevState: UploadState, formData: FormData) => Promise<UploadState>;
  fieldName: string;
  accept: string;
  label: string;
  currentUrl: string | null;
  currentLabel: string;
}) {
  const [state, formAction, pending] = useActionState<UploadState, FormData>(action, {});

  return (
    <form action={formAction} className="space-y-3">
      <p className="text-sm font-medium text-stone-700">{label}</p>
      {currentUrl ? (
        <a
          href={currentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block truncate text-sm text-amber-800 underline"
        >
          {currentLabel}
        </a>
      ) : (
        <p className="text-sm text-stone-400">Nothing uploaded yet.</p>
      )}
      <input
        type="file"
        name={fieldName}
        accept={accept}
        required
        className="block w-full text-sm text-stone-600 file:mr-3 file:rounded-full file:border-0 file:bg-stone-900 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-white"
      />
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      {state.success && <p className="text-sm text-emerald-700">Uploaded successfully.</p>}
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-stone-900 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-stone-700 disabled:opacity-60"
      >
        {pending ? "Uploading…" : "Upload"}
      </button>
    </form>
  );
}
