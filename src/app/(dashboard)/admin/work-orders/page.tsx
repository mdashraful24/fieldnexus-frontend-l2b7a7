import { ClipboardList } from "lucide-react";
import type { Metadata } from "next";
import AdminWorkOrdersTabs from "@/components/modules/admin/admin-work-orders-tabs";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Work Orders",
  description:
    "Approve, assign and track every work order raised across the platform.",
  path: "/admin/work-orders",
  noIndex: true,
});

export default function AdminWorkOrdersPage() {
  return (
    <div className="flex-1 p-4 lg:p-6">
      <div className="mx-auto flex w-full flex-col gap-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ClipboardList className="size-5" />
          </span>
          <div>
            <h1 className="font-heading text-2xl font-semibold tracking-tight">
              Work Orders
            </h1>
            <p className="text-sm text-muted-foreground">
              Approve, assign and track work orders from a single place.
            </p>
          </div>
        </div>

        <AdminWorkOrdersTabs />
      </div>
    </div>
  );
}
