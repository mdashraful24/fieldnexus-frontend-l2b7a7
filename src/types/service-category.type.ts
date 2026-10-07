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

export interface ICreateServiceCategoryPayload {
  name: string;
  description?: string;
  basePrice?: number;
}

export interface IUpdateServiceCategoryPayload {
  serviceCategoryId: string;
  data: {
    name?: string;
    description?: string;
    basePrice?: number;
    isActive?: boolean;
  };
}

export interface IServiceCategoryParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  isActive?: boolean;
  includeDeleted?: boolean;
}

export type ServiceCategoryListFilter = "ALL" | "DELETED";
