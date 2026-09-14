export interface RegistrationPayload {
  name: string;
  email: string;
  password: string;
  customer: {
    contactNumber?: string;
  };
}

export interface VerifyAccountPayload {
  email: string;
  otp: string;
}

export interface ResendRegistrationOtpPayload {
  email: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}
