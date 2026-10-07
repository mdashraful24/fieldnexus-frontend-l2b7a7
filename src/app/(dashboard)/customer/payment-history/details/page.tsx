import type { Metadata } from "next";
import { Suspense } from "react";
import CustomerPaymentDetailsPage from "@/components/modules/customer/customer-payment-details-page";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Payment Details",
  description:
    "A full receipt for one of your payments, including gateway references, refunds, and the related booking.",
  path: "/customer/payment-history/details",
  noIndex: true,
});

export default function CustomerPaymentDetailsRoute() {
  return (
    <div className="flex-1 p-4 lg:p-6">
      <div className="mx-auto w-full max-w-3xl">
        <Suspense>
          <CustomerPaymentDetailsPage />
        </Suspense>
      </div>
    </div>
  );
}
