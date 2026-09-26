import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  acceptWorkOrder,
  createFeedback,
  createServiceReport,
  createWorkOrder,
  getAllWorkOrders,
  getFeedback,
  getMyAssignedWorkOrders,
  getServiceReport,
  getWorkOrderById,
  rejectWorkOrder,
  updateWorkOrderStatus,
} from "@/api";
import type {
  ICreateFeedbackPayload,
  ICreateServiceReportPayload,
  ICreateWorkOrderPayload,
  IRejectAssignmentPayload,
  IUpdateWorkOrderStatusPayload,
  IWorkOrderParams,
} from "@/types";

export function useSuspenseGetAllWorkOrders(params: IWorkOrderParams) {
  return useSuspenseQuery({
    queryKey: ["work-orders", params],
    queryFn: () => getAllWorkOrders(params),
  });
}

export function useGetWorkOrderById(workOrderId: string) {
  return useQuery({
    queryKey: ["work-orders", workOrderId],
    queryFn: () => getWorkOrderById(workOrderId),
    enabled: !!workOrderId,
    retry: false,
  });
}

export function useGetMyAssignedWorkOrders() {
  return useQuery({
    queryKey: ["work-orders", "my-assigned"],
    queryFn: getMyAssignedWorkOrders,
    retry: false,
  });
}

export function useGetServiceReport(workOrderId: string) {
  return useQuery({
    queryKey: ["work-orders", workOrderId, "service-report"],
    queryFn: () => getServiceReport(workOrderId),
    enabled: !!workOrderId,
    retry: false,
  });
}

export function useGetFeedback(workOrderId: string) {
  return useQuery({
    queryKey: ["work-orders", workOrderId, "feedback"],
    queryFn: () => getFeedback(workOrderId),
    enabled: !!workOrderId,
    retry: false,
  });
}

function useInvalidateWorkOrders() {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: ["work-orders"] });
  };
}

export function useCreateWorkOrder() {
  const invalidateWorkOrders = useInvalidateWorkOrders();

  return useMutation({
    mutationFn: (payload: ICreateWorkOrderPayload) => createWorkOrder(payload),
    onSuccess: invalidateWorkOrders,
  });
}

export function useUpdateWorkOrderStatus() {
  const invalidateWorkOrders = useInvalidateWorkOrders();

  return useMutation({
    mutationFn: (payload: IUpdateWorkOrderStatusPayload) =>
      updateWorkOrderStatus(payload),
    onSuccess: invalidateWorkOrders,
  });
}

export function useAcceptWorkOrder() {
  const invalidateWorkOrders = useInvalidateWorkOrders();

  return useMutation({
    mutationFn: (workOrderId: string) => acceptWorkOrder(workOrderId),
    onSuccess: invalidateWorkOrders,
  });
}

export function useRejectWorkOrder() {
  const invalidateWorkOrders = useInvalidateWorkOrders();

  return useMutation({
    mutationFn: (payload: IRejectAssignmentPayload) => rejectWorkOrder(payload),
    onSuccess: invalidateWorkOrders,
  });
}

export function useCreateServiceReport() {
  const invalidateWorkOrders = useInvalidateWorkOrders();

  return useMutation({
    mutationFn: (payload: ICreateServiceReportPayload) =>
      createServiceReport(payload),
    onSuccess: invalidateWorkOrders,
  });
}

export function useCreateFeedback() {
  const invalidateWorkOrders = useInvalidateWorkOrders();

  return useMutation({
    mutationFn: (payload: ICreateFeedbackPayload) => createFeedback(payload),
    onSuccess: invalidateWorkOrders,
  });
}
