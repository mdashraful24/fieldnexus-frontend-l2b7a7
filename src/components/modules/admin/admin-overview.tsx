"use client";

import {
  Building2,
  CheckCircle2,
  ClipboardList,
  Clock,
  FileText,
  Gauge,
  ShieldCheck,
  TrendingUp,
  UserRound,
  Users,
  Wallet,
  Wrench,
} from "lucide-react";
import type { ReactNode } from "react";
import { useSuspenseGetDashboardStats } from "@/hooks";
import type { VendorStatus, WorkOrderStatus } from "@/types";

const workOrderStatusOrder: WorkOrderStatus[] = [
  "PENDING",
  "APPROVED",
  "ASSIGNED",
  "ACCEPTED",
  "EN_ROUTE",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
  "REASSIGNED",
  "FAILED",
];

const vendorStatusOrder: VendorStatus[] = ["PENDING", "APPROVED", "SUSPENDED"];

export function formatCurrency(value?: number) {
  return `৳${(value ?? 0).toLocaleString(undefined, {
    maximumFractionDigits: 2,
  })}`;
}

function StatCard({
  label,
  value,
  hint,
  icon,
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon: ReactNode;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border bg-card p-4">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="truncate text-sm text-muted-foreground">{label}</p>
        <p className="truncate font-heading text-2xl font-semibold tracking-tight">
          {value}
        </p>
        {hint ? (
          <p className="truncate text-xs text-muted-foreground">{hint}</p>
        ) : null}
      </div>
    </div>
  );
}

function StatBreakdown({
  title,
  total,
  items,
}: {
  title: string;
  total: number;
  items: { label: string; count: number; color?: string }[];
}) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="font-heading text-sm font-medium">{title}</h3>
        <span className="text-sm text-muted-foreground">{total} total</span>
      </div>
      <div className="mt-4 space-y-3">
        {items.map((item) => {
          const percentage =
            total > 0 ? Math.round((item.count / total) * 100) : 0;

          return (
            <div key={item.label}>
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="flex items-center gap-1.5">
                  {item.color ? <span className={item.color}>•</span> : null}
                  {item.label}
                </span>
                <span className="font-medium">{item.count}</span>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary/70"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">No data available.</p>
        ) : null}
      </div>
    </div>
  );
}

export default function AdminOverview() {
  const { data } = useSuspenseGetDashboardStats();

  const stats = data?.data;

  const workOrderItems = stats?.workOrdersByStatus
    ? workOrderStatusOrder.map((status) => ({
        label: status.charAt(0).toUpperCase() + status.slice(1).toLowerCase(),
        count: stats.workOrdersByStatus[status] ?? 0,
      }))
    : [];

  const vendorItems = stats?.vendorsByStatus
    ? vendorStatusOrder.map((status) => ({
        label: status.charAt(0).toUpperCase() + status.slice(1).toLowerCase(),
        count: stats.vendorsByStatus[status] ?? 0,
        color:
          status === "APPROVED"
            ? "text-emerald-500"
            : status === "SUSPENDED"
              ? "text-destructive"
              : "text-amber-500",
      }))
    : [];

  const applicationItems = stats
    ? (["PENDING", "APPROVED", "REJECTED"] as const).map((status) => ({
        label: status.charAt(0).toUpperCase() + status.slice(1).toLowerCase(),
        count: stats.technicianApplications[status] ?? 0,
      }))
    : [];

  const slaRate = stats?.slaComplianceRate ?? 0;
  const slaLabel =
    slaRate >= 80 ? "Good" : slaRate >= 50 ? "Needs attention" : "Critical";

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          label="Total Revenue"
          value={formatCurrency(stats?.totalRevenue)}
          hint={`${formatCurrency(stats?.totalRefunds)} refunded`}
          icon={<Wallet className="size-5" />}
        />
        <StatCard
          label="Total Work Orders"
          value={stats?.totalWorkOrders ?? 0}
          hint={`${stats?.completedWorkOrders ?? 0} completed`}
          icon={<ClipboardList className="size-5" />}
        />
        <StatCard
          label="SLA Compliance"
          value={`${slaRate}%`}
          hint={slaLabel}
          icon={<Gauge className="size-5" />}
        />
        <StatCard
          label="Total Users"
          value={stats?.totalUsers ?? 0}
          hint="Customers + Technicians"
          icon={<Users className="size-5" />}
        />
        <StatCard
          label="Customers"
          value={stats?.totalCustomers ?? 0}
          icon={<UserRound className="size-5" />}
        />
        <StatCard
          label="Technicians"
          value={stats?.totalTechnicians ?? 0}
          hint={`${stats?.activeTechnicians ?? 0} active profiles`}
          icon={<Wrench className="size-5" />}
        />
        <StatCard
          label="Admins"
          value={stats?.totalAdmins ?? 0}
          icon={<ShieldCheck className="size-5" />}
        />
        <StatCard
          label="Vendors"
          value={stats?.totalVendors ?? 0}
          icon={<Building2 className="size-5" />}
        />
        <StatCard
          label="Technician Applications"
          value={stats?.totalTechnicianApplications ?? 0}
          icon={<FileText className="size-5" />}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <StatBreakdown
          title="Work Orders by Status"
          total={stats?.totalWorkOrders ?? 0}
          items={workOrderItems}
        />
        <StatBreakdown
          title="Vendors by Status"
          total={stats?.totalVendors ?? 0}
          items={vendorItems}
        />
        <StatBreakdown
          title="Technician Applications"
          total={stats?.totalTechnicianApplications ?? 0}
          items={applicationItems}
        />
      </div>

      <div className="rounded-xl border bg-card p-4">
        <h3 className="font-heading text-sm font-medium">Highlights</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
            <TrendingUp className="size-4 text-primary" />
            <div>
              <p className="text-sm font-medium">
                {stats?.completedWorkOrders ?? 0} completed orders
              </p>
              <p className="text-xs text-muted-foreground">
                Out of {stats?.totalWorkOrders ?? 0} total
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
            <CheckCircle2 className="size-4 text-emerald-500" />
            <div>
              <p className="text-sm font-medium">
                {stats?.slaComplianceRate ?? 0}% SLA compliance
              </p>
              <p className="text-xs text-muted-foreground">
                Across completed orders
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
            <Clock className="size-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">
                {stats?.totalWorkOrders ?? 0} work orders
              </p>
              <p className="text-xs text-muted-foreground">
                {stats?.totalRefunds ?? 0} refunds issued
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
