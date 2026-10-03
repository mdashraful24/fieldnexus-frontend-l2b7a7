import { LayoutDashboard } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";
import AdminOverview from "@/components/modules/admin/admin-overview";
import AdminOverviewLoading from "@/components/modules/admin/admin-overview-loading";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Admin Overview",
  description:
    "Platform metrics across customers, technicians, vendors, and work orders in one admin overview.",
  path: "/admin",
  noIndex: true,
});

export default function AdminDashboardPage() {
  return (
    <div className="flex-1 p-4 lg:p-6">
      <div className="mx-auto flex w-full flex-col gap-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <LayoutDashboard className="size-5" />
          </span>
          <div>
            <h1 className="font-heading text-2xl font-semibold tracking-tight">
              Overview
            </h1>
            <p className="text-sm text-muted-foreground">
              Key metrics across customers, technicians, vendors, and work
              orders.
            </p>
          </div>
        </div>

        <Suspense fallback={<AdminOverviewLoading />}>
          <AdminOverview />
        </Suspense>
      </div>
    </div>
  );
}
