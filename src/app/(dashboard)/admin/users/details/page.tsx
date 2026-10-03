import type { Metadata } from "next";
import { Suspense } from "react";
import AdminUserDetailsPage from "@/components/modules/admin/admin-user-details-page";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "User Details",
  description:
    "Full profile, status, and account controls for a customer or technician on the platform.",
  path: "/admin/users/details",
  noIndex: true,
});

export default function AdminUserDetailsRoute() {
  return (
    <div className="flex-1 p-4 lg:p-6">
      <div className="mx-auto w-full max-w-3xl">
        <Suspense>
          <AdminUserDetailsPage />
        </Suspense>
      </div>
    </div>
  );
}
