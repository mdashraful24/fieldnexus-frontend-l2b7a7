"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";
import { useGetMe } from "@/hooks";
import { getDashboardPath } from "@/lib/dashboard";
import AuthLoading from "./auth-loading";

export default function GuestGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { data, isPending } = useGetMe();

  const user = data?.data;

  useEffect(() => {
    if (isPending || !user) return;

    router.replace(getDashboardPath(user.role));
  }, [isPending, user, router]);

  if (isPending) {
    return <AuthLoading />;
  }

  if (user) {
    return <AuthLoading label="Redirecting to your dashboard..." />;
  }

  return <>{children}</>;
}
