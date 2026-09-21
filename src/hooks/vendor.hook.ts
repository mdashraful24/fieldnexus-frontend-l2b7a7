import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  addVendorMember,
  createVendor,
  deleteVendor,
  getAllVendors,
  getVendorById,
  getVendorMembers,
  removeVendorMember,
  restoreVendor,
  restoreVendorMember,
  updateVendor,
} from "@/api";
import type { IVendorParams } from "@/types";

export function useSuspenseGetAllVendors(params: IVendorParams) {
  return useSuspenseQuery({
    queryKey: ["vendors", params],
    queryFn: () => getAllVendors(params),
  });
}

export function useGetVendorById(vendorId: string) {
  return useQuery({
    queryKey: ["admin", "vendor", vendorId],
    queryFn: () => getVendorById(vendorId),
    enabled: !!vendorId,
    retry: false,
  });
}

export function useGetVendorMembers(vendorId: string) {
  return useQuery({
    queryKey: ["admin", "vendor-members", vendorId],
    queryFn: () => getVendorMembers(vendorId),
    enabled: !!vendorId,
    retry: false,
  });
}

export function useCreateVendor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createVendor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vendors"] });
    },
  });
}

export function useUpdateVendor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateVendor,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["vendors"] });
      queryClient.invalidateQueries({
        queryKey: ["admin", "vendor", variables.vendorId],
      });
    },
  });
}

export function useDeleteVendor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteVendor,
    onSuccess: (_data, vendorId) => {
      queryClient.invalidateQueries({ queryKey: ["vendors"] });
      queryClient.invalidateQueries({
        queryKey: ["admin", "vendor", vendorId],
      });
    },
  });
}

export function useRestoreVendor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: restoreVendor,
    onSuccess: (_data, vendorId) => {
      queryClient.invalidateQueries({ queryKey: ["vendors"] });
      queryClient.invalidateQueries({
        queryKey: ["admin", "vendor", vendorId],
      });
    },
  });
}

export function useAddVendorMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addVendorMember,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "vendor-members", variables.vendorId],
      });
      queryClient.invalidateQueries({
        queryKey: ["admin", "vendor", variables.vendorId],
      });
    },
  });
}

export function useRemoveVendorMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeVendorMember,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "vendor-members", variables.vendorId],
      });
      queryClient.invalidateQueries({
        queryKey: ["admin", "vendor", variables.vendorId],
      });
    },
  });
}

export function useRestoreVendorMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: restoreVendorMember,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "vendor-members", variables.vendorId],
      });
      queryClient.invalidateQueries({
        queryKey: ["admin", "vendor", variables.vendorId],
      });
    },
  });
}