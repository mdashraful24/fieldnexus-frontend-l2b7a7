import { Suspense } from "react";
import AdminVendorDetailsPage from "@/components/modules/admin/admin-vendor-details-page";

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