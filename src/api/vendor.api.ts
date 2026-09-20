import apiClient from "@/lib/apiClient";
import type { ApiResponse, IVendor, IVendorParams } from "@/types";

export function getAllVendors(params: IVendorParams) {
  return apiClient<ApiResponse<IVendor[]>>("/vendors", {
    query: params,
  });
}
