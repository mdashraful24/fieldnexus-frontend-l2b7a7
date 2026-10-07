"use client";

import { useSearchParams } from "next/navigation";
import PaymentDetailsView from "@/components/modules/payment/payment-details-view";

export default function CustomerPaymentDetailsPage() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("paymentId") ?? "";

  return (
    <PaymentDetailsView
      paymentId={paymentId}
      backHref="/customer/payment-history"
      backLabel="Back to Payment History"
      workOrderHref={(workOrderId) =>
        `/customer/bookings/details?workOrderId=${workOrderId}`
      }
    />
  );
}
