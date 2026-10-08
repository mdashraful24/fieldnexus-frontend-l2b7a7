import apiClient from "@/lib/apiClient";
import type {
  ApiResponse,
  IContactMessage,
  IContactMessageParams,
  IContactMessagePayload,
} from "@/types";

export function createContactMessage(payload: IContactMessagePayload) {
  return apiClient<ApiResponse<IContactMessage>>("/contact", {
    method: "POST",
    body: payload,
  });
}

export function getContactMessages(params: IContactMessageParams) {
  return apiClient<ApiResponse<IContactMessage[]>>("/contact", {
    query: params,
  });
}

export function updateContactMessageReadStatus({
  messageId,
  isRead,
}: {
  messageId: string;
  isRead: boolean;
}) {
  return apiClient<ApiResponse<IContactMessage>>(`/contact/${messageId}/read`, {
    method: "PATCH",
    body: { isRead },
  });
}
