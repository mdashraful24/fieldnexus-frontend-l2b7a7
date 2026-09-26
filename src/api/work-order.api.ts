import apiClient from "@/lib/apiClient";
import type {
  ApiResponse,
  IAssignWorkOrderPayload,
  ICreateFeedbackPayload,
  ICreateServiceReportPayload,
  ICreateWorkOrderPayload,
  IRejectAssignmentPayload,
  IServiceReport,
  IUpdateWorkOrderPayload,
  IUpdateWorkOrderStatusPayload,
  IWorkAssignment,
  IWorkOrder,
  IWorkOrderFeedback,
  IWorkOrderParams,
} from "@/types";

export function getAllWorkOrders(params: IWorkOrderParams) {
  return apiClient<ApiResponse<IWorkOrder[]>>("/work-orders", {
    query: params,
  });
}

export function createWorkOrder(payload: ICreateWorkOrderPayload) {
  return apiClient<ApiResponse<IWorkOrder>>("/work-orders", {
    method: "POST",
    body: payload,
  });
}

export function getMyAssignedWorkOrders() {
  return apiClient<ApiResponse<IWorkOrder[]>>("/work-orders/my-assigned");
}

export function getWorkOrderById(workOrderId: string) {
  return apiClient<ApiResponse<IWorkOrder>>(`/work-orders/${workOrderId}`);
}

export function updateWorkOrderStatus(payload: IUpdateWorkOrderStatusPayload) {
  const { workOrderId, version, ...body } = payload;

  return apiClient<ApiResponse<IWorkOrder>>(
    `/work-orders/${workOrderId}/status`,
    {
      method: "PATCH",
      body: { ...body, version },
    },
  );
}

export function acceptWorkOrder(workOrderId: string) {
  return apiClient<ApiResponse<IWorkAssignment>>(
    `/work-orders/${workOrderId}/accept`,
    {
      method: "POST",
    },
  );
}

export function rejectWorkOrder(payload: IRejectAssignmentPayload) {
  return apiClient<ApiResponse<IWorkAssignment>>(
    `/work-orders/${payload.workOrderId}/reject`,
    {
      method: "POST",
      body: { rejectionReason: payload.rejectionReason },
    },
  );
}

export function assignWorkOrder({
  workOrderId,
  vendorId,
  technicianId,
}: IAssignWorkOrderPayload) {
  return apiClient<ApiResponse<IWorkAssignment>>(
    `/work-orders/${workOrderId}/assign`,
    {
      method: "POST",
      body: { vendorId, technicianId },
    },
  );
}

export function updateWorkOrder({ workOrderId, data }: IUpdateWorkOrderPayload) {
  return apiClient<ApiResponse<IWorkOrder>>(`/work-orders/${workOrderId}`, {
    method: "PATCH",
    body: data,
  });
}

export function deleteWorkOrder(workOrderId: string) {
  return apiClient<ApiResponse<null>>(`/work-orders/${workOrderId}`, {
    method: "DELETE",
  });
}

export function createServiceReport(payload: ICreateServiceReportPayload) {
  const { workOrderId, ...body } = payload;

  return apiClient<ApiResponse<IServiceReport>>(
    `/work-orders/${workOrderId}/service-report`,
    {
      method: "POST",
      body,
    },
  );
}

export function getServiceReport(workOrderId: string) {
  return apiClient<ApiResponse<IServiceReport>>(
    `/work-orders/${workOrderId}/service-report`,
  );
}

export function createFeedback(payload: ICreateFeedbackPayload) {
  return apiClient<ApiResponse<IWorkOrderFeedback>>(
    `/work-orders/${payload.workOrderId}/feedback`,
    {
      method: "POST",
      body: {
        rating: payload.rating,
        comment: payload.comment,
      },
    },
  );
}

export function getFeedback(workOrderId: string) {
  return apiClient<ApiResponse<IWorkOrderFeedback | null>>(
    `/work-orders/${workOrderId}/feedback`,
  );
}
