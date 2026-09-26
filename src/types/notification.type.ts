export type NotificationType =
  | "WORK_ORDER_ASSIGNED"
  | "WORK_ORDER_ACCEPTED"
  | "WORK_ORDER_COMPLETED"
  | "APPLICATION_APPROVED"
  | "APPLICATION_REJECTED"
  | "PAYMENT_SUCCESS"
  | "GENERAL";

export interface INotification {
  id: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  type: NotificationType;
  userId: string;
}

export interface INotificationParams {
  page?: number;
  limit?: number;
}
