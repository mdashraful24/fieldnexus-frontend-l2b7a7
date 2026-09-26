import { cn } from "cn";
import type { WorkOrderPriority } from "@/types";

const priorityStyles: Record<WorkOrderPriority, string> = {
  LOW: "bg-muted text-muted-foreground",
  MEDIUM: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  HIGH: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  URGENT: "bg-destructive/10 text-destructive",
};

export default function WorkOrderPriorityBadge({
  priority,
}: {
  priority: WorkOrderPriority;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        priorityStyles[priority],
      )}
    >
      {priority.charAt(0) + priority.slice(1).toLowerCase()}
    </span>
  );
}
