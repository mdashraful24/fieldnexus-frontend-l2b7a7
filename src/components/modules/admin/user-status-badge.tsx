import { cn } from "cn";
import type { UserStatus } from "@/types";

const statusStyles: Record<UserStatus, string> = {
  ACTIVE: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  BLOCKED: "bg-destructive/10 text-destructive",
  DELETED: "bg-red-500/15 text-red-600 dark:text-red-400",
};

export default function UserStatusBadge({ status }: { status: UserStatus }) {
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
