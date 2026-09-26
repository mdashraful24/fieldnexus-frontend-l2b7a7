import { cn } from "cn";
import type { VendorStatus } from "@/types";

const statusStyles: Record<VendorStatus, string> = {
  PENDING: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  APPROVED: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  SUSPENDED: "bg-destructive/10 text-destructive",
};

export default function VendorStatusBadge({
  status,
}: {
  status: VendorStatus;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        statusStyles[status],
      )}
    >
      {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
    </span>
  );
}
