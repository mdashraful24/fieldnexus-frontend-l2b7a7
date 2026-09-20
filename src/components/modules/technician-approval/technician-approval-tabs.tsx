"use client";

import { Search, X } from "lucide-react";
import { type ChangeEvent, Suspense, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useDebounce from "@/hooks/debounce.hook";
import type { ITechnicianApplicationStatus, ITechnicianParams } from "@/types";
import TechnicianReviewSheet from "./technician-approval-sheet";
import TechnicianApprovalTable from "./technician-approval-table";
import TechnicianApprovalTableLoading from "./technician-approval-table-loading";

const verificationStatus: ["ALL" | ITechnicianApplicationStatus, string][] = [
  ["ALL", "All"],
  ["PENDING", "Pending"],
  ["APPROVED", "Approved"],
  ["REJECTED", "Rejected"],
];

export default function TechnicianApprovalTabs() {
  const [tab, setTab] = useState<"ALL" | ITechnicianApplicationStatus>("ALL");
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

  const queryParams: ITechnicianParams = {
    page,
    limit: 10,
    ...(tab === "ALL" ? {} : { status: tab }),
    ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),
  };

  return (
    <Card>
      <CardContent className="flex-1">
        <div className="flex flex-col justify-between gap-3 pb-4 md:flex-row md:items-center">
          <div className="relative w-full md:max-w-xs">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by name or email"
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
          <Tabs
            value={tab}
            onValueChange={(value) => {
              setTab(value);
              setPage(1);
            }}
          >
            <TabsList className="w-full justify-start md:w-auto">
              {verificationStatus.map(([value, label]) => (
                <TabsTrigger value={value} key={value} className="flex-1">
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <Suspense fallback={<TechnicianApprovalTableLoading />}>
          <TechnicianApprovalTable
            {...queryParams}
            handleReview={setSelectedId}
            handlePageChange={setPage}
          />
        </Suspense>
      </CardContent>

      {selectedId && (
        <Suspense
          fallback={
            <div className="space-y-4 p-4">
              <Skeleton className="h-6 w-44" />
              <div className="flex gap-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-20" />
              </div>
              <div className="space-y-3 pt-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          }
        >
          <TechnicianReviewSheet
            selectedId={selectedId}
            onClose={() => setSelectedId("")}
            {...queryParams}
          />
        </Suspense>
      )}
    </Card>
  );
}
