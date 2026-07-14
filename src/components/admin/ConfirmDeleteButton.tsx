"use client";

import type { ReactNode } from "react";

export default function ConfirmDeleteButton({
  action,
  confirmMessage = "Are you sure? This can't be undone.",
  children,
  className,
}: {
  action: () => Promise<void>;
  confirmMessage?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (!confirm(confirmMessage)) {
          event.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className={className ?? "text-xs font-medium text-red-600 hover:text-red-800"}
      >
        {children}
      </button>
    </form>
  );
}
