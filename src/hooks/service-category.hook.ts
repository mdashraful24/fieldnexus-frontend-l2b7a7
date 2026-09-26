import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createServiceCategory,
  deleteServiceCategory,
  getAllServiceCategories,
  getServiceCategoryById,
  restoreServiceCategory,
  updateServiceCategory,
} from "@/api";
import type {
  ICreateServiceCategoryPayload,
  IUpdateServiceCategoryPayload,
} from "@/types";

export function useGetAllServiceCategories() {
  return useQuery({
    queryKey: ["service-categories"],
    queryFn: getAllServiceCategories,
    retry: false,
  });
}

export function useGetServiceCategoryById(serviceCategoryId: string) {
  return useQuery({
    queryKey: ["service-categories", serviceCategoryId],
    queryFn: () => getServiceCategoryById(serviceCategoryId),
    enabled: !!serviceCategoryId,
    retry: false,
  });
}

function useInvalidateServiceCategories() {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: ["service-categories"] });
  };
}

export function useCreateServiceCategory() {
  const invalidateServiceCategories = useInvalidateServiceCategories();

  return useMutation({
    mutationFn: (payload: ICreateServiceCategoryPayload) =>
      createServiceCategory(payload),
    onSuccess: invalidateServiceCategories,
  });
}

export function useUpdateServiceCategory() {
  const invalidateServiceCategories = useInvalidateServiceCategories();

  return useMutation({
    mutationFn: (payload: IUpdateServiceCategoryPayload) =>
      updateServiceCategory(payload),
    onSuccess: invalidateServiceCategories,
  });
}

export function useRestoreServiceCategory() {
  const invalidateServiceCategories = useInvalidateServiceCategories();

  return useMutation({
    mutationFn: (serviceCategoryId: string) =>
      restoreServiceCategory(serviceCategoryId),
    onSuccess: invalidateServiceCategories,
  });
}

export function useDeleteServiceCategory() {
  const invalidateServiceCategories = useInvalidateServiceCategories();

  return useMutation({
    mutationFn: (serviceCategoryId: string) =>
      deleteServiceCategory(serviceCategoryId),
    onSuccess: invalidateServiceCategories,
  });
}
