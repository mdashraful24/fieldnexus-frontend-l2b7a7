export type NotificationType =
  | "WORK_ORDER_CREATED"
  | "WORK_ORDER_APPROVED"
  | "WORK_ORDER_ASSIGNED"
  | "WORK_ORDER_ACCEPTED"
  | "WORK_ORDER_REASSIGNED"
  | "WORK_ORDER_REJECTED"
  | "WORK_ORDER_CANCELLED"
  | "WORK_ORDER_EN_ROUTE"
  | "WORK_ORDER_IN_PROGRESS"
  | "WORK_ORDER_COMPLETED"
  | "WORK_ORDER_FAILED"
  | "SERVICE_REPORT_SUBMITTED"
  | "FEEDBACK_SUBMITTED"
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
  isRead?: boolean;
}
