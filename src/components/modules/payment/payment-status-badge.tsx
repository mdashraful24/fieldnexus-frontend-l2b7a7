import { cn } from "cn";
import type { PaymentStatus } from "@/types";

const statusStyles: Record<PaymentStatus, string> = {
  UNPAID: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  PAID: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  FAILED: "bg-red-500/15 text-red-600 dark:text-red-400",
  CANCELLED: "bg-muted text-muted-foreground",
  REFUNDED: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
};

export default function PaymentStatusBadge({
  status,
}: {
  status: PaymentStatus;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        statusStyles[status],
      )}
    >
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
}
