import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  getAllUsers,
  getAuditLogs,
  getDashboardStats,
  getUserById,
  getVendorPerformance,
  restoreUser,
  updateUserStatus,
} from "@/api";
import type {
  IAdminUsersParams,
  IAuditLogParams,
  IUsersBulkStatusPayload,
} from "@/types";

export function useSuspenseGetDashboardStats() {
  return useSuspenseQuery({
    queryKey: ["admin", "dashboard-stats"],
    queryFn: getDashboardStats,
  });
}

export function useSuspenseGetAllUsers(params: IAdminUsersParams) {
  return useSuspenseQuery({
    queryKey: ["admin", "users", params],
    queryFn: () => getAllUsers(params),
  });
}

export function useGetUserById(userId: string) {
  return useQuery({
    queryKey: ["admin", "user", userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
    retry: false,
  });
}

export function useUpdateUserStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserStatus,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      queryClient.invalidateQueries({
        queryKey: ["admin", "user", variables.userId],
      });
    },
  });
}

export function useRestoreUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: restoreUser,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      queryClient.invalidateQueries({
        queryKey: ["admin", "user", variables.userId],
      });
    },
  });
}

export function useBulkUpdateUserStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userIds, status }: IUsersBulkStatusPayload) => {
      await Promise.all(
        userIds.map((userId) => updateUserStatus({ userId, status })),
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "user"] });
    },
  });
}

export function useSuspenseGetAuditLogs(params: IAuditLogParams) {
  return useSuspenseQuery({
    queryKey: ["admin", "audit-logs", params],
    queryFn: () => getAuditLogs(params),
  });
}

export function useGetVendorPerformance(vendorId: string) {
  return useQuery({
    queryKey: ["admin", "vendor-performance", vendorId],
    queryFn: () => getVendorPerformance(vendorId),
    enabled: !!vendorId,
    retry: false,
  });
}
