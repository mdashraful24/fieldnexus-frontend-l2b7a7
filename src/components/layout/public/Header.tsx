"use client";

import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useGetMe, useLogout } from "@/hooks/auth.hook";
import { getApiErrorMessage } from "@/lib/apiError";

export default function Header() {
  const routes = [
    { name: "Home", url: "/" },
    { name: "About us", url: "/about-us" },
  ];

  const { data, isLoading } = useGetMe();
  const { mutate: logout } = useLogout();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.add({
          title: "Logout Successful",
          description: "You have been successfully logged out.",
          type: "success",
        });
        queryClient.removeQueries({ queryKey: ["USER"] });
      },
      onError: (err) => {
        toast.add({
          title: "Logout Failed",
          description: getApiErrorMessage(err),
          type: "error",
        });
      },
    });
  };

  return (
    <header className="w-full h-16 border border-b">
      <div className="flex items-center justify-between h-full max-w-7xl mx-auto px-4">
        <div>Field Nexus</div>

        <nav className="flex gap-5">
          {routes.map((route) => (
            <Link key={route.url} href={route.url}>
              {route.name}
            </Link>
          ))}
        </nav>

        <div>
          {!isLoading && !data && (
            <Button
              variant="outline"
              render={<Link href="/login" />}
              nativeButton={false}
            >
              Login
            </Button>
          )}
          {!isLoading && data && (
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
