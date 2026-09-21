import { Suspense } from "react";
import AdminVendorMembersPage from "@/components/modules/admin/admin-vendor-members-page";

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