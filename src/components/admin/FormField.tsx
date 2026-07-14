import type { InputHTMLAttributes } from "react";

type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export default function FormField({ label, error, ...inputProps }: FormFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-stone-700">{label}</label>
      <input
        {...inputProps}
        className="mt-1 w-full rounded-lg border border-stone-900/15 bg-white px-3 py-2 text-sm text-stone-900 outline-none focus:border-stone-900/40"
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
