import apiClient from "@/lib/apiClient";
import type { ApiResponse, INotification, INotificationParams } from "@/types";

export function getMyNotifications(params: INotificationParams) {
  return apiClient<ApiResponse<INotification[]>>("/notifications", {
    query: params,
  });
}

export function markNotificationAsRead(notificationId: string) {
  return apiClient<ApiResponse<INotification>>(
    `/notifications/${notificationId}/read`,
    { method: "PATCH" },
  );
}

export function markAllNotificationsAsRead() {
  return apiClient<ApiResponse<{ updatedCount: number }>>(
    "/notifications/read-all",
    { method: "PATCH" },
  );
}
