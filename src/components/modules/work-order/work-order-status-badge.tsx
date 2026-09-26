import { cn } from "cn";
import type { WorkOrderStatus } from "@/types";

const statusStyles: Record<WorkOrderStatus, string> = {
  PENDING: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  APPROVED: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  ASSIGNED: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  ACCEPTED: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  EN_ROUTE: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
  IN_PROGRESS: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  COMPLETED: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  CANCELLED: "bg-destructive/10 text-destructive",
  REASSIGNED: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  FAILED: "bg-red-500/15 text-red-600 dark:text-red-400",
};

export default function WorkOrderStatusBadge({
  status,
}: {
  status: WorkOrderStatus;
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
