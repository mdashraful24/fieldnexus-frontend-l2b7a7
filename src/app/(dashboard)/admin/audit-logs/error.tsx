"use client";

import AdminPageError from "@/components/modules/admin/page-error";

export default function AdminAuditLogsError({
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
      message="An unexpected error occurred while loading audit logs."
    />
  );
}
