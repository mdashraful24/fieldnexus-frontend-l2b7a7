import apiClient from "@/lib/apiClient";
import type {
  ApiResponse,
  ForgotPasswordPayload,
  GoogleLoginPayload,
  IAuthTokens,
  IOtpSession,
  IUserProfile,
  LoginPayload,
  RegistrationPayload,
  ResendRegistrationOtpPayload,
  ResetPasswordPayload,
  VerifyAccountPayload,
} from "@/types";

export function userRegistration(payload: RegistrationPayload) {
  return apiClient<ApiResponse<IOtpSession>>("/auth/register", {
    method: "POST",
    body: payload,
  });
}

export function verifyAccount(payload: VerifyAccountPayload) {
  return apiClient<ApiResponse<IAuthTokens>>("/auth/verify-email", {
    method: "POST",
    body: payload,
  });
}

export function resendRegistrationOtp(payload: ResendRegistrationOtpPayload) {
  return apiClient<ApiResponse<IOtpSession>>("/auth/resend-otp", {
    method: "POST",
    body: payload,
  });
}

export function userLogin(payload: LoginPayload) {
  return apiClient<ApiResponse<IAuthTokens>>("/auth/login", {
    method: "POST",
    body: payload,
  });
}

export function userLogout() {
  return apiClient<ApiResponse<null>>("/auth/logout", { method: "POST" });
}

export function getMe() {
  return apiClient<ApiResponse<IUserProfile>>("/auth/me");
}

export function refreshToken() {
  return apiClient<ApiResponse<IAuthTokens>>("/auth/refresh-token", {
    method: "POST",
  });
}

export function googleOAuth(payload: GoogleLoginPayload) {
  return apiClient<ApiResponse<IAuthTokens>>("/auth/google", {
    method: "POST",
    body: payload,
  });
}

export function forgotPassword(payload: ForgotPasswordPayload) {
  return apiClient<ApiResponse<IOtpSession>>("/auth/forgot-password", {
    method: "POST",
    body: payload,
  });
}

export function resendForgotPasswordOtp(payload: ForgotPasswordPayload) {
  return apiClient<ApiResponse<IOtpSession>>(
    "/auth/resend-forgot-password-otp",
    { method: "POST", body: payload },
  );
}

export function resetPassword(payload: ResetPasswordPayload) {
  return apiClient<ApiResponse<null>>("/auth/reset-password", {
    method: "POST",
    body: payload,
  });
}
