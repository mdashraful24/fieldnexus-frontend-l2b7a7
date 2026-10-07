"use client";

import { AlertTriangle, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import PaymentStatusBadge from "@/components/modules/payment/payment-status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetPaymentById } from "@/hooks";
import { getApiErrorMessage } from "@/lib/apiError";
import type { IPayment } from "@/types";

function Detail({
  label,
  value,
  children,
}: {
  label: string;
  value?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div>
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-0.5 break-words text-sm whitespace-pre-wrap">
        {children ?? value ?? "—"}
      </p>
    </div>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <p className="font-heading text-sm font-medium text-foreground">
      {children}
    </p>
  );
}

export default function PaymentDetailsView({
  paymentId,
  backHref,
  backLabel,
  workOrderHref,
  renderActions,
}: {
  paymentId: string;
  backHref: string;
  backLabel: string;
  workOrderHref?: (workOrderId: string) => string;
  renderActions?: (payment: IPayment) => ReactNode;
}) {
  const router = useRouter();

  const { data, isPending, isError, error } = useGetPaymentById(paymentId);

  const payment = data?.data;

  const goBack = () => router.push(backHref);

  if (!paymentId) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed p-8 text-center">
        <span className="grid size-12 place-items-center rounded-full bg-destructive/10 text-destructive">
          <AlertTriangle className="size-6" />
        </span>
        <h2 className="text-base font-semibold">No payment selected</h2>
        <p className="max-w-xs text-sm text-muted-foreground">
          Pick a payment from the list to view its details.
        </p>
        <Button variant="outline" size="sm" onClick={goBack}>
          {backLabel}
        </Button>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="flex flex-col gap-6">
        <Button variant="outline" size="sm" className="w-fit" onClick={goBack}>
          <ArrowLeft className="size-4" />
          {backLabel}
        </Button>
        <Card>
          <CardContent>
            <div className="space-y-4 py-2">
              <div className="flex gap-2">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-20" />
              </div>
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError || !payment) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed p-8 text-center">
        <span className="grid size-12 place-items-center rounded-full bg-destructive/10 text-destructive">
          <AlertTriangle className="size-6" />
        </span>
        <h2 className="text-base font-semibold">
          Unable to load payment details
        </h2>
        <p className="max-w-sm text-sm text-muted-foreground">
          {getApiErrorMessage(
            error,
            "This payment may no longer exist or you may not have permission to view it.",
          )}
        </p>
        <Button variant="outline" size="sm" onClick={goBack}>
          {backLabel}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Button variant="outline" size="sm" className="w-fit" onClick={goBack}>
        <ArrowLeft className="size-4" />
        {backLabel}
      </Button>

      <Card>
        <CardContent className="flex-1">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-heading text-lg font-semibold">
                    ৳{Number(payment.amount).toLocaleString()}{" "}
                    <span className="text-sm font-normal text-muted-foreground">
                      {payment.currency}
                    </span>
                  </h2>
                  <PaymentStatusBadge status={payment.status} />
                </div>
                <p className="mt-1 font-mono text-sm text-muted-foreground">
                  {payment.merchantInvoiceNumber ?? payment.id}
                </p>
              </div>
            </div>

            {renderActions?.(payment)}

            <Separator />

            <div className="space-y-4">
              <SectionTitle>Payment Information</SectionTitle>
              <div className="grid gap-4 sm:grid-cols-2">
                <Detail label="Gateway" value={payment.gateway} />
                <Detail
                  label="Amount"
                  value={`৳${Number(payment.amount).toLocaleString()} ${payment.currency}`}
                />
                <Detail
                  label="bKash Payment ID"
                  value={payment.bkashPaymentId}
                />
                <Detail
                  label="bKash Transaction ID"
                  value={payment.bkashTrxId}
                />
                <Detail
                  label="Payer Reference"
                  value={payment.payerReference}
                />
                <Detail
                  label="Payment Date"
                  value={
                    payment.paidAt
                      ? new Date(payment.paidAt).toLocaleString()
                      : undefined
                  }
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex-1">
          <div className="space-y-4">
            <SectionTitle>Work Order</SectionTitle>
            <div className="grid gap-4 sm:grid-cols-2">
              <Detail
                label="Order Number"
                value={payment.workOrder?.workOrderNumber}
              />
              <Detail label="Title" value={payment.workOrder?.title} />
              <Detail label="Status" value={payment.workOrder?.status} />
              <Detail label="Customer" value={payment.customer?.name} />
            </div>
            {workOrderHref && payment.workOrder && (
              <Button
                variant="outline"
                size="sm"
                className="w-fit"
                onClick={() =>
                  router.push(workOrderHref(payment.workOrder?.id ?? ""))
                }
              >
                View Work Order
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex-1">
          <div className="space-y-4">
            <SectionTitle>Refund</SectionTitle>
            {!payment.refundAt && !payment.refundTrxId ? (
              <p className="text-sm text-muted-foreground">
                No refund has been issued for this payment.
              </p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                <Detail
                  label="Refunded Amount"
                  value={
                    payment.refundAmount !== null &&
                    payment.refundAmount !== undefined
                      ? `৳${Number(payment.refundAmount).toLocaleString()}`
                      : undefined
                  }
                />
                <Detail
                  label="Refund Transaction ID"
                  value={payment.refundTrxId}
                />
                <Detail
                  label="Refunded At"
                  value={
                    payment.refundAt
                      ? new Date(payment.refundAt).toLocaleString()
                      : undefined
                  }
                />
                <Detail label="Refund Reason" value={payment.refundReason} />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex-1">
          <div className="grid gap-4 sm:grid-cols-2">
            <Detail
              label="Created At"
              value={new Date(payment.createdAt).toLocaleString()}
            />
            <Detail
              label="Updated At"
              value={new Date(payment.updatedAt).toLocaleString()}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
