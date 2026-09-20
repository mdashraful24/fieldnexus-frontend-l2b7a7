import { Building2 } from "lucide-react";
import AdminVendorsTabs from "@/components/modules/admin/admin-vendors-tabs";

export default function AdminVendorsPage() {
  return (
    <div className="flex-1 p-4 lg:p-6">
      <div className="mx-auto flex w-full flex-col gap-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Building2 className="size-5" />
          </span>
          <div>
            <h1 className="font-heading text-2xl font-semibold tracking-tight">
              Vendors
            </h1>
            <p className="text-sm text-muted-foreground">
              Browse vendors and inspect their job performance and ratings.
            </p>
          </div>
        </div>

        <AdminVendorsTabs />
      </div>
    </div>
  );
}
