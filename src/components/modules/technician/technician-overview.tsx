"use client";

import {
  AlertTriangle,
  ArrowRight,
  Banknote,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  Flame,
  Mail,
  MapPin,
  Phone,
  Timer,
  UserCog,
  UserRound,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Cell, Pie, PieChart } from "recharts";
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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetMyAssignedWorkOrders } from "@/hooks";
import type { IWorkOrder, WorkOrderPriority, WorkOrderStatus } from "@/types";
import WorkOrderPriorityBadge from "../work-order/work-order-priority-badge";
import WorkOrderStatusBadge from "../work-order/work-order-status-badge";
import TechnicianAssignmentActions from "./technician-assignment-actions";

const statusOrder: WorkOrderStatus[] = [
  "ASSIGNED",
  "ACCEPTED",
  "EN_ROUTE",
  "IN_PROGRESS",
  "COMPLETED",
];

const statusColors: Record<string, string> = {
  ASSIGNED: "var(--color-indigo-500)",
  ACCEPTED: "var(--color-violet-500)",
  EN_ROUTE: "var(--color-cyan-500)",
  IN_PROGRESS: "var(--color-blue-500)",
  COMPLETED: "var(--color-emerald-500)",
  CANCELLED: "var(--color-destructive)",
  REASSIGNED: "var(--color-orange-500)",
  FAILED: "var(--color-red-500)",
  PENDING: "var(--color-amber-500)",
  APPROVED: "var(--color-sky-500)",
};

const priorityOrder: WorkOrderPriority[] = ["URGENT", "HIGH", "MEDIUM", "LOW"];

const priorityColors: Record<WorkOrderPriority, string> = {
  URGENT: "var(--color-destructive)",
  HIGH: "var(--color-amber-500)",
  MEDIUM: "var(--color-sky-500)",
  LOW: "var(--color-muted-foreground)",
};

const statusChartConfig = {
  value: { label: "Jobs" },
  ...Object.fromEntries(
    statusOrder.map((status) => [
      status,
      { label: toLabel(status), color: statusColors[status] },
    ]),
  ),
} satisfies ChartConfig;

const priorityChartConfig = {
  value: { label: "Jobs" },
  ...Object.fromEntries(
    priorityOrder.map((priority) => [
      priority,
      { label: toLabel(priority), color: priorityColors[priority] },
    ]),
  ),
} satisfies ChartConfig;

function toLabel(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

function percent(part: number, total: number) {
  if (!total) return 0;
  return Math.round((part / total) * 100);
}

function getSlaInfo(workOrder: IWorkOrder) {
  if (!workOrder.slaDeadline) return null;

  const remainingMs = new Date(workOrder.slaDeadline).getTime() - Date.now();
  const hours = Math.floor(Math.abs(remainingMs) / 3_600_000);

  if (remainingMs <= 0) {
    return {
      label: `Overdue by ${hours}h`,
      tone: "var(--color-destructive)",
      overdue: true,
    };
  }

  return {
    label: `${hours}h left`,
    tone:
      remainingMs <= 24 * 3_600_000
        ? "var(--color-amber-500)"
        : "var(--color-emerald-500)",
    overdue: false,
  };
}

function KpiCard({
  label,
  value,
  hint,
  icon,
  accent,
  to,
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon: ReactNode;
  accent: string;
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

function Meter({ value, tone }: { value: number; tone: string }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
      <div
        className="h-full rounded-full"
        style={{
          width: `${Math.min(Math.max(value, 0), 100)}%`,
          backgroundColor: tone,
        }}
      />
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

function AssignmentCard({ workOrder }: { workOrder: IWorkOrder }) {
  const sla = getSlaInfo(workOrder);
  const accent = statusColors[workOrder.status] ?? "var(--color-primary)";
  const isAwaiting =
    workOrder.workAssignments?.some((item) => item.status === "PENDING") ??
    workOrder.status === "ASSIGNED";

  return (
    <li className="relative flex flex-col gap-3 rounded-xl bg-card p-4 pl-5 ring-1 ring-foreground/10">
      <span
        aria-hidden
        className="absolute inset-y-3 left-0 w-1 rounded-full"
        style={{ backgroundColor: accent }}
      />

      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="truncate font-medium">{workOrder.title}</p>
            {workOrder.category ? (
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                <Wrench size="11" />
                {workOrder.category.name}
              </span>
            ) : null}
          </div>
          <p className="text-xs text-muted-foreground">
            {workOrder.workOrderNumber}
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {sla ? (
            <span
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold"
              style={{
                backgroundColor: `color-mix(in oklab, ${sla.tone} 14%, transparent)`,
                color: sla.tone,
              }}
            >
              <Timer size="12" />
              {sla.label}
            </span>
          ) : null}
          <WorkOrderPriorityBadge priority={workOrder.priority} />
          <WorkOrderStatusBadge status={workOrder.status} />
        </div>
      </div>

      {workOrder.description ? (
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {workOrder.description}
        </p>
      ) : null}

      <dl className="grid gap-2 text-sm sm:grid-cols-2">
        {workOrder.customer ? (
          <>
            <div className="flex items-center gap-2 text-muted-foreground">
              <UserRound className="size-4 shrink-0" />
              <span className="truncate">{workOrder.customer.name}</span>
            </div>
            {workOrder.customer.contactNumber ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="size-4 shrink-0" />
                <a
                  href={`tel:${workOrder.customer.contactNumber}`}
                  className="truncate underline-offset-4 hover:underline hover:text-foreground"
                >
                  {workOrder.customer.contactNumber}
                </a>
              </div>
            ) : null}
            {workOrder.customer.email ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="size-4 shrink-0" />
                <span className="truncate">{workOrder.customer.email}</span>
              </div>
            ) : null}
            {workOrder.customer.address ? (
              <div className="flex items-center gap-2 text-muted-foreground sm:col-span-2">
                <MapPin className="size-4 shrink-0" />
                <span className="truncate">{workOrder.customer.address}</span>
              </div>
            ) : null}
          </>
        ) : null}
        {workOrder.scheduledAt ? (
          <div className="flex items-center gap-2 text-muted-foreground sm:col-span-2">
            <CalendarClock className="size-4 shrink-0" />
            <span>
              Scheduled {new Date(workOrder.scheduledAt).toLocaleString()}
            </span>
          </div>
        ) : null}
      </dl>

      {isAwaiting ? (
        <div className="rounded-lg bg-muted/50 p-3">
          <p className="mb-2 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <AlertTriangle size="12" className="text-amber-500" />
            This job needs your response
          </p>
          <TechnicianAssignmentActions workOrder={workOrder} />
        </div>
      ) : null}
    </li>
  );
}

function AssignmentGroup({
  title,
  description,
  orders,
}: {
  title: string;
  description: string;
  orders: IWorkOrder[];
}) {
  if (orders.length === 0) return null;

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-2">
        <h2 className="font-heading text-base font-semibold">{title}</h2>
        <span className="text-sm text-muted-foreground">
          {orders.length} {orders.length === 1 ? "job" : "jobs"}
        </span>
      </div>
      <p className="-mt-1 text-sm text-muted-foreground">{description}</p>
      <ul className="flex flex-col gap-3">
        {orders.map((workOrder) => (
          <AssignmentCard key={workOrder.id} workOrder={workOrder} />
        ))}
      </ul>
    </section>
  );
}

export function TechnicianAssignmentsLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: static placeholder tiles
            key={index}
            className="flex flex-col rounded-xl bg-card p-5 ring-1 ring-foreground/10"
          >
            <Skeleton className="size-10 rounded-xl" />
            <div className="mt-4 space-y-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-8 w-16" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: static placeholder tiles
            key={index}
            className="rounded-xl bg-card p-5 ring-1 ring-foreground/10"
          >
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-40" />
            </div>
            <Skeleton className="mt-5 h-40 w-full rounded-lg" />
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {[1, 2].map((item) => (
          <Skeleton key={item} className="h-40 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
}

export default function TechnicianOverview() {
  const { data, isPending, isError } = useGetMyAssignedWorkOrders();

  const workOrders = data?.data ?? [];
  const total = workOrders.length;

  const awaiting = workOrders.filter(
    (order) =>
      order.status === "ASSIGNED" ||
      (order.workAssignments?.some((item) => item.status === "PENDING") ??
        false),
  );

  const inProgress = workOrders.filter((order) =>
    ["ACCEPTED", "EN_ROUTE", "IN_PROGRESS"].includes(order.status),
  );

  const completed = workOrders.filter((order) => order.status === "COMPLETED");

  const urgent = workOrders.filter(
    (order) => order.priority === "URGENT" && order.status !== "COMPLETED",
  );

  const overdue = workOrders.filter((order) => getSlaInfo(order)?.overdue);

  const statusData = [
    ...statusOrder,
    ...Array.from(new Set(workOrders.map((order) => order.status))).filter(
      (status) => !statusOrder.includes(status),
    ),
  ].map((status) => ({
    status: toLabel(status),
    key: status,
    fill: statusColors[status] ?? "var(--color-muted-foreground)",
    value: workOrders.filter((order) => order.status === status).length,
  }));

  const priorityData = priorityOrder.map((priority) => ({
    status: toLabel(priority),
    key: priority,
    fill: priorityColors[priority],
    value: workOrders.filter((order) => order.priority === priority).length,
  }));

  const nextScheduled = workOrders
    .filter((order) => order.scheduledAt && order.status !== "COMPLETED")
    .map((order) => ({
      order,
      at: new Date(order.scheduledAt as string).getTime(),
    }))
    .filter(({ at }) => at >= Date.now())
    .sort((a, b) => a.at - b.at)[0];

  if (isPending) {
    return <TechnicianAssignmentsLoading />;
  }

  if (isError) {
    return (
      <p className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
        We could not load your assignments right now. Please refresh and try
        again.
      </p>
    );
  }

  const shortcuts = [
    {
      label: "Payments",
      description: "Track earnings from completed jobs",
      to: "/technician/payments",
      icon: <Banknote size={16} />,
      tone: "var(--color-emerald-500)",
    },
    {
      label: "My Profile",
      description: "Review your account details",
      to: "/profile",
      icon: <UserRound size={16} />,
      tone: "var(--color-chart-1)",
    },
    {
      label: "Edit Profile",
      description: "Update your photo and name",
      to: "/profile/edit",
      icon: <UserCog size={16} />,
      tone: "var(--color-violet-500)",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Assigned Jobs"
          value={total}
          hint={`${completed.length} completed`}
          icon={<ClipboardList className="size-5" />}
          accent="var(--color-chart-1)"
        />
        <KpiCard
          label="Awaiting Response"
          value={awaiting.length}
          hint="Accept or decline to keep moving"
          icon={<Timer className="size-5" />}
          accent="var(--color-amber-500)"
        />
        <KpiCard
          label="In Progress"
          value={inProgress.length}
          hint={`${percent(inProgress.length, total)}% of your workload`}
          icon={<CheckCircle2 className="size-5" />}
          accent="var(--color-violet-500)"
        />
        <KpiCard
          label="Urgent Jobs"
          value={urgent.length}
          hint={
            overdue.length > 0
              ? `${overdue.length} past SLA deadline`
              : "All within SLA"
          }
          icon={<Flame className="size-5" />}
          accent="var(--color-destructive)"
        />
      </section>

      {total > 0 && (
        <section className="grid gap-4 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Jobs by Status</CardTitle>
              <CardDescription>
                Where your assignments stand today.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={statusChartConfig}
                className="mx-auto h-40 w-full"
              >
                <PieChart>
                  <ChartTooltip
                    content={<ChartTooltipContent nameKey="key" />}
                  />
                  <Pie
                    data={statusData}
                    dataKey="value"
                    nameKey="status"
                    innerRadius={44}
                    outerRadius={72}
                    paddingAngle={3}
                    strokeWidth={0}
                  >
                    {statusData.map((entry) => (
                      <Cell key={entry.key} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
              <div className="mt-2">
                <LegendList
                  items={statusData
                    .filter((entry) => entry.value > 0)
                    .map((entry) => ({
                      label: entry.status,
                      count: entry.value,
                      color: entry.fill,
                    }))}
                  total={total}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Priority Mix</CardTitle>
              <CardDescription>
                How your assigned jobs are weighted.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={priorityChartConfig}
                className="mx-auto h-40 w-full"
              >
                <PieChart>
                  <ChartTooltip
                    content={<ChartTooltipContent nameKey="key" />}
                  />
                  <Pie
                    data={priorityData}
                    dataKey="value"
                    nameKey="status"
                    innerRadius={44}
                    outerRadius={72}
                    paddingAngle={3}
                    strokeWidth={0}
                  >
                    {priorityData.map((entry) => (
                      <Cell key={entry.key} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
              <div className="mt-2">
                <LegendList
                  items={priorityData.map((entry) => ({
                    label: entry.status,
                    count: entry.value,
                    color: entry.fill,
                  }))}
                  total={total}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Your Schedule</CardTitle>
                <CardDescription>
                  Next visit and deadline health for this week.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="rounded-lg bg-muted/50 p-3">
                  <p className="text-xs text-muted-foreground">
                    Next scheduled job
                  </p>
                  {nextScheduled ? (
                    <>
                      <p className="mt-0.5 truncate font-medium">
                        {nextScheduled.order.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(
                          nextScheduled.order.scheduledAt as string,
                        ).toLocaleString()}
                      </p>
                    </>
                  ) : (
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      Nothing scheduled ahead.
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-2 text-sm">
                    <span className="text-muted-foreground">Within SLA</span>
                    <span className="font-medium tabular-nums">
                      {total - overdue.length}/{total}
                    </span>
                  </div>
                  <Meter
                    value={percent(total - overdue.length, total)}
                    tone={
                      overdue.length > 0
                        ? "var(--color-amber-500)"
                        : "var(--color-emerald-500)"
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Quick Actions</CardTitle>
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
          </div>
        </section>
      )}

      {total === 0 ? (
        <p className="rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">
          You have no active assignments right now. New jobs will show up here
          as soon as an admin assigns them to you.
        </p>
      ) : (
        <div className="flex flex-col gap-6">
          <AssignmentGroup
            title="Needs your response"
            description="Accept or decline these assignments so admins can plan ahead."
            orders={awaiting}
          />
          <AssignmentGroup
            title="Active jobs"
            description="Jobs you have accepted and are currently working on."
            orders={inProgress}
          />
          {completed.length > 0 ? (
            <AssignmentGroup
              title="Completed"
              description="Jobs you have finished successfully."
              orders={completed}
            />
          ) : null}
        </div>
      )}
    </div>
  );
}
