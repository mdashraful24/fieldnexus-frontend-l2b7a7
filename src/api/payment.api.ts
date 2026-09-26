import apiClient from "@/lib/apiClient";
import type {
  ApiResponse,
  IInitiatePaymentPayload,
  IPayment,
  IPaymentParams,
  IRefundPaymentPayload,
} from "@/types";

export function getAllPayments(params: IPaymentParams) {
  return apiClient<ApiResponse<IPayment[]>>("/payments", {
    query: params,
  });
}

export function getPaymentById(paymentId: string) {
  return apiClient<ApiResponse<IPayment>>(`/payments/${paymentId}`);
}

export function initiatePayment(payload: IInitiatePaymentPayload) {
  return apiClient<ApiResponse<{ paymentUrl: string }>>("/payments/initiate", {
    method: "POST",
    body: payload,
  });
}

export function cancelPayment(paymentId: string) {
  return apiClient<ApiResponse<IPayment>>(`/payments/${paymentId}/cancel`, {
    method: "POST",
  });
}

export function refundPayment(payload: IRefundPaymentPayload) {
  return apiClient<ApiResponse<IPayment>>(
    `/payments/${payload.paymentId}/refund`,
    {
      method: "POST",
      body: { reason: payload.reason },
    },
  );
}
