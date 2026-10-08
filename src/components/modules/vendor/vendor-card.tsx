"use client";

import { Building2, Mail, MapPin, Phone, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { VendorStatus } from "@/types";
import VendorStatusBadge from "./vendor-status-badge";

export interface VendorCardProps {
  name: string;
  email: string;
  contactNumber?: string | null;
  description?: string | null;
  address?: string | null;
  serviceAreas?: string | null;
  rating: number;
  status: VendorStatus;
  vendorId: string;
}

export default function VendorCard({
  name,
  email,
  contactNumber,
  description,
  address,
  serviceAreas,
  rating,
  status,
  vendorId,
}: VendorCardProps) {
  const initials = name
    .split(/\s+/)
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Card className="flex h-full flex-col px-4 py-8 rounded-3xl hover:shadow-lg dark:hover:shadow-primary transition-shadow duration-300">
      <CardContent className="flex flex-1 flex-col gap-5">
        <div className="flex items-start gap-4">
          <span className="grid size-14 shrink-0 place-items-center rounded-xl bg-primary/10 text-lg font-semibold text-blue-500">
            {initials || "V"}
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg truncate font-heading font-semibold">
              {name}
            </h3>
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              <VendorStatusBadge status={status} />
              {rating ? (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
                  <Star className="size-3.5 fill-amber-400 text-amber-400" />
                  {rating.toFixed(1)}
                </span>
              ) : null}
            </div>
          </div>
        </div>

        {description ? (
          <p className="line-clamp-3 text-sm text-foreground">{description}</p>
        ) : null}

        <dl className="mt-auto space-y-2 text-sm">
          <div className="flex items-center gap-2 text-foreground">
            <Mail className="size-3.5 shrink-0" />
            <dd className="truncate">{email}</dd>
          </div>
          {contactNumber ? (
            <div className="flex items-center gap-2 text-foreground">
              <Phone className="size-3.5 shrink-0" />
              <dd className="truncate">{contactNumber}</dd>
            </div>
          ) : null}
          {address ? (
            <div className="flex items-center gap-2 text-foreground">
              <MapPin className="size-3.5 shrink-0" />
              <dd className="truncate">{address}</dd>
            </div>
          ) : null}
          {serviceAreas ? (
            <div className="flex items-center gap-2 text-foreground">
              <Building2 className="size-3.5 shrink-0" />
              <dd className="truncate">{serviceAreas}</dd>
            </div>
          ) : null}
        </dl>

        <Button
          variant="outline"
          className="w-full p-5 bg-primary/80 hover:bg-primary dark:bg-primary text-white hover:text-white transition-colors duration-300 mt-3"
          render={<Link href={`/vendors/details?vendorId=${vendorId}`} />}
          nativeButton={false}
        >
          View Vendor &amp; Team
        </Button>
      </CardContent>
    </Card>
  );
}
