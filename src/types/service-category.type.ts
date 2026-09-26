export interface IServiceCategory {
  id: string;
  name: string;
  description?: string | null;
  basePrice?: number | null;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
