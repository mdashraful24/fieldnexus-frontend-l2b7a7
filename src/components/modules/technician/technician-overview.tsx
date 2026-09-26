"use client";

import {
  CheckCircle2,
  ClipboardList,
  MapPin,
  Phone,
  Timer,
  Wrench,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetMyAssignedWorkOrders } from "@/hooks";
import type { IWorkOrder } from "@/types";
import TechnicianAssignmentActions from "./technician-assignment-actions";
import WorkOrderPriorityBadge from "../work-order/work-order-priority-badge";
import WorkOrderStatusBadge from "../work-order/work-order-status-badge";

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number | string;
  icon: typeof ClipboardList;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border bg-card p-4">
      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="size-5" />
      </span>
      <div className="min-w-0">
        <p className="font-heading text-xl font-semibold">{value}</p>
        <p className="truncate text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

function AssignmentCard({ workOrder }: { workOrder: IWorkOrder }) {
  return (
    <li className="flex flex-col gap-3 rounded-xl border bg-card p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate font-medium">{workOrder.title}</p>
          <p className="text-xs text-muted-foreground">
            {workOrder.workOrderNumber}
            {workOrder.category ? ` · ${workOrder.category.name}` : ""}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <WorkOrderPriorityBadge priority={workOrder.priority} />
          <WorkOrderStatusBadge status={workOrder.status} />
        </div>
      </div>

      {workOrder.description && (
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {workOrder.description}
        </p>
      )}

      <dl className="grid gap-2 text-sm sm:grid-cols-2">
        {workOrder.customer && (
          <>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Wrench className="size-4 shrink-0" />
              <span className="truncate">{workOrder.customer.name}</span>
            </div>
            {workOrder.customer.contactNumber && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="size-4 shrink-0" />
                <span className="truncate">
                  {workOrder.customer.contactNumber}
                </span>
              </div>
            )}
            {workOrder.customer.address && (
              <div className="flex items-center gap-2 text-muted-foreground sm:col-span-2">
                <MapPin className="size-4 shrink-0" />
                <span className="truncate">{workOrder.customer.address}</span>
              </div>
            )}
          </>
        )}
        {workOrder.scheduledAt && (
          <div className="flex items-center gap-2 text-muted-foreground sm:col-span-2">
            <Timer className="size-4 shrink-0" />
            <span>Scheduled {new Date(workOrder.scheduledAt).toLocaleString()}</span>
          </div>
        )}
      </dl>

      <TechnicianAssignmentActions workOrder={workOrder} />
    </li>
  );
}

export function TechnicianAssignmentsLoading() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static placeholder tiles
        <Skeleton key={index} className="h-20 rounded-xl" />
      ))}
    </div>
  );
}

export default function TechnicianOverview() {
  const { data, isPending, isError } = useGetMyAssignedWorkOrders();

  const workOrders = data?.data ?? [];

  const pendingCount = workOrders.filter((order) => order.status === "ASSIGNED")
    .length;
  const activeCount = workOrders.filter((order) =>
    ["ACCEPTED", "EN_ROUTE", "IN_PROGRESS"].includes(order.status),
  ).length;

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

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Active jobs"
          value={workOrders.length}
          icon={ClipboardList}
        />
        <StatCard
          label="Awaiting your response"
          value={pendingCount}
          icon={Timer}
        />
        <StatCard
          label="In progress"
          value={activeCount}
          icon={CheckCircle2}
        />
      </div>

      {workOrders.length === 0 ? (
        <p className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
          You have no active assignments right now. New jobs will show up here
          as soon as an admin assigns them to you.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {workOrders.map((workOrder) => (
            <AssignmentCard key={workOrder.id} workOrder={workOrder} />
          ))}
        </ul>
      )}
    </div>
  );
}
