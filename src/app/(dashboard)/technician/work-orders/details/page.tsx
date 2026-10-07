import type { Metadata } from "next";
import { Suspense } from "react";
import TechnicianWorkOrderDetailsPage from "@/components/modules/technician/technician-work-order-details-page";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Work Order Details",
  description:
    "Full details of your assigned work order, including customer info, service report, and next actions.",
  path: "/technician/work-orders/details",
  noIndex: true,
});

export default function TechnicianWorkOrderDetailsRoute() {
  return (
    <div className="flex-1 p-4 lg:p-6">
      <div className="mx-auto w-full max-w-3xl">
        <Suspense>
          <TechnicianWorkOrderDetailsPage />
        </Suspense>
      </div>
    </div>
  );
}
