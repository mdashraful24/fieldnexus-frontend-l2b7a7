import type { UserRole, UserStatus } from "./user.type";

export type SuperAdminRoleFilter = "ALL" | "ADMIN" | "SUPER_ADMIN";
export type SuperAdminStatusFilter = "ALL" | UserStatus;

export interface ISuperAdminParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  role?: "ADMIN" | "SUPER_ADMIN";
  status?: UserStatus;
  includeDeleted?: boolean;
}

export interface ISuperAdmin {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  imageUrl: string;
  imagePublicId: string;
  emailVerified: boolean;
  needPasswordChange: boolean;
  createdAt: string;
  updatedAt: string;
  admin: {
    id: string;
    name: string;
    email: string;
    contactNumber: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
}

export interface ICreateAdminPayload {
  name: string;
  email: string;
  password: string;
  contactNumber?: string;
}

export interface IUpdateAdminStatusPayload {
  adminId: string;
  status: UserStatus;
}

export interface IResetAdminPasswordPayload {
  adminId: string;
  newPassword: string;
}

export interface IChangeAdminEmailPayload {
  adminId: string;
  newEmail: string;
}