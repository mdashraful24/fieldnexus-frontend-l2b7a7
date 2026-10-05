import type { UserRole } from "@/types/user.type";

export const DEFAULT_DASHBOARD_PATH = "/customer";

export const roleDashboardMap: Record<UserRole, string> = {
  SUPER_ADMIN: "/admin",
  ADMIN: "/admin",
  TECHNICIAN: "/technician",
  CUSTOMER: "/customer",
};

export function getDashboardPath(role?: string | null): string {
  if (!role) return DEFAULT_DASHBOARD_PATH;
  return roleDashboardMap[role as UserRole] ?? DEFAULT_DASHBOARD_PATH;
}
