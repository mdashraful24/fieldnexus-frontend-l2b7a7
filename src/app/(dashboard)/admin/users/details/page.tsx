import { Suspense } from "react";
import AdminUserDetailsPage from "@/components/modules/admin/admin-user-details-page";

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