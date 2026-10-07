"use client";

import { Banknote, RotateCcw } from "lucide-react";
import { type Dispatch, type SetStateAction, useState } from "react";
import PaymentStatusBadge from "@/components/modules/payment/payment-status-badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TablePagination from "@/components/ui/table-pagination";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { useRefundPayment, useSuspenseGetAllPayments } from "@/hooks";
import { getApiErrorMessage } from "@/lib/apiError";
import type { IPayment, IPaymentParams } from "@/types";

function RefundPaymentPopover({ payment }: { payment: IPayment }) {
  const { mutate: refundPayment, isPending: isRefunding } = useRefundPayment();
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");

  const handleRefund = () => {
    refundPayment(
      {
        paymentId: payment.id,
        ...(reason ? { reason } : {}),
      },
      {
        onSuccess: (res) => {
          toast.add({
            title: "Success",
            description: res?.message || "Payment refunded successfully.",
            type: "success",
          });
          setReason("");
          setOpen(false);
        },
        onError: (err) => {
          toast.add({
            title: "Error",
            description: getApiErrorMessage(
              err,
              "An error occurred while refunding the payment.",
            ),
            type: "error",
          });
        },
      },
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={<Button variant="outline" size="icon" title="Refund" />}
      >
        <RotateCcw className="size-4" />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80">
        <PopoverTitle>Refund this payment?</PopoverTitle>
        <PopoverDescription>
          {payment.merchantInvoiceNumber ?? "This payment"} of ৳
          {Number(payment.amount).toLocaleString()} will be refunded through the
          payment gateway. This cannot be undone.
        </PopoverDescription>
        <div className="mt-3">
          <Textarea
            rows={2}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            disabled={isRefunding}
            placeholder="Reason (optional)"
          />
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setOpen(false)}
            disabled={isRefunding}
          >
            Cancel
          </Button>
          <Button size="sm" onClick={handleRefund} disabled={isRefunding}>
            {isRefunding ? (
              <>
                <Spinner />
                Refunding...
              </>
            ) : (
              "Refund Payment"
            )}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export interface AdminPaymentsTableProps extends IPaymentParams {
  handlePageChange: Dispatch<SetStateAction<number>>;
}

function StatusNote() {
  return <span className="text-base font-bold text-muted-foreground">—</span>;
}

export default function AdminPaymentsTable({
  handlePageChange,
  ...params
}: AdminPaymentsTableProps) {
  const { data } = useSuspenseGetAllPayments(params);

  const payments = data?.data ?? [];
  const totalPages = data?.meta?.totalPages ?? 0;
  const page = params.page ?? 1;
  const limit = params.limit ?? 10;

  return (
    <>
      <div className="overflow-hidden rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Invoice</TableHead>
              <TableHead>Work Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Refund</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="h-32 text-center text-muted-foreground"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Banknote className="size-6" />
                    <p className="text-sm">No payments found.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              payments.map((payment, index) => (
                <TableRow key={payment.id}>
                  <TableCell>{(page - 1) * limit + index + 1}</TableCell>
                  <TableCell className="font-mono text-xs">
                    {payment.merchantInvoiceNumber ?? "—"}
                  </TableCell>
                  <TableCell className="max-w-56">
                    <p className="truncate font-medium">
                      {payment.workOrder?.workOrderNumber ??
                        payment.workOrderId.slice(0, 8)}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {payment.workOrder?.title ?? "—"}
                    </p>
                  </TableCell>
                  <TableCell className="max-w-40 truncate">
                    {payment.customer?.name ?? "—"}
                  </TableCell>
                  <TableCell className="whitespace-nowrap font-medium">
                    ৳{Number(payment.amount).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <PaymentStatusBadge status={payment.status} />
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {payment.paidAt
                      ? new Date(payment.paidAt).toLocaleString()
                      : new Date(payment.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {payment.status === "PAID" ? (
                      <RefundPaymentPopover payment={payment} />
                    ) : (
                      <StatusNote />
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div>
        <TablePagination
          page={page}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </>
  );
}
