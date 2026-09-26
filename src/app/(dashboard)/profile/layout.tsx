"use client";

import type { ReactNode } from "react";
import RoleGuard from "@/components/auth/role-guard";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import { useGetMe } from "@/hooks";
import type { UserRole } from "@/types/user.type";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  const { data } = useGetMe();
  const role = (data?.data?.role as UserRole) ?? "CUSTOMER";

  return (
    <RoleGuard roles={["SUPER_ADMIN", "ADMIN", "TECHNICIAN", "CUSTOMER"]}>
      <DashboardShell userRole={role}>{children}</DashboardShell>
    </RoleGuard>
  );
}
