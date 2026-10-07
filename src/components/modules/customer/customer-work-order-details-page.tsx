"use client";

import { useSearchParams } from "next/navigation";
import CustomerBookingActions from "@/components/modules/customer/customer-booking-actions";
import WorkOrderDetailsView from "@/components/modules/work-order/work-order-details-view";
import { useGetAllPayments } from "@/hooks";

export default function CustomerWorkOrderDetailsPage() {
  const searchParams = useSearchParams();
  const workOrderId = searchParams.get("workOrderId") ?? "";

  const { data: paymentsData, isPending: paymentsPending } = useGetAllPayments({
    page: 1,
    limit: 100,
  });

  const paidWorkOrderIds = new Set(
    (paymentsData?.data ?? [])
      .filter((payment) => payment.status === "PAID")
      .map((payment) => payment.workOrderId),
  );

  return (
    <WorkOrderDetailsView
      workOrderId={workOrderId}
      backHref="/customer/bookings"
      backLabel="Back to Bookings"
      renderActions={(workOrder) =>
        !paymentsPending && workOrder.status === "COMPLETED" ? (
          <CustomerBookingActions
            booking={workOrder}
            showPay={!paidWorkOrderIds.has(workOrder.id)}
          />
        ) : null
      }
    />
  );
}
