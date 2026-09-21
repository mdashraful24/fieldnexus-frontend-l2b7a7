import apiClient from "@/lib/apiClient";
import type {
  ApiResponse,
  IChangeAdminEmailPayload,
  ICreateAdminPayload,
  IResetAdminPasswordPayload,
  ISuperAdmin,
  ISuperAdminParams,
  IUpdateAdminStatusPayload,
} from "@/types";

export function getAllAdmins(params: ISuperAdminParams) {
  return apiClient<ApiResponse<ISuperAdmin[]>>("/super-admin/admins", {
    query: params,
  });
}

export function getAdminById(adminId: string) {
  return apiClient<ApiResponse<ISuperAdmin>>(`/super-admin/admins/${adminId}`);
}

export function createAdmin(payload: ICreateAdminPayload) {
  return apiClient(`/super-admin/admins`, {
    method: "POST",
    body: payload,
  });
}

export function updateAdminStatus(payload: IUpdateAdminStatusPayload) {
  return apiClient(`/super-admin/admins/${payload.adminId}/status`, {
    method: "PATCH",
    body: { status: payload.status },
  });
}

export function restoreAdmin(adminId: string) {
  return apiClient(`/super-admin/admins/${adminId}/restore`, {
    method: "PATCH",
  });
}

export function resetAdminPassword(payload: IResetAdminPasswordPayload) {
  return apiClient(`/super-admin/admins/${payload.adminId}/reset-password`, {
    method: "PATCH",
    body: { newPassword: payload.newPassword },
  });
}

export function changeAdminEmail(payload: IChangeAdminEmailPayload) {
  return apiClient(`/super-admin/admins/${payload.adminId}/change-email`, {
    method: "PATCH",
    body: { newEmail: payload.newEmail },
  });
}