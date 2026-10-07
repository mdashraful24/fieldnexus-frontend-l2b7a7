import { Tags } from "lucide-react";
import type { Metadata } from "next";
import ServiceCategoryTabs from "@/components/modules/service-category/service-category-tabs";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Service Categories",
  description:
    "Create and manage the service categories customers pick from when raising a work order.",
  path: "/admin/service-categories",
  noIndex: true,
});

export default function AdminServiceCategoriesPage() {
  return (
    <div className="flex-1 p-4 lg:p-6">
      <div className="mx-auto flex w-full flex-col gap-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Tags className="size-5" />
          </span>
          <div>
            <h1 className="font-heading text-2xl font-semibold tracking-tight">
              Service Categories
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage the service categories offered across the platform.
            </p>
          </div>
        </div>

        <ServiceCategoryTabs />
      </div>
    </div>
  );
}
