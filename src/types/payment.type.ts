export type PaymentStatus =
  | "UNPAID"
  | "PAID"
  | "FAILED"
  | "CANCELLED"
  | "REFUNDED";

export interface IPayment {
  id: string;
  amount: number;
  currency: string;
  gateway: string;
  status: PaymentStatus;
  merchantInvoiceNumber?: string | null;
  bkashPaymentId?: string | null;
  bkashTrxId?: string | null;
  payUrl?: string | null;
  payerReference?: string | null;
  paidAt?: string | null;
  refundTrxId?: string | null;
  refundAmount?: number | null;
  refundReason?: string | null;
  refundAt?: string | null;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  workOrderId: string;
  customerId: string;
}

export interface IPaymentParams {
  page?: number;
  limit?: number;
  status?: PaymentStatus;
  sortBy?: string;
  sortOrder?: "desc" | "asc";
}

export interface IInitiatePaymentPayload {
  workOrderId: string;
  payerReference?: string;
}

export interface IRefundPaymentPayload {
  paymentId: string;
  reason?: string;
}
