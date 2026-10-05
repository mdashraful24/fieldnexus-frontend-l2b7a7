import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  forgotPassword,
  getMe,
  googleOAuth,
  resendForgotPasswordOtp,
  resendRegistrationOtp,
  resetPassword,
  userLogin,
  userLogout,
  userRegistration,
  verifyAccount,
} from "@/api";
import { getDashboardPath } from "@/lib/dashboard";

export function useRegistration() {
  return useMutation({
    mutationFn: userRegistration,
  });
}

export function useVerifyAccount() {
  return useMutation({
    mutationFn: verifyAccount,
  });
}

export function useResendRegistrationOtp() {
  return useMutation({
    mutationFn: resendRegistrationOtp,
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: userLogin,
  });
}

export function useGoogleOAuth() {
  return useMutation({
    mutationFn: googleOAuth,
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: userLogout,
  });
}

export function useGetMe() {
  return useQuery({
    queryKey: ["USER"],
    queryFn: getMe,
    retry: false,
  });
}

export function useRedirectToDashboard() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const redirectToDashboard = async () => {
    setIsRedirecting(true);

    try {
      await queryClient.invalidateQueries({ queryKey: ["USER"] });

      const meData = await queryClient.fetchQuery({
        queryKey: ["USER"],
        queryFn: getMe,
        staleTime: 0,
      });

      router.replace(getDashboardPath(meData?.data?.role));
    } catch {
      router.replace(getDashboardPath());
    }
  };

  return { redirectToDashboard, isRedirecting };
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: forgotPassword,
  });
}

export function useResendForgotPasswordOtp() {
  return useMutation({
    mutationFn: resendForgotPasswordOtp,
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: resetPassword,
  });
}
