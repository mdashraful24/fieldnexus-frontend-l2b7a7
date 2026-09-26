import apiClient from "@/lib/apiClient";
import type {
  ApiResponse,
  ICreateServiceCategoryPayload,
  IServiceCategory,
  IUpdateServiceCategoryPayload,
} from "@/types";

export function getAllServiceCategories() {
  return apiClient<ApiResponse<IServiceCategory[]>>("/service-categories");
}

export function getServiceCategoryById(serviceCategoryId: string) {
  return apiClient<ApiResponse<IServiceCategory>>(
    `/service-categories/${serviceCategoryId}`,
  );
}

export function createServiceCategory(payload: ICreateServiceCategoryPayload) {
  return apiClient<ApiResponse<IServiceCategory>>("/service-categories", {
    method: "POST",
    body: payload,
  });
}

export function updateServiceCategory({
  serviceCategoryId,
  data,
}: IUpdateServiceCategoryPayload) {
  return apiClient<ApiResponse<IServiceCategory>>(
    `/service-categories/${serviceCategoryId}`,
    {
      method: "PATCH",
      body: data,
    },
  );
}

export function restoreServiceCategory(serviceCategoryId: string) {
  return apiClient<ApiResponse<IServiceCategory>>(
    `/service-categories/${serviceCategoryId}/restore`,
    { method: "PATCH" },
  );
}

export function deleteServiceCategory(serviceCategoryId: string) {
  return apiClient<ApiResponse<null>>(`/service-categories/${serviceCategoryId}`, {
    method: "DELETE",
  });
}
