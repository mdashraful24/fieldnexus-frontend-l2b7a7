"use client";

import { Search, X } from "lucide-react";
import { type ChangeEvent, Suspense, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useDebounce from "@/hooks/debounce.hook";
import type {
  AdminUsersRoleFilter,
  AdminUsersStatusFilter,
  IAdminUsersParams,
  UserStatus,
} from "@/types";
import AdminUserDetailSheet from "./admin-user-detail-sheet";
import AdminUsersTable from "./admin-users-table";
import AdminUsersTableLoading from "./admin-users-table-loading";

const statusTabs: AdminUsersStatusFilter[] = [
  "ALL",
  "ACTIVE",
  "BLOCKED",
  "DELETED",
];
const roleTabs: AdminUsersRoleFilter[] = ["ALL", "CUSTOMER", "TECHNICIAN"];

export default function AdminUsersTabs() {
  const [statusTab, setStatusTab] = useState<AdminUsersStatusFilter>("ALL");
  const [roleTab, setRoleTab] = useState<AdminUsersRoleFilter>("ALL");
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

  const queryParams: IAdminUsersParams = {
    page,
    limit: 10,
    ...(statusTab === "ALL" ? {} : { status: statusTab as UserStatus }),
    ...(roleTab === "ALL" ? {} : { role: roleTab }),
    ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),
    ...(statusTab === "DELETED" ? { includeDeleted: true } : {}),
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
              value={roleTab}
              onValueChange={(value) => {
                setRoleTab(value as AdminUsersRoleFilter);
                setPage(1);
              }}
            >
              <TabsList className="w-full justify-start md:w-auto">
                {roleTabs.map((tab) => (
                  <TabsTrigger value={tab} key={tab} className="flex-1">
                    {tab === "ALL"
                      ? "All Roles"
                      : tab.charAt(0).toUpperCase() +
                        tab.slice(1).toLowerCase()}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <Tabs
              value={statusTab}
              onValueChange={(value) => {
                setStatusTab(value as AdminUsersStatusFilter);
                setPage(1);
              }}
            >
              <TabsList className="w-full justify-start md:w-auto">
                {statusTabs.map((tab) => (
                  <TabsTrigger value={tab} key={tab} className="flex-1">
                    {tab === "ALL"
                      ? "All"
                      : tab.charAt(0).toUpperCase() +
                        tab.slice(1).toLowerCase()}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <Suspense fallback={<AdminUsersTableLoading />}>
            <AdminUsersTable
              {...queryParams}
              handleView={setSelectedId}
              handlePageChange={setPage}
            />
          </Suspense>
        </CardContent>
      </Card>

      <AdminUserDetailSheet
        selectedId={selectedId}
        onClose={() => setSelectedId("")}
      />
    </>
  );
}
