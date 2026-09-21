import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  changeAdminEmail,
  createAdmin,
  getAllAdmins,
  getAdminById,
  resetAdminPassword,
  restoreAdmin,
  updateAdminStatus,
} from "@/api";
import type {
  IChangeAdminEmailPayload,
  ICreateAdminPayload,
  IResetAdminPasswordPayload,
  ISuperAdminParams,
  IUpdateAdminStatusPayload,
} from "@/types";

export function useSuspenseGetAllAdmins(params: ISuperAdminParams) {
  return useSuspenseQuery({
    queryKey: ["super-admin", "admins", params],
    queryFn: () => getAllAdmins(params),
  });
}

export function useGetAdminById(adminId: string) {
  return useQuery({
    queryKey: ["super-admin", "admin", adminId],
    queryFn: () => getAdminById(adminId),
    enabled: !!adminId,
    retry: false,
  });
}

export function useCreateAdmin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ICreateAdminPayload) => createAdmin(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["super-admin", "admins"] });
    },
  });
}

export function useUpdateAdminStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IUpdateAdminStatusPayload) =>
      updateAdminStatus(payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["super-admin", "admins"] });
      queryClient.invalidateQueries({
        queryKey: ["super-admin", "admin", variables.adminId],
      });
    },
  });
}

export function useRestoreAdmin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (adminId: string) => restoreAdmin(adminId),
    onSuccess: (_data, adminId) => {
      queryClient.invalidateQueries({ queryKey: ["super-admin", "admins"] });
      queryClient.invalidateQueries({
        queryKey: ["super-admin", "admin", adminId],
      });
    },
  });
}

export function useResetAdminPassword() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IResetAdminPasswordPayload) =>
      resetAdminPassword(payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["super-admin", "admins"] });
      queryClient.invalidateQueries({
        queryKey: ["super-admin", "admin", variables.adminId],
      });
    },
  });
}

export function useChangeAdminEmail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IChangeAdminEmailPayload) =>
      changeAdminEmail(payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["super-admin", "admins"] });
      queryClient.invalidateQueries({
        queryKey: ["super-admin", "admin", variables.adminId],
      });
    },
  });
}