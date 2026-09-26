"use client";

import {
  AlertTriangle,
  ArrowLeft,
  Award,
  BadgeCheck,
  Building2,
  Mail,
  MapPin,
  Phone,
  Star,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetVendorById } from "@/hooks/vendor.hook";
import { getApiErrorMessage } from "@/lib/apiError";
import type { IVendorMember } from "@/types";
import VendorStatusBadge from "./vendor-status-badge";

function Detail({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Mail;
  label: string;
  value?: string | null;
}) {
  if (!value) {
    return null;
  }

  return (
    <div className="flex items-start gap-2.5">
      <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm break-words">{value}</p>
      </div>
    </div>
  );
}

function MemberCard({ member }: { member: IVendorMember }) {
  const technician = member.technician;
  const name = technician?.name ?? "Team member";
  const initials = name
    .split(/\s+/)
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Card>
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-start gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
            {initials || "T"}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{name}</p>
            {technician?.email ? (
              <p className="truncate text-xs text-muted-foreground">
                {technician.email}
              </p>
            ) : null}
          </div>
        </div>

        <div className="space-y-1.5 text-xs text-muted-foreground">
          {technician?.contactNumber ? (
            <p className="flex items-center gap-1.5">
              <Phone className="size-3 shrink-0" />
              {technician.contactNumber}
            </p>
          ) : null}
          {technician?.experienceYears != null ? (
            <p className="flex items-center gap-1.5">
              <Award className="size-3 shrink-0" />
              {technician.experienceYears} year
              {technician.experienceYears === 1 ? "" : "s"} experience
            </p>
          ) : null}
          {technician?.qualifications ? (
            <p className="flex items-start gap-1.5">
              <BadgeCheck className="mt-0.5 size-3 shrink-0" />
              {technician.qualifications}
            </p>
          ) : null}
        </div>

        {technician?.skills && technician.skills.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {technician.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center rounded-md bg-muted px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

export default function VendorDetailsView() {
  const searchParams = useSearchParams();
  const vendorId = searchParams.get("vendorId") ?? "";

  const { data, isPending, isError, error } = useGetVendorById(vendorId);

  const vendor = data?.data;
  const members = vendor?.members ?? [];

  const backLink = (
    <Button
      variant="outline"
      size="sm"
      nativeButton={false}
      render={<Link href="/vendors" />}
    >
      <ArrowLeft className="size-4" />
      Back to Vendors
    </Button>
  );

  if (!vendorId) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-3 p-10 text-center">
          <span className="grid size-12 place-items-center rounded-full bg-destructive/10 text-destructive">
            <AlertTriangle className="size-6" />
          </span>
          <h2 className="text-base font-semibold">No vendor selected</h2>
          <p className="max-w-xs text-sm text-muted-foreground">
            Pick a vendor from the directory to see their details and team.
          </p>
          {backLink}
        </CardContent>
      </Card>
    );
  }

  if (isPending) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-40 w-full rounded-xl" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <Skeleton key={item} className="h-32 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (isError || !vendor) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-3 p-10 text-center">
          <span className="grid size-12 place-items-center rounded-full bg-destructive/10 text-destructive">
            <AlertTriangle className="size-6" />
          </span>
          <h2 className="text-base font-semibold">Unable to load vendor</h2>
          <p className="max-w-xs text-sm text-muted-foreground">
            {getApiErrorMessage(
              error,
              "This vendor does not exist or is no longer available.",
            )}
          </p>
          {backLink}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        {backLink}
      </div>

      <Card>
        <CardContent className="flex flex-col gap-5">
          <div className="flex flex-wrap items-start gap-4">
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-primary/10 text-lg font-semibold text-primary">
              {vendor.name.charAt(0).toUpperCase()}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-heading text-2xl font-semibold tracking-tight">
                  {vendor.name}
                </h1>
                <VendorStatusBadge status={vendor.status} />
              </div>
              {vendor.rating ? (
                <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Star className="size-4 fill-amber-400 text-amber-400" />
                  {vendor.rating.toFixed(1)} out of 5
                </p>
              ) : null}
            </div>
          </div>

          {vendor.description ? (
            <p className="text-sm text-muted-foreground">
              {vendor.description}
            </p>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2">
            <Detail icon={Mail} label="Email" value={vendor.email} />
            <Detail
              icon={Phone}
              label="Contact number"
              value={vendor.contactNumber}
            />
            <Detail icon={MapPin} label="Address" value={vendor.address} />
            <Detail
              icon={Building2}
              label="Service areas"
              value={vendor.serviceAreas}
            />
          </div>
        </CardContent>
      </Card>

      <div>
        <div className="mb-3 flex items-center gap-2">
          <Users className="size-4 text-muted-foreground" />
          <h2 className="font-heading text-lg font-semibold">
            Team ({members.length})
          </h2>
        </div>

        {members.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-sm text-muted-foreground">
              This vendor has no technicians listed right now.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
