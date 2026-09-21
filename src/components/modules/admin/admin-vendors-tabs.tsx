"use client";

import { Plus, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { type ChangeEvent, Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useDebounce from "@/hooks/debounce.hook";
import type { IVendor, IVendorParams, VendorListFilter } from "@/types";
import AdminVendorCreateModal from "./admin-vendor-create-modal";
import AdminVendorsTable from "./admin-vendors-table";
import AdminVendorsTableLoading from "./admin-vendors-table-loading";
import VendorPerformanceModal from "./vendor-performance-modal";

const listTabs: VendorListFilter[] = ["ALL", "DELETED"];

export default function AdminVendorsTabs() {
  const router = useRouter();

  const [listTab, setListTab] = useState<VendorListFilter>("ALL");
  const [performanceId, setPerformanceId] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
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

  const handleDetails = (id: string) => {
    router.push(`/admin/vendors/details?vendorId=${id}`);
  };

  const handleMembers = (vendor: IVendor) => {
    router.push(`/admin/vendors/members?vendorId=${vendor.id}`);
  };

  const queryParams: IVendorParams = {
    page,
    limit: 10,
    ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),
    ...(listTab === "DELETED" ? { includeDeleted: true } : {}),
  };

  return (
    <>
      <Card>
        <CardContent className="flex-1">
          <div className="flex flex-col justify-between gap-3 pb-4 lg:flex-row lg:items-center">
            <div className="relative w-full max-w-xs">
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

            <div className="flex flex-wrap items-center gap-2">
              <Tabs
                value={listTab}
                onValueChange={(value) => {
                  setListTab(value as VendorListFilter);
                  setPage(1);
                }}
              >
                <TabsList className="w-full justify-start md:w-auto">
                  {listTabs.map((tab) => (
                    <TabsTrigger value={tab} key={tab} className="flex-1">
                      {tab === "ALL"
                        ? "All"
                        : tab.charAt(0).toUpperCase() +
                          tab.slice(1).toLowerCase()}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              <Button size="sm" onClick={() => setCreateOpen(true)}>
                <Plus />
                Create Vendor
              </Button>
            </div>
          </div>

          <Suspense fallback={<AdminVendorsTableLoading />}>
            <AdminVendorsTable
              {...queryParams}
              listFilter={listTab}
              handlePerformance={setPerformanceId}
              handleDetails={handleDetails}
              handleMembers={handleMembers}
              handlePageChange={setPage}
            />
          </Suspense>
        </CardContent>
      </Card>

      <VendorPerformanceModal
        vendorId={performanceId}
        onClose={() => setPerformanceId("")}
      />

      <AdminVendorCreateModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
      />
    </>
  );
}