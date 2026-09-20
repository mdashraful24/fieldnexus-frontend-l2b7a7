"use client";

import AdminPageError from "@/components/modules/admin/page-error";

export default function AdminUsersError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <AdminPageError
      error={error}
      reset={reset}
      message="An unexpected error occurred while loading users."
    />
  );
}
