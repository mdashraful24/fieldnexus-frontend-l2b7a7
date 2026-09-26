export type UserRole = "SUPER_ADMIN" | "ADMIN" | "TECHNICIAN" | "CUSTOMER";
export type UserStatus = "ACTIVE" | "BLOCKED" | "DELETED";

export interface ICustomer {
  id: string;
  name: string;
  email: string;
  contactNumber?: string | null;
  address?: string | null;
  isDeleted: boolean;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  googleId?: string | null;
  authProvider: string;
  emailVerified: boolean;
  role: UserRole;
  status: UserStatus;
  needPasswordChange: boolean;
  imageUrl?: string | null;
  imagePublicId?: string | null;
  isDeleted: boolean;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IUserProfile extends User {
  customer?: ICustomer | null;
}

export interface IUpdateUserInfoPayload {
  name?: string;
}
