"use client";

import { CalendarDays, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import WorkOrderStatusBadge from "@/components/modules/work-order/work-order-status-badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetMyWorkOrders } from "@/hooks";

function formatDate(value?: string | null) {
  if (!value) return "Not scheduled";
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function CustomerBookingsList() {
  const router = useRouter();
  const { data, isPending, isError } = useGetMyWorkOrders();
  const bookings = data?.data ?? [];

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
      <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed py-12 text-center">
        <span className="inline-flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <CalendarDays className="size-18" />
        </span>
        <p className="text-sm text-muted-foreground">
          You have not submitted any service bookings yet.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Work Order</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Scheduled</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>
                <p className="font-medium">{booking.title}</p>
                <p className="font-mono text-xs text-muted-foreground">
                  {booking.workOrderNumber}
                </p>
              </TableCell>
              <TableCell className="whitespace-nowrap text-muted-foreground">
                {formatDate(booking.createdAt)}
              </TableCell>
              <TableCell className="whitespace-nowrap text-muted-foreground">
                {formatDate(booking.scheduledAt)}
              </TableCell>
              <TableCell>
                <WorkOrderStatusBadge status={booking.status} />
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8"
                  onClick={() =>
                    router.push(
                      `/customer/bookings/details?workOrderId=${booking.id}`,
                    )
                  }
                >
                  Details
                  <ChevronRight className="size-3.5" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
