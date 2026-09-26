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
