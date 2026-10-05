"use client";

import { useQueryClient } from "@tanstack/react-query";
import { LogOut, UserPen, UserRound } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/toast";
import { useGetMe, useLogout } from "@/hooks";
import { getApiErrorMessage } from "@/lib/apiError";
import type { UserRole } from "@/types/user.type";

const roleLabels: Record<UserRole, string> = {
  SUPER_ADMIN: "Super Admin",
  ADMIN: "Admin",
  TECHNICIAN: "Technician",
  CUSTOMER: "Customer",
};

function getInitials(name: string) {
  return (
    name
      .split(/\s+/)
      .map((part) => part.charAt(0))
      .slice(0, 2)
      .join("")
      .toUpperCase() || "U"
  );
}

function UserAvatar({
  name,
  imageUrl,
  className,
  fallbackClassName,
}: {
  name: string;
  imageUrl?: string | null;
  className?: string;
  fallbackClassName?: string;
}) {
  return (
    <Avatar className={className}>
      {imageUrl ? <AvatarImage src={imageUrl} alt={name} /> : null}
      <AvatarFallback
        className={`bg-primary/10 font-semibold text-primary ${fallbackClassName ?? ""}`}
      >
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
}

export default function UserAvatarMenu() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: meData, isPending } = useGetMe();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  const user = meData?.data;

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        queryClient.removeQueries({ queryKey: ["USER"] });
        toast.add({
          title: "Logout Successful",
          description: "You have been successfully logged out.",
          type: "success",
        });
        router.push("/login");
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

  if (isPending || !user) {
    return <Skeleton className="size-8 shrink-0 rounded-full" />;
  }

  const role = user.role as UserRole;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open account menu"
            className="size-9 rounded-full"
          />
        }
      >
        <UserAvatar
          name={user.name}
          imageUrl={user.imageUrl}
          className="size-8"
          fallbackClassName="text-xs"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64">
        <div className="flex items-center gap-3 px-2 py-2">
          <UserAvatar name={user.name} imageUrl={user.imageUrl} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{user.name}</p>
            <p className="truncate text-xs text-muted-foreground">
              {user.email}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {roleLabels[role] ?? role}
            </p>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          nativeButton={false}
          render={<Link href="/profile/edit" />}
        >
          <UserPen />
          Edit Profile
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          disabled={isLoggingOut}
          onClick={handleLogout}
        >
          <LogOut />
          {isLoggingOut ? "Logging out..." : "Logout"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
