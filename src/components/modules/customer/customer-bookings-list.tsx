"use client";

import { Calendar, ChevronRight, Clock3 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllPayments, useGetMyWorkOrders } from "@/hooks";
import type { IWorkOrder, WorkOrderStatus } from "@/types";
import CustomerBookingActions from "./customer-booking-actions";

const statusLabels: Record<WorkOrderStatus, string> = {
  PENDING: "Pending",
  APPROVED: "Approved",
  ASSIGNED: "Assigned",
  ACCEPTED: "Accepted",
  EN_ROUTE: "En route",
  IN_PROGRESS: "In progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
  REASSIGNED: "Reassigned",
  FAILED: "Failed",
};

function formatDate(value?: string | null) {
  if (!value) return "Not scheduled";
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function BookingCard({
  booking,
  showPay,
}: {
  booking: IWorkOrder;
  showPay: boolean;
}) {
  const isCompleted = booking.status === "COMPLETED";

  return (
    <div className="group flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-medium">{booking.title}</p>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
            {statusLabels[booking.status]}
          </span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          {booking.workOrderNumber}
        </p>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="size-3.5" />
            Created {formatDate(booking.createdAt)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock3 className="size-3.5" />
            {formatDate(booking.scheduledAt)}
          </span>
        </div>
      </div>
      {isCompleted ? (
        <div className="shrink-0">
          <CustomerBookingActions booking={booking} showPay={showPay} />
        </div>
      ) : (
        <ChevronRight className="hidden size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 sm:block" />
      )}
    </div>
  );
}

export default function CustomerBookingsList() {
  const { data, isPending, isError } = useGetMyWorkOrders();
  const bookings = data?.data ?? [];

  const { data: paymentsData, isPending: paymentsPending } = useGetAllPayments({
    page: 1,
    limit: 100,
  });

  const paidWorkOrderIds = new Set(
    (paymentsData?.data ?? [])
      .filter((payment) => payment.status === "PAID")
      .map((payment) => payment.workOrderId),
  );

  if (isPending) {
    return (
      <div className="flex flex-col gap-3">
        {[1, 2, 3].map((item) => (
          <div key={item} className="rounded-xl border p-4">
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="mt-2 h-3 w-28" />
            <Skeleton className="mt-4 h-3 w-48" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-5 text-sm text-destructive">
        Unable to load your bookings. Please refresh and try again.
      </div>
    );
  }

  if (!bookings.length) {
    return (
      <div className="rounded-2xl border border-dashed p-8 text-sm text-muted-foreground">
        You have not submitted any service bookings yet.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {bookings.map((booking) => (
        <BookingCard
          key={booking.id}
          booking={booking}
          showPay={!paymentsPending && !paidWorkOrderIds.has(booking.id)}
        />
      ))}
    </div>
  );
}
