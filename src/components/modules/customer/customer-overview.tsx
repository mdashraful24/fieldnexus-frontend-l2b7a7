"use client";

import { Banknote, CalendarPlus, ListChecks } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSuspenseGetAllPayments } from "@/hooks";
import PaymentStatusBadge from "../payment/payment-status-badge";

function SummaryCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  icon: typeof Banknote;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border bg-card p-4">
      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="size-5" />
      </span>
      <div className="min-w-0">
        <p className="font-heading text-xl font-semibold">{value}</p>
        <p className="truncate text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

export function CustomerOverviewLoading() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static placeholder tiles
        <Skeleton key={index} className="h-20 rounded-xl" />
      ))}
    </div>
  );
}

export default function CustomerOverview() {
  const { data } = useSuspenseGetAllPayments({ page: 1, limit: 50 });

  const payments = data?.data ?? [];
  const totalPaid = payments
    .filter((payment) => payment.status === "PAID")
    .reduce((sum, payment) => sum + Number(payment.amount), 0);
  const unpaidCount = payments.filter(
    (payment) => payment.status === "UNPAID",
  ).length;
  const recentPayments = payments.slice(0, 5);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <SummaryCard
          label="Total paid"
          value={`৳${totalPaid.toLocaleString()}`}
          icon={Banknote}
        />
        <SummaryCard
          label="Awaiting payment"
          value={unpaidCount}
          icon={ListChecks}
        />
        <SummaryCard
          label="Total transactions"
          value={payments.length}
          icon={CalendarPlus}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          render={<Link href="/customer/create-booking" />}
          nativeButton={false}
          className="h-9"
        >
          Book a service
        </Button>
        <Button
          variant="outline"
          render={<Link href="/customer/payment-history" />}
          nativeButton={false}
          className="h-9"
        >
          View all payments
        </Button>
      </div>

      {recentPayments.length > 0 ? (
        <div className="flex flex-col gap-2">
          <h2 className="font-heading text-sm font-semibold text-muted-foreground">
            Recent payments
          </h2>
          <ul className="flex flex-col gap-2">
            {recentPayments.map((payment) => (
              <li
                key={payment.id}
                className="flex items-center justify-between gap-3 rounded-xl border bg-card px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    ৳{Number(payment.amount).toLocaleString()}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {payment.merchantInvoiceNumber ?? payment.workOrderId} ·{" "}
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <PaymentStatusBadge status={payment.status} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
          You have no payments yet. Book a service to get started.
        </p>
      )}
    </div>
  );
}
