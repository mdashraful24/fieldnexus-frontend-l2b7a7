import apiClient from "@/lib/apiClient";
import type { ApiResponse, IServiceCategory } from "@/types";

export function getAllServiceCategories() {
  return apiClient<ApiResponse<IServiceCategory[]>>("/service-categories");
}
