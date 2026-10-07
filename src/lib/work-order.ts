import type { WorkOrderStatus } from "@/types";

const TECHNICIAN_ONLY_STATUSES: WorkOrderStatus[] = [
  "ACCEPTED",
  "EN_ROUTE",
  "IN_PROGRESS",
  "COMPLETED",
  "FAILED",
];

const TECHNICIAN_STATUS_ACTIONS: WorkOrderStatus[] = [
  "EN_ROUTE",
  "IN_PROGRESS",
  "COMPLETED",
  "FAILED",
];

const ASSIGNMENT_STATUSES: WorkOrderStatus[] = ["ASSIGNED", "REASSIGNED"];

const VALID_TRANSITIONS: Record<WorkOrderStatus, WorkOrderStatus[]> = {
  PENDING: ["APPROVED", "CANCELLED"],
  APPROVED: ["ASSIGNED", "CANCELLED"],
  ASSIGNED: ["ACCEPTED", "REASSIGNED", "CANCELLED"],
  ACCEPTED: ["EN_ROUTE", "CANCELLED"],
  EN_ROUTE: ["IN_PROGRESS"],
  IN_PROGRESS: ["COMPLETED", "FAILED"],
  COMPLETED: [],
  CANCELLED: [],
  REASSIGNED: [],
  FAILED: [],
};

export function getAdminStatusActions(
  status: WorkOrderStatus,
): WorkOrderStatus[] {
  return (VALID_TRANSITIONS[status] ?? []).filter(
    (nextStatus) =>
      !TECHNICIAN_ONLY_STATUSES.includes(nextStatus) &&
      !ASSIGNMENT_STATUSES.includes(nextStatus),
  );
}

export function getTechnicianStatusActions(
  status: WorkOrderStatus,
): WorkOrderStatus[] {
  return (VALID_TRANSITIONS[status] ?? []).filter((nextStatus) =>
    TECHNICIAN_STATUS_ACTIONS.includes(nextStatus),
  );
}
