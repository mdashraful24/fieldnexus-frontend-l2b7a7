"use client";

import { Calendar, ChevronRight, Clock3, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { type ChangeEvent, useState } from "react";
import TechnicianAssignmentActions from "@/components/modules/technician/technician-assignment-actions";
import TechnicianStatusActions from "@/components/modules/technician/technician-status-actions";
import WorkOrderPriorityBadge from "@/components/modules/work-order/work-order-priority-badge";
import WorkOrderStatusBadge from "@/components/modules/work-order/work-order-status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetMyAssignedWorkOrders } from "@/hooks";
import type { IWorkOrder, WorkOrderStatus } from "@/types";

const ACTIVE_STATUSES: WorkOrderStatus[] = [
  "ASSIGNED",
  "ACCEPTED",
  "EN_ROUTE",
  "IN_PROGRESS",
];

type ListFilter = "ALL" | "ACTIVE" | "COMPLETED" | "CLOSED";

const filters: { label: string; value: ListFilter }[] = [
  { label: "All", value: "ALL" },
  { label: "Active", value: "ACTIVE" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Closed", value: "CLOSED" },
];

function formatDate(value?: string | null) {
  if (!value) return "Not scheduled";
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function matchesFilter(workOrder: IWorkOrder, filter: ListFilter) {
  if (filter === "ALL") return true;
  if (filter === "ACTIVE") return ACTIVE_STATUSES.includes(workOrder.status);
  if (filter === "COMPLETED") return workOrder.status === "COMPLETED";
  return workOrder.status === "FAILED" || workOrder.status === "CANCELLED";
}

function WorkOrderCard({ workOrder }: { workOrder: IWorkOrder }) {
  const router = useRouter();

  return (
    <li className="flex flex-col gap-3 rounded-xl border p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="truncate font-medium">{workOrder.title}</p>
            <WorkOrderStatusBadge status={workOrder.status} />
            <WorkOrderPriorityBadge priority={workOrder.priority} />
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {workOrder.workOrderNumber}
            {workOrder.category ? ` · ${workOrder.category.name}` : ""}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="h-8 shrink-0"
          onClick={() =>
            router.push(
              `/technician/work-orders/details?workOrderId=${workOrder.id}`,
            )
          }
        >
          Details
          <ChevronRight className="size-3.5" />
        </Button>
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
        {workOrder.customer && (
          <span className="truncate">
            Customer: {workOrder.customer.name}
            {workOrder.customer.contactNumber
              ? ` · ${workOrder.customer.contactNumber}`
              : ""}
          </span>
        )}
        <span className="inline-flex items-center gap-1.5">
          <Calendar className="size-3.5" />
          Created {formatDate(workOrder.createdAt)}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock3 className="size-3.5" />
          {formatDate(workOrder.scheduledAt)}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <TechnicianAssignmentActions workOrder={workOrder} />
        <TechnicianStatusActions workOrder={workOrder} />
      </div>
    </li>
  );
}

export default function TechnicianWorkOrdersList() {
  const { data, isPending, isError } = useGetMyAssignedWorkOrders();

  const [searchInput, setSearchInput] = useState("");
  const [filter, setFilter] = useState<ListFilter>("ALL");

  const workOrders = data?.data ?? [];

  const search = searchInput.trim().toLowerCase();

  const filteredWorkOrders = workOrders.filter((workOrder) => {
    if (!matchesFilter(workOrder, filter)) return false;
    if (!search) return true;

    return (
      workOrder.title.toLowerCase().includes(search) ||
      workOrder.workOrderNumber.toLowerCase().includes(search) ||
      (workOrder.customer?.name ?? "").toLowerCase().includes(search)
    );
  });

  if (isPending) {
    return (
      <div className="flex flex-col gap-3">
        {[1, 2, 3].map((item) => (
          <div key={item} className="rounded-xl border p-4">
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="mt-2 h-3 w-28" />
            <Skeleton className="mt-4 h-8 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-5 text-sm text-destructive">
        Unable to load your work orders. Please refresh and try again.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
        <div className="relative w-full max-w-xs">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by title, order number or customer"
            value={searchInput}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchInput(e.target.value)
            }
            className="h-9 rounded-lg pr-9 pl-9 shadow-sm [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-cancel-button]:hidden"
          />
          {searchInput && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setSearchInput("")}
              className="absolute top-1/2 right-2.5 flex -translate-y-1/2 items-center rounded-md p-0.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {filters.map((item) => (
            <Button
              key={item.value}
              size="sm"
              variant={filter === item.value ? "default" : "outline"}
              onClick={() => setFilter(item.value)}
              className="h-8"
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>

      {filteredWorkOrders.length === 0 ? (
        <div className="rounded-2xl border border-dashed p-8 text-center text-sm text-muted-foreground">
          {workOrders.length === 0
            ? "You have no assigned work orders yet. New jobs will appear here once an admin assigns them to you."
            : "No work orders match your search."}
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {filteredWorkOrders.map((workOrder) => (
            <WorkOrderCard key={workOrder.id} workOrder={workOrder} />
          ))}
        </ul>
      )}
    </div>
  );
}
