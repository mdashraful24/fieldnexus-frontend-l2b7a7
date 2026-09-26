import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  cancelPayment,
  getAllPayments,
  getPaymentById,
  initiatePayment,
  refundPayment,
} from "@/api";
import type {
  IInitiatePaymentPayload,
  IPaymentParams,
  IRefundPaymentPayload,
} from "@/types";

export function useSuspenseGetAllPayments(params: IPaymentParams) {
  return useSuspenseQuery({
    queryKey: ["payments", params],
    queryFn: () => getAllPayments(params),
  });
}

export function useGetPaymentById(paymentId: string) {
  return useQuery({
    queryKey: ["payments", paymentId],
    queryFn: () => getPaymentById(paymentId),
    enabled: !!paymentId,
    retry: false,
  });
}

export function useInitiatePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IInitiatePaymentPayload) => initiatePayment(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
    },
  });
}

export function useCancelPayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (paymentId: string) => cancelPayment(paymentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
    },
  });
}

export function useRefundPayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IRefundPaymentPayload) => refundPayment(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
    },
  });
}
