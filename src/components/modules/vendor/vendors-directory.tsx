"use client";

import {
  Building2,
  Inbox,
  Mail,
  MapPin,
  Phone,
  Search,
  Star,
  X,
} from "lucide-react";
import Link from "next/link";
import { type ChangeEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import TablePagination from "@/components/ui/table-pagination";
import useDebounce from "@/hooks/debounce.hook";
import { useSuspenseGetAllVendors } from "@/hooks/vendor.hook";
import type { IVendorParams, VendorStatus } from "@/types";
import VendorStatusBadge from "./vendor-status-badge";

function VendorCard({
  name,
  email,
  contactNumber,
  description,
  address,
  serviceAreas,
  rating,
  status,
  vendorId,
}: {
  name: string;
  email: string;
  contactNumber?: string | null;
  description?: string | null;
  address?: string | null;
  serviceAreas?: string | null;
  rating: number;
  status: VendorStatus;
  vendorId: string;
}) {
  const initials = name
    .split(/\s+/)
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Card className="flex h-full flex-col">
      <CardContent className="flex flex-1 flex-col gap-4">
        <div className="flex items-start gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-sm font-semibold text-primary">
            {initials || "V"}
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="truncate font-heading text-base font-semibold">
              {name}
            </h3>
            <div className="mt-1 flex flex-wrap items-center gap-2">
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
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {description}
          </p>
        ) : null}

        <dl className="mt-auto space-y-1.5 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Mail className="size-3.5 shrink-0" />
            <dd className="truncate">{email}</dd>
          </div>
          {contactNumber ? (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="size-3.5 shrink-0" />
              <dd className="truncate">{contactNumber}</dd>
            </div>
          ) : null}
          {address ? (
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="size-3.5 shrink-0" />
              <dd className="truncate">{address}</dd>
            </div>
          ) : null}
          {serviceAreas ? (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Building2 className="size-3.5 shrink-0" />
              <dd className="truncate">{serviceAreas}</dd>
            </div>
          ) : null}
        </dl>

        <Button
          variant="outline"
          size="sm"
          className="w-full"
          render={<Link href={`/vendors/details?vendorId=${vendorId}`} />}
          nativeButton={false}
        >
          View Vendor &amp; Team
        </Button>
      </CardContent>
    </Card>
  );
}

export default function VendorsDirectory() {
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(searchInput);

  const params: IVendorParams = {
    page,
    limit: 9,
    ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),
  };

  const { data } = useSuspenseGetAllVendors(params);

  const vendors = data?.data ?? [];
  const totalPages = data?.meta?.totalPages ?? 0;
  const total = data?.meta?.total ?? 0;

  useEffect(() => {
    if (page > 1 && (totalPages === 0 || page > totalPages)) {
      setPage(totalPages > 0 ? totalPages : 1);
    }
  }, [totalPages, page]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setPage(1);
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setPage(1);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <p className="text-sm text-muted-foreground">
          {total} {total === 1 ? "vendor" : "vendors"} available
        </p>

        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search vendors by name or email"
            value={searchInput}
            onChange={handleSearch}
            className="h-9 rounded-lg pr-9 pl-9 shadow-sm [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-cancel-button]:hidden"
          />
          {searchInput ? (
            <button
              type="button"
              aria-label="Clear search"
              onClick={handleClearSearch}
              className="absolute top-1/2 right-2.5 flex -translate-y-1/2 items-center rounded-md p-0.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          ) : null}
        </div>
      </div>

      {vendors.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed p-12 text-center">
          <Inbox className="size-8 text-muted-foreground opacity-50" />
          <p className="text-sm text-muted-foreground">
            {debouncedSearch
              ? "No vendors match your search."
              : "No vendors are available right now."}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {vendors.map((vendor) => (
            <VendorCard
              key={vendor.id}
              vendorId={vendor.id}
              name={vendor.name}
              email={vendor.email}
              contactNumber={vendor.contactNumber}
              description={vendor.description}
              address={vendor.address}
              serviceAreas={vendor.serviceAreas}
              rating={vendor.rating}
              status={vendor.status}
            />
          ))}
        </div>
      )}

      <TablePagination
        page={page}
        totalPages={totalPages}
        handlePageChange={setPage}
      />
    </div>
  );
}
