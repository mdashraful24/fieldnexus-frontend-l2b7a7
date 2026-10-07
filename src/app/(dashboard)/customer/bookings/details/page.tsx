import type { Metadata } from "next";
import { Suspense } from "react";
import CustomerWorkOrderDetailsPage from "@/components/modules/customer/customer-work-order-details-page";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Booking Details",
  description:
    "Review the full details of your service booking, including assignments, service report, and feedback.",
  path: "/customer/bookings/details",
  noIndex: true,
});

export default function CustomerBookingDetailsRoute() {
  return (
    <div className="flex-1 p-4 lg:p-6">
      <div className="mx-auto w-full max-w-3xl">
        <Suspense>
          <CustomerWorkOrderDetailsPage />
        </Suspense>
      </div>
    </div>
  );
}
