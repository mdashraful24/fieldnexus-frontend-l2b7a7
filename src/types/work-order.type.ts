export type WorkOrderStatus =
  | "PENDING"
  | "APPROVED"
  | "ASSIGNED"
  | "ACCEPTED"
  | "EN_ROUTE"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED"
  | "REASSIGNED"
  | "FAILED";

export type WorkOrderPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export type AssignmentStatus =
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | "COMPLETED"
  | "CANCELLED";

export interface IWorkOrderCustomer {
  id: string;
  name: string;
  email: string;
  contactNumber?: string | null;
  address?: string | null;
}

export interface IWorkOrderCategory {
  id: string;
  name: string;
  description?: string | null;
}

export interface IWorkAssignment {
  id: string;
  status: AssignmentStatus;
  rejectionReason?: string | null;
  assignedAt: string;
  acceptedAt?: string | null;
  cancelledAt?: string | null;
  workOrderId: string;
  vendorId: string;
  technicianId: string;
  vendor?: { id: string; name: string } | null;
}

export interface IServiceReport {
  id: string;
  workDescription: string;
  issueFound?: string | null;
  solutionProvided?: string | null;
  partsUsed?: { name: string; quantity: number }[] | null;
  hoursWorked: number;
  submittedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IWorkOrderFeedback {
  id: string;
  rating: number;
  comment?: string | null;
  createdAt: string;
}

export interface IWorkOrder {
  id: string;
  workOrderNumber: string;
  title: string;
  description?: string | null;
  version: number;
  status: WorkOrderStatus;
  priority: WorkOrderPriority;
  scheduledAt?: string | null;
  slaDeadline?: string | null;
  completedAt?: string | null;
  cancellationReason?: string | null;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  customerId: string;
  categoryId: string;
  customer?: IWorkOrderCustomer | null;
  category?: IWorkOrderCategory | null;
  workAssignments?: IWorkAssignment[] | null;
  serviceReport?: IServiceReport | null;
  feedback?: IWorkOrderFeedback | null;
}

export interface IWorkOrderParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  status?: WorkOrderStatus;
  priority?: WorkOrderPriority;
  sortBy?: string;
  sortOrder?: "desc" | "asc";
}

export interface ICreateWorkOrderPayload {
  title: string;
  description?: string;
  categoryId: string;
  priority?: WorkOrderPriority;
  scheduledAt?: string;
  latitude?: number;
  longitude?: number;
}

export interface IUpdateWorkOrderStatusPayload {
  workOrderId: string;
  status: WorkOrderStatus;
  version: number;
  cancellationReason?: string;
}

export interface IRejectAssignmentPayload {
  workOrderId: string;
  rejectionReason: string;
}

export interface IAssignWorkOrderPayload {
  workOrderId: string;
  vendorId: string;
  technicianId: string;
}

export interface IUpdateWorkOrderPayload {
  workOrderId: string;
  data: {
    title?: string;
    description?: string;
    categoryId?: string;
    priority?: WorkOrderPriority;
    scheduledAt?: string;
    latitude?: number;
    longitude?: number;
    version: number;
  };
}

export interface ICreateServiceReportPayload {
  workOrderId: string;
  workDescription: string;
  issueFound?: string;
  solutionProvided?: string;
  hoursWorked: number;
  partsUsed?: { name: string; quantity: number }[];
}

export interface ICreateFeedbackPayload {
  workOrderId: string;
  rating: number;
  comment?: string;
}
