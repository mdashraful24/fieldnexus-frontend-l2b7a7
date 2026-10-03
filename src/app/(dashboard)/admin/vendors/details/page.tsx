import type { Metadata } from "next";
import { Suspense } from "react";
import AdminVendorDetailsPage from "@/components/modules/admin/admin-vendor-details-page";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Vendor Details",
  description:
    "Review a vendor profile, service categories, business details, and performance history.",
  path: "/admin/vendors/details",
  noIndex: true,
});

export default function AdminVendorDetailsRoute() {
  return (
    <div className="flex-1 p-4 lg:p-6">
      <div className="mx-auto w-full max-w-3xl">
        <Suspense>
          <AdminVendorDetailsPage />
        </Suspense>
      </div>
    </div>
  );
}
