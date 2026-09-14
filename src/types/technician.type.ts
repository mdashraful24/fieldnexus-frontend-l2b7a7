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
