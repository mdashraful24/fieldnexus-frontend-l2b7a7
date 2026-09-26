"use client";

import { useState } from "react";
import { Banknote } from "lucide-react";
import PaymentStatusBadge from "@/components/modules/payment/payment-status-badge";
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
import { useSuspenseGetAllPayments } from "@/hooks";
import type { PaymentStatus } from "@/types";

const filters: { label: string; value?: PaymentStatus }[] = [
  { label: "All" },
  { label: "Paid", value: "PAID" },
  { label: "Unpaid", value: "UNPAID" },
  { label: "Refunded", value: "REFUNDED" },
];

export function PaymentsLoading() {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 4 }).map((_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static placeholder rows
        <Skeleton key={index} className="h-12 w-full rounded-lg" />
      ))}
    </div>
  );
}

export default function PaymentHistoryTable() {
  const [status, setStatus] = useState<PaymentStatus | undefined>(undefined);
  const params = { page: 1, limit: 20, status };

  const { data } = useSuspenseGetAllPayments(params);
  const payments = data?.data ?? [];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <Button
            key={filter.label}
            size="sm"
            variant={status === filter.value ? "default" : "outline"}
            onClick={() => setStatus(filter.value)}
            className="h-8"
          >
            {filter.label}
          </Button>
        ))}
      </div>

      {payments.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed py-12 text-center">
          <span className="inline-flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <Banknote className="size-18" />
          </span>
          <p className="text-sm text-muted-foreground">
            No payments to show yet.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Work order</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-mono text-xs">
                    {payment.merchantInvoiceNumber ?? "—"}
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {payment.workOrderId.slice(0, 8)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap font-medium">
                    ৳{Number(payment.amount).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <PaymentStatusBadge status={payment.status} />
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {new Date(payment.createdAt).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
