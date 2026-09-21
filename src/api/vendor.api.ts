import apiClient from "@/lib/apiClient";
import type {
  ApiResponse,
  IAddVendorMemberPayload,
  ICreateVendorPayload,
  IVendor,
  IVendorDetail,
  IVendorMember,
  IVendorMemberMutationPayload,
  IVendorParams,
  IVendorUpdatePayload,
} from "@/types";

export function getAllVendors(params: IVendorParams) {
  return apiClient<ApiResponse<IVendor[]>>("/vendors", {
    query: params,
  });
}

export function getVendorById(vendorId: string) {
  return apiClient<ApiResponse<IVendorDetail>>(`/vendors/${vendorId}`);
}

export function createVendor(payload: ICreateVendorPayload) {
  return apiClient<ApiResponse<IVendor>>("/vendors", {
    method: "POST",
    body: payload,
  });
}

export function updateVendor({ vendorId, data }: IVendorUpdatePayload) {
  return apiClient<ApiResponse<IVendor>>(`/vendors/${vendorId}`, {
    method: "PATCH",
    body: data,
  });
}

export function deleteVendor(vendorId: string) {
  return apiClient<ApiResponse<null>>(`/vendors/${vendorId}`, {
    method: "DELETE",
  });
}

export function restoreVendor(vendorId: string) {
  return apiClient<ApiResponse<IVendor>>(`/vendors/${vendorId}/restore`, {
    method: "PATCH",
  });
}

export function getVendorMembers(vendorId: string) {
  return apiClient<ApiResponse<IVendorMember[]>>(
    `/vendors/${vendorId}/members`,
  );
}

export function addVendorMember({ vendorId, technicianId }: IAddVendorMemberPayload) {
  return apiClient<ApiResponse<IVendorMember>>(`/vendors/${vendorId}/members`, {
    method: "POST",
    body: { technicianId },
  });
}

export function removeVendorMember({
  vendorId,
  technicianId,
}: IVendorMemberMutationPayload) {
  return apiClient<ApiResponse<null>>(
    `/vendors/${vendorId}/members/${technicianId}`,
    {
      method: "DELETE",
    },
  );
}

export function restoreVendorMember({
  vendorId,
  technicianId,
}: IVendorMemberMutationPayload) {
  return apiClient<ApiResponse<IVendorMember>>(
    `/vendors/${vendorId}/members/${technicianId}/restore`,
    {
      method: "PATCH",
    },
  );
}