"use client";

import { Inbox, Search, X } from "lucide-react";
import { type ChangeEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import TablePagination from "@/components/ui/table-pagination";
import useDebounce from "@/hooks/debounce.hook";
import { useGetPublicVendors } from "@/hooks/vendor.hook";
import VendorCard from "./vendor-card";
import VendorsDirectoryLoading from "./vendors-directory-loading";
import type { IVendorParams } from "@/types";

export default function VendorsDirectory() {
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(searchInput);

  const params: IVendorParams = {
    page,
    limit: 9,
    ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),
  };

  const { data, isLoading, isError } = useGetPublicVendors(params);

  const vendors = data?.data ?? [];
  const totalPages = data?.meta?.totalPages ?? 0;
  const total = data?.meta?.total ?? 0;

  useEffect(() => {
    if (page > 1 && (totalPages === 0 || page > totalPages)) {
      setPage(totalPages > 0 ? totalPages : 1);
    }
  }, [totalPages, page]);

  if (isLoading) {
    return <VendorsDirectoryLoading />;
  }

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
        <p className="text-sm text-foreground">
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
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
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
