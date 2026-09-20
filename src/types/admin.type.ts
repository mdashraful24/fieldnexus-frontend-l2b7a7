import type { ITechnician } from "./technician.type";
import type { User, UserRole, UserStatus } from "./user.type";

export type VendorStatus = "PENDING" | "APPROVED" | "SUSPENDED";

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

export interface ICustomer {
  id: string;
  name: string;
  email: string;
  contactNumber?: string | null;
  address?: string | null;
  isDeleted: boolean;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface IAdminUsersParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  role?: "TECHNICIAN" | "CUSTOMER";
  status?: UserStatus;
  includeDeleted?: boolean;
}

export interface IAdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  imageUrl: string;
  createdAt: string;
}

export interface IUserDetail extends User {
  customer: ICustomer | null;
  technician: ITechnician | null;
}

export interface IUserStatusPayload {
  userId: string;
  status: UserStatus;
}

export interface IRestoreUserPayload {
  userId: string;
}

export interface IAuditLogParams {
  page?: number;
  limit?: number;
  action?: string;
  entityType?: string;
  userId?: string;
}

export interface IAuditLog {
  id: string;
  action: string;
  entityType: string;
  entityId: string | null;
  ipAddress: string | null;
  oldValue: unknown;
  newValue: unknown;
  createdAt: string;
  userId: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface IVendorsByStatus {
  PENDING: number;
  APPROVED: number;
  SUSPENDED: number;
}

export interface IDashboardStats {
  totalWorkOrders: number;
  completedWorkOrders: number;
  activeTechnicians: number;
  totalCustomers: number;
  totalTechnicians: number;
  totalAdmins: number;
  totalUsers: number;
  totalRevenue: number;
  totalRefunds: number;
  totalVendors: number;
  vendorsByStatus: IVendorsByStatus;
  technicianApplications: Record<"PENDING" | "APPROVED" | "REJECTED", number>;
  totalTechnicianApplications: number;
  slaComplianceRate: number;
  workOrdersByStatus: Record<WorkOrderStatus, number>;
}

export interface IVendorParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface IVendor {
  id: string;
  name: string;
  email: string;
  contactNumber?: string | null;
  description?: string | null;
  address?: string | null;
  serviceAreas?: string | null;
  rating: number;
  status: VendorStatus;
  isDeleted: boolean;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IVendorPerformance {
  vendorId: string;
  vendorName: string;
  totalJobs: number;
  completedJobs: number;
  cancelledJobs: number;
  slaBreaches: number;
  averageCompletionTime: string;
  averageRating: number;
  successRate: number;
}

export type AdminUsersRoleFilter = "ALL" | "TECHNICIAN" | "CUSTOMER";
export type AdminUsersStatusFilter = "ALL" | UserStatus;
