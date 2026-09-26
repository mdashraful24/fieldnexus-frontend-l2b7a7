export interface RegistrationPayload {
  name: string;
  email: string;
  password: string;
  contactNumber?: string;
  address?: string;
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

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  email: string;
  otp: string;
  newPassword: string;
}

export interface GoogleLoginPayload {
  idToken: string;
}

export interface IAuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface IOtpSession {
  expiresIn: number;
  expiresAt: string;
  sessionExpiresIn: number;
}
