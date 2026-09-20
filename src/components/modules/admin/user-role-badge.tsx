import { cn } from "cn";
import type { UserRole } from "@/types";

const roleStyles: Record<UserRole, string> = {
  SUPER_ADMIN: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  ADMIN: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  TECHNICIAN: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  CUSTOMER: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
};

const roleLabels: Record<UserRole, string> = {
  SUPER_ADMIN: "Super Admin",
  ADMIN: "Admin",
  TECHNICIAN: "Technician",
  CUSTOMER: "Customer",
};

export default function UserRoleBadge({ role }: { role: UserRole }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        roleStyles[role],
      )}
    >
      {roleLabels[role]}
    </span>
  );
}
