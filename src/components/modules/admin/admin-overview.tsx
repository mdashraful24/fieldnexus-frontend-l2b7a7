"use client";

import {
  Activity,
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardList,
  Gauge,
  ScrollText,
  TrendingUp,
  UserRound,
  Users,
  Wallet,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartEmpty,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
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

const workOrderStatusColors: Record<WorkOrderStatus, string> = {
  PENDING: "var(--color-amber-500)",
  APPROVED: "var(--color-blue-500)",
  ASSIGNED: "var(--color-chart-2)",
  ACCEPTED: "var(--color-violet-500)",
  EN_ROUTE: "var(--color-cyan-500)",
  IN_PROGRESS: "var(--color-chart-1)",
  COMPLETED: "var(--color-emerald-500)",
  CANCELLED: "var(--color-muted-foreground)",
  REASSIGNED: "var(--color-orange-500)",
  FAILED: "var(--color-destructive)",
};

const vendorStatusOrder: VendorStatus[] = ["APPROVED", "PENDING", "SUSPENDED"];

const vendorStatusColors: Record<VendorStatus, string> = {
  APPROVED: "var(--color-emerald-500)",
  PENDING: "var(--color-amber-500)",
  SUSPENDED: "var(--color-destructive)",
};

const applicationStatusOrder = ["PENDING", "APPROVED", "REJECTED"] as const;

const applicationStatusColors: Record<
  (typeof applicationStatusOrder)[number],
  string
> = {
  PENDING: "var(--color-amber-500)",
  APPROVED: "var(--color-emerald-500)",
  REJECTED: "var(--color-destructive)",
};

const workOrderChartConfig = {
  count: { label: "Work orders", color: "var(--color-chart-1)" },
  ...Object.fromEntries(
    workOrderStatusOrder.map((status) => [
      status,
      { label: toLabel(status), color: workOrderStatusColors[status] },
    ]),
  ),
} satisfies ChartConfig;

const vendorChartConfig = {
  value: { label: "Vendors" },
  ...Object.fromEntries(
    vendorStatusOrder.map((status) => [
      status,
      { label: toLabel(status), color: vendorStatusColors[status] },
    ]),
  ),
} satisfies ChartConfig;

const applicationChartConfig = {
  value: { label: "Applications" },
  ...Object.fromEntries(
    applicationStatusOrder.map((status) => [
      status,
      { label: toLabel(status), color: applicationStatusColors[status] },
    ]),
  ),
} satisfies ChartConfig;

export function formatCurrency(value?: number) {
  return `৳${(value ?? 0).toLocaleString(undefined, {
    maximumFractionDigits: 2,
  })}`;
}

function toLabel(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

function percent(part: number, total: number) {
  if (!total) return 0;
  return Math.round((part / total) * 100);
}

function KpiCard({
  label,
  value,
  hint,
  icon,
  accent,
  footer,
  to,
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon: ReactNode;
  accent: string;
  footer?: ReactNode;
  to?: string;
}) {
  const body = (
    <>
      <div className="flex items-start justify-between gap-3">
        <span
          className="grid size-10 shrink-0 place-items-center rounded-xl"
          style={{
            backgroundColor: `color-mix(in oklab, ${accent} 14%, transparent)`,
            color: accent,
          }}
        >
          {icon}
        </span>
        {to ? (
          <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
        ) : null}
      </div>

      <div className="mt-4">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-heading text-3xl font-semibold tracking-tight tabular-nums">
          {value}
        </p>
        {hint ? (
          <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>
        ) : null}
      </div>

      {footer ? <div className="mt-4">{footer}</div> : null}
    </>
  );

  const className =
    "group flex flex-col rounded-xl bg-card p-5 ring-1 ring-foreground/10 transition-colors";

  if (!to) {
    return <div className={className}>{body}</div>;
  }

  return (
    <Link href={to} className={className}>
      {body}
    </Link>
  );
}

function Meter({
  value,
  tone = "var(--color-primary)",
}: {
  value: number;
  tone?: string;
}) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
      <div
        className="h-full rounded-full transition-[width]"
        style={{
          width: `${Math.min(Math.max(value, 0), 100)}%`,
          backgroundColor: tone,
        }}
      />
    </div>
  );
}

function SlaRing({ rate }: { rate: number }) {
  const clamped = Math.min(Math.max(rate, 0), 100);
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;

  const tone =
    clamped >= 80
      ? "var(--color-emerald-500)"
      : clamped >= 50
        ? "var(--color-amber-500)"
        : "var(--color-destructive)";

  const label =
    clamped >= 80 ? "Healthy" : clamped >= 50 ? "Monitor" : "At risk";

  return (
    <div className="flex items-center gap-4">
      <div className="relative size-28 shrink-0">
        <svg
          viewBox="0 0 100 100"
          role="img"
          aria-label={`SLA compliance ${clamped}%`}
          className="size-full -rotate-90"
        >
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            strokeWidth="10"
            className="stroke-muted"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={tone}
            strokeLinecap="round"
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <span className="font-heading text-xl font-semibold tabular-nums">
            {clamped}%
          </span>
        </div>
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium">SLA compliance</p>
        <p className="text-xs text-muted-foreground">
          Share of completed orders delivered within SLA.
        </p>
        <p
          className="mt-2 inline-flex rounded-full px-2 py-0.5 text-xs font-semibold"
          style={{
            backgroundColor: `color-mix(in oklab, ${tone} 14%, transparent)`,
            color: tone,
          }}
        >
          {label}
        </p>
      </div>
    </div>
  );
}

function LegendList({
  items,
  total,
}: {
  items: { label: string; count: number; color: string }[];
  total: number;
}) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item.label} className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between gap-2 text-sm">
            <span className="flex items-center gap-2">
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              {item.label}
            </span>
            <span className="font-medium tabular-nums">
              {item.count}
              <span className="ml-1 text-xs font-normal text-muted-foreground">
                {percent(item.count, total)}%
              </span>
            </span>
          </div>
          <Meter value={percent(item.count, total)} tone={item.color} />
        </li>
      ))}
    </ul>
  );
}

export default function AdminOverview() {
  const { data } = useSuspenseGetDashboardStats();

  const stats = data?.data;

  const totalWorkOrders = stats?.totalWorkOrders ?? 0;
  const completedWorkOrders = stats?.completedWorkOrders ?? 0;
  const totalVendors = stats?.totalVendors ?? 0;
  const totalApplications = stats?.totalTechnicianApplications ?? 0;
  const totalUsers = stats?.totalUsers ?? 0;

  const workOrderData = workOrderStatusOrder.map((status) => ({
    status: toLabel(status),
    key: status,
    fill: workOrderStatusColors[status],
    count: stats?.workOrdersByStatus?.[status] ?? 0,
  }));

  const vendorData = vendorStatusOrder.map((status) => ({
    status: toLabel(status),
    key: status,
    fill: vendorStatusColors[status],
    value: stats?.vendorsByStatus?.[status] ?? 0,
  }));

  const applicationData = applicationStatusOrder.map((status) => ({
    status: toLabel(status),
    key: status,
    fill: applicationStatusColors[status],
    value: stats?.technicianApplications?.[status] ?? 0,
  }));

  const peopleData = [
    {
      label: "Customers",
      count: stats?.totalCustomers ?? 0,
      color: "var(--color-chart-1)",
      icon: <UserRound size={14} />,
    },
    {
      label: "Technicians",
      count: stats?.totalTechnicians ?? 0,
      color: "var(--color-chart-2)",
      icon: <Wrench size={14} />,
    },
    {
      label: "Admins",
      count: stats?.totalAdmins ?? 0,
      color: "var(--color-violet-500)",
      icon: <Users size={14} />,
    },
    {
      label: "Vendors",
      count: totalVendors,
      color: "var(--color-emerald-500)",
      icon: <Building2 size={14} />,
    },
  ];

  const shortcuts = [
    {
      label: "Technician Applications",
      description: `${stats?.technicianApplications?.PENDING ?? 0} awaiting review`,
      to: "/admin/approve-technician",
      icon: <ClipboardList size={16} />,
      tone:
        (stats?.technicianApplications?.PENDING ?? 0) > 0
          ? "var(--color-amber-500)"
          : "var(--color-muted-foreground)",
    },
    {
      label: "Users",
      description: `${totalUsers} registered accounts`,
      to: "/admin/users",
      icon: <Users size={16} />,
      tone: "var(--color-chart-1)",
    },
    {
      label: "Vendors",
      description: `${stats?.vendorsByStatus?.PENDING ?? 0} pending approval`,
      to: "/admin/vendors",
      icon: <Building2 size={16} />,
      tone:
        (stats?.vendorsByStatus?.PENDING ?? 0) > 0
          ? "var(--color-amber-500)"
          : "var(--color-muted-foreground)",
    },
    {
      label: "Audit Logs",
      description: "Review admin activity",
      to: "/admin/audit-logs",
      icon: <ScrollText size={16} />,
      tone: "var(--color-violet-500)",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Total Revenue"
          value={formatCurrency(stats?.totalRevenue)}
          hint={`${formatCurrency(stats?.totalRefunds)} refunded`}
          icon={<Wallet className="size-5" />}
          accent="var(--color-emerald-500)"
          footer={
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <TrendingUp className="size-3.5 text-emerald-500" />
              Gross collected across all work orders
            </div>
          }
        />

        <KpiCard
          label="Work Orders"
          value={totalWorkOrders}
          hint={`${completedWorkOrders} completed`}
          icon={<ClipboardList className="size-5" />}
          accent="var(--color-chart-1)"
          footer={
            <div className="flex flex-col gap-1.5">
              <Meter value={percent(completedWorkOrders, totalWorkOrders)} />
              <span className="text-xs text-muted-foreground">
                {percent(completedWorkOrders, totalWorkOrders)}% completion rate
              </span>
            </div>
          }
        />

        <KpiCard
          label="SLA Compliance"
          value={`${stats?.slaComplianceRate ?? 0}%`}
          hint={
            (stats?.slaComplianceRate ?? 0) >= 80
              ? "Healthy"
              : (stats?.slaComplianceRate ?? 0) >= 50
                ? "Needs attention"
                : "Critical"
          }
          icon={<Gauge className="size-5" />}
          accent="var(--color-amber-500)"
          footer={
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Activity className="size-3.5 text-amber-500" />
              Across completed orders
            </div>
          }
        />

        <KpiCard
          label="Total Users"
          value={totalUsers}
          hint={`${stats?.activeTechnicians ?? 0} technicians active`}
          icon={<Users className="size-5" />}
          accent="var(--color-violet-500)"
          to="/admin/users"
          footer={
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="size-3.5 text-violet-500" />
              Customers, technicians, and admins
            </div>
          }
        />
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Work Orders by Status</CardTitle>
            <CardDescription>
              {totalWorkOrders} total orders across every stage of the
              lifecycle.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {totalWorkOrders === 0 ? (
              <ChartEmpty message="No work orders recorded yet." />
            ) : (
              <ChartContainer
                config={workOrderChartConfig}
                className="h-72 w-full"
              >
                <BarChart
                  data={workOrderData}
                  layout="vertical"
                  margin={{ left: 8, right: 16 }}
                >
                  <CartesianGrid horizontal={false} />
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="status"
                    width={92}
                    tickLine={false}
                    axisLine={false}
                  />
                  <ChartTooltip
                    cursor={{ fill: "var(--color-muted)" }}
                    content={<ChartTooltipContent nameKey="key" />}
                  />
                  <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={18}>
                    {workOrderData.map((entry) => (
                      <Cell
                        key={entry.key}
                        fill={workOrderStatusColors[entry.key]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Vendors by Status</CardTitle>
              <CardDescription>
                {totalVendors} vendors onboarded.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {totalVendors === 0 ? (
                <ChartEmpty message="No vendors onboarded yet." />
              ) : (
                <>
                  <ChartContainer
                    config={vendorChartConfig}
                    className="mx-auto h-40 w-full"
                  >
                    <PieChart>
                      <ChartTooltip
                        content={<ChartTooltipContent nameKey="key" />}
                      />
                      <Pie
                        data={vendorData}
                        dataKey="value"
                        nameKey="status"
                        innerRadius={44}
                        outerRadius={72}
                        paddingAngle={3}
                        strokeWidth={0}
                      >
                        {vendorData.map((entry) => (
                          <Cell
                            key={entry.key}
                            fill={vendorStatusColors[entry.key]}
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ChartContainer>
                  <div className="mt-2">
                    <LegendList
                      items={vendorData.map((entry) => ({
                        label: entry.status,
                        count: entry.value,
                        color: vendorStatusColors[entry.key],
                      }))}
                      total={totalVendors}
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Technician Applications
              </CardTitle>
              <CardDescription>
                {totalApplications} applications received.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {totalApplications === 0 ? (
                <ChartEmpty message="No applications submitted yet." />
              ) : (
                <>
                  <ChartContainer
                    config={applicationChartConfig}
                    className="mx-auto h-40 w-full"
                  >
                    <PieChart>
                      <ChartTooltip
                        content={<ChartTooltipContent nameKey="key" />}
                      />
                      <Pie
                        data={applicationData}
                        dataKey="value"
                        nameKey="status"
                        innerRadius={44}
                        outerRadius={72}
                        paddingAngle={3}
                        strokeWidth={0}
                      >
                        {applicationData.map((entry) => (
                          <Cell
                            key={entry.key}
                            fill={applicationStatusColors[entry.key]}
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ChartContainer>
                  <div className="mt-2">
                    <LegendList
                      items={applicationData.map((entry) => ({
                        label: entry.status,
                        count: entry.value,
                        color: applicationStatusColors[entry.key],
                      }))}
                      total={totalApplications}
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">People</CardTitle>
            <CardDescription>Accounts by role.</CardDescription>
          </CardHeader>
          <CardContent>
            <LegendList
              items={peopleData.map((person) => ({
                label: person.label,
                count: person.count,
                color: person.color,
              }))}
              total={totalUsers}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Service Health</CardTitle>
            <CardDescription>
              Delivery quality against completed orders.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <SlaRing rate={stats?.slaComplianceRate ?? 0} />
            <div className="grid gap-3 border-t pt-4 sm:grid-cols-2">
              <div>
                <p className="text-xs text-muted-foreground">Completed</p>
                <p className="font-heading text-xl font-semibold tabular-nums">
                  {completedWorkOrders}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">In flight</p>
                <p className="font-heading text-xl font-semibold tabular-nums">
                  {Math.max(totalWorkOrders - completedWorkOrders, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick Actions</CardTitle>
            <CardDescription>
              Jump straight into common admin tasks.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-2">
              {shortcuts.map((shortcut) => (
                <li key={shortcut.to}>
                  <Link
                    href={shortcut.to}
                    className="group flex items-center gap-3 rounded-lg bg-muted/50 p-3 transition-colors hover:bg-muted"
                  >
                    <span
                      className="grid size-8 shrink-0 place-items-center rounded-lg"
                      style={{
                        backgroundColor: `color-mix(in oklab, ${shortcut.tone} 14%, transparent)`,
                        color: shortcut.tone,
                      }}
                    >
                      {shortcut.icon}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">
                        {shortcut.label}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {shortcut.description}
                      </span>
                    </span>
                    <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
