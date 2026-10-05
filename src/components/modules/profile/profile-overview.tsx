"use client";

import {
  BadgeCheck,
  CalendarDays,
  Image as ImageIcon,
  Loader2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetMe } from "@/hooks";
import type { UserRole } from "@/types/user.type";
import UserStatusBadge from "../admin/user-status-badge";

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

function formatDate(value?: string | null) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function Detail({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <div className="text-sm break-words">{children}</div>
      </div>
    </div>
  );
}

export default function ProfileOverview() {
  const { data: meData, isPending } = useGetMe();

  const user = meData?.data;

  if (isPending || !user) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const role = user.role as UserRole;
  const customer = user.customer;

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Profile Summary</CardTitle>
          <CardDescription>
            A read-only overview of your account details.
          </CardDescription>
          <CardAction>
            <Button
              variant="outline"
              size="sm"
              nativeButton={false}
              render={<Link href="/profile/edit" />}
            >
              Edit Profile
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-4">
            <Avatar className="size-20">
              {user.imageUrl ? (
                <AvatarImage src={user.imageUrl} alt={user.name} />
              ) : null}
              <AvatarFallback className="bg-primary/10 text-xl font-semibold text-primary">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-heading text-lg font-semibold">
                  {user.name}
                </p>
                {user.emailVerified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <BadgeCheck size="12" />
                    Verified
                  </span>
                )}
              </div>
              <p className="truncate text-sm text-muted-foreground">
                {user.email}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                  {roleLabels[role] ?? role}
                </span>
                <UserStatusBadge status={user.status} />
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid gap-5 sm:grid-cols-2">
            <Detail icon={<UserRound size="16" />} label="Full name">
              {user.name}
            </Detail>
            <Detail icon={<Mail size="16" />} label="Email address">
              {user.email}
            </Detail>
            <Detail icon={<ShieldCheck size="16" />} label="Account status">
              <UserStatusBadge status={user.status} />
            </Detail>
            <Detail icon={<CalendarDays size="16" />} label="Member since">
              {formatDate(user.createdAt)}
            </Detail>
          </div>
        </CardContent>
      </Card>

      {customer && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Customer Details</CardTitle>
            <CardDescription>
              Information linked to your customer record.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5 sm:grid-cols-2">
            <Detail icon={<Phone size="16" />} label="Contact number">
              {customer.contactNumber || "—"}
            </Detail>
            <Detail icon={<MapPin size="16" />} label="Address">
              {customer.address || "—"}
            </Detail>
          </CardContent>
        </Card>
      )}

      {!user.imageUrl && (
        <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <ImageIcon size="16" />
          No profile picture uploaded yet.
        </p>
      )}
    </div>
  );
}
