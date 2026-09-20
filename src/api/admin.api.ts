import apiClient from "@/lib/apiClient";
import type {
  ApiResponse,
  IAdminUser,
  IAdminUsersParams,
  IAuditLog,
  IAuditLogParams,
  IDashboardStats,
  IRestoreUserPayload,
  IUserDetail,
  IUserStatusPayload,
  IVendorPerformance,
} from "@/types";

export function getDashboardStats() {
  return apiClient<ApiResponse<IDashboardStats>>("/admin/dashboard-stats");
}

export function getAllUsers(params: IAdminUsersParams) {
  return apiClient<ApiResponse<IAdminUser[]>>("/admin/users", {
    query: params,
  });
}

export function getUserById(userId: string) {
  return apiClient<ApiResponse<IUserDetail>>(`/admin/users/${userId}`);
}

export function updateUserStatus(payload: IUserStatusPayload) {
  return apiClient(`/admin/users/${payload.userId}/status`, {
    method: "PATCH",
    body: { status: payload.status },
  });
}

export function restoreUser(payload: IRestoreUserPayload) {
  return apiClient(`/admin/users/${payload.userId}/restore`, {
    method: "PATCH",
  });
}

export function getAuditLogs(params: IAuditLogParams) {
  return apiClient<ApiResponse<IAuditLog[]>>("/admin/audit-logs", {
    query: params,
  });
}

export function getVendorPerformance(vendorId: string) {
  return apiClient<ApiResponse<IVendorPerformance>>(
    `/admin/vendors/${vendorId}/performance`,
  );
}
