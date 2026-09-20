"use client";

import { Search, X } from "lucide-react";
import { type ChangeEvent, Suspense, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/debounce.hook";
import type { IVendorParams } from "@/types";
import AdminVendorsTable from "./admin-vendors-table";
import AdminVendorsTableLoading from "./admin-vendors-table-loading";
import VendorPerformanceSheet from "./vendor-performance-sheet";

export default function AdminVendorsTabs() {
  const [selectedId, setSelectedId] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(searchInput);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setPage(1);
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setPage(1);
  };

  const queryParams: IVendorParams = {
    page,
    limit: 10,
    ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),
  };

  return (
    <>
      <Card>
        <CardContent className="flex-1">
          <div className="relative w-full max-w-xs pb-4">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search vendors by name or email"
              value={searchInput}
              onChange={(e) => handleSearch(e)}
              className="h-9 rounded-lg pr-9 pl-9 shadow-sm [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-cancel-button]:hidden"
            />
            {searchInput && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={handleClearSearch}
                className="absolute top-1/2 right-2.5 flex -translate-y-1/2 items-center rounded-md p-0.5 text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          <Suspense fallback={<AdminVendorsTableLoading />}>
            <AdminVendorsTable
              {...queryParams}
              handleView={setSelectedId}
              handlePageChange={setPage}
            />
          </Suspense>
        </CardContent>
      </Card>

      <VendorPerformanceSheet
        vendorId={selectedId}
        onClose={() => setSelectedId("")}
      />
    </>
  );
}
