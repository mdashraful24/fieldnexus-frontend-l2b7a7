import { Banknote } from "lucide-react";
import { Suspense } from "react";
import PaymentHistoryTable, {
  PaymentsLoading,
} from "@/components/modules/payment/payment-history-table";

export default function CustomerPaymentHistoryPage() {
  return (
    <div className="flex-1 p-4 lg:p-6">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Banknote className="size-5" />
          </span>
          <div>
            <h1 className="font-heading text-2xl font-semibold tracking-tight">
              Payment History
            </h1>
            <p className="text-sm text-muted-foreground">
              Payments and refunds for your service bookings.
            </p>
          </div>
        </div>

        <Suspense fallback={<PaymentsLoading />}>
          <PaymentHistoryTable />
        </Suspense>
      </div>
    </div>
  );
}
