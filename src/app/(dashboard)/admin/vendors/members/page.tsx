import type { Metadata } from "next";
import { Suspense } from "react";
import AdminVendorMembersPage from "@/components/modules/admin/admin-vendor-members-page";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Vendor Members",
  description:
    "Inspect the technician members of a vendor team, their status, and their completed work.",
  path: "/admin/vendors/members",
  noIndex: true,
});

export default function AdminVendorMembersRoute() {
  return (
    <div className="flex-1 p-4 lg:p-6">
      <div className="mx-auto w-full max-w-4xl">
        <Suspense>
          <AdminVendorMembersPage />
        </Suspense>
      </div>
    </div>
  );
}
