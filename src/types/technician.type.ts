import type { UserRole } from "./user.type";

export interface ITechnicianApplicationData {
  name: string;
  email: string;
  contactNumber?: string;
  address?: string;
  qualifications: string;
  experienceYears: number;
  skills?: string[];
  bio?: string;
}

export interface ITechnicianApplicationPayload {
  data: ITechnicianApplicationData;
  resume: File;
  additionalDocuments: File[];
}

export type ITechnicianApplicationStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface ITechnician {
  id: string;
  name: string;
  email: string;
  address?: string | null;
  skills: string[];
  qualifications: string;
  experienceYears: number;
  bio?: string | null;
  contactNumber?: string | null;
  resume?: string | null;
  resumePublicId?: string | null;
  additionalDocuments?: { url: string; publicId: string }[] | null;
  isDeleted: boolean;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface ITechnicianApplication {
  id: string;
  name: string;
  email: string;
  contactNumber?: string | null;
  address?: string | null;
  skills: string[];
  qualifications: string;
  experienceYears: number;
  bio?: string | null;
  status: ITechnicianApplicationStatus;
  rejectionReason?: string | null;
  reviewedBy?: string | null;
  reviewedAt?: string | null;
  resume?: string | null;
  resumePublicId?: string | null;
  additionalDocuments?: { url: string; publicId: string }[] | null;
  isDeleted: boolean;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  technicianId?: string | null;
  technician?: Pick<ITechnician, "id" | "name" | "email"> | null;
}

export interface ITechnicianParams {
  status?: ITechnicianApplicationStatus;
  page?: number;
  limit?: number;
  searchTerm?: string;
  sortBy?: string;
  sortOrder?: "desc" | "asc";
}

export interface IRejectTechnicianPayload {
  applicationId: string;
  rejectionReason?: string;
}

export interface ITechnicianApplicationStatusResult {
  id: string;
  status: ITechnicianApplicationStatus;
  rejectionReason?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IApprovedTechnicianUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface IApproveTechnicianResult {
  application: ITechnicianApplication;
  user: IApprovedTechnicianUser;
}