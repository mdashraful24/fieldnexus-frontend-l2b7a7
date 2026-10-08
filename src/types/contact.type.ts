export interface IContactMessagePayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface IContactMessage extends IContactMessagePayload {
  id: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IContactMessageParams {
  page?: number;
  limit?: number;
  isRead?: boolean;
}
