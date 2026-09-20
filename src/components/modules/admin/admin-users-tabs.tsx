"use client";

import { Search, Trash2, X } from "lucide-react";
import { type ChangeEvent, Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/toast";
import { useBulkUpdateUserStatus } from "@/hooks";
import useDebounce from "@/hooks/debounce.hook";
import { getApiErrorMessage } from "@/lib/apiError";
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
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [blockPopoverOpen, setBlockPopoverOpen] = useState(false);
  const [deletePopoverOpen, setDeletePopoverOpen] = useState(false);

  const { mutate: bulkUpdateStatus, isPending: isBulkUpdating } =
    useBulkUpdateUserStatus();

  const debouncedSearch = useDebounce(searchInput);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setPage(1);
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setPage(1);
  };

  const handleToggleRow = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleToggleAll = (ids: string[]) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      const allSelected = ids.every((id) => next.has(id));
      if (allSelected) {
        ids.forEach((id) => {
          next.delete(id);
        });
      } else {
        ids.forEach((id) => {
          next.add(id);
        });
      }
      return next;
    });
  };

  const handleBulkAction = (status: UserStatus) => {
    bulkUpdateStatus(
      { userIds: Array.from(selectedIds), status },
      {
        onSuccess: () => {
          const count = selectedIds.size;
          setSelectedIds(new Set());
          setBlockPopoverOpen(false);
          setDeletePopoverOpen(false);
          toast.add({
            title: "Success",
            description: `${count} user${
              count === 1 ? "" : "s"
            } ${status === "BLOCKED" ? "blocked" : "deleted"} successfully.`,
            type: "success",
          });
          setStatusTab(status === "BLOCKED" ? "BLOCKED" : "DELETED");
          setPage(1);
        },
        onError: (err) => {
          toast.add({
            title: "Error",
            description: getApiErrorMessage(
              err,
              "An error occurred while updating the selected users.",
            ),
            type: "error",
          });
        },
      },
    );
  };

  const queryParams: IAdminUsersParams = {
    page,
    limit: 10,
    ...(statusTab === "ALL" ? {} : { status: statusTab as UserStatus }),
    ...(roleTab === "ALL" ? {} : { role: roleTab }),
    ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),
    includeDeleted: true,
  };

  const selectedCount = selectedIds.size;

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

          {selectedCount > 0 && (
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border bg-muted/40 px-4 py-2.5">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {selectedCount}
                </span>{" "}
                user{selectedCount === 1 ? "" : "s"} selected
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedIds(new Set())}
                  disabled={isBulkUpdating}
                >
                  Clear
                </Button>

                <Popover
                  open={blockPopoverOpen}
                  onOpenChange={setBlockPopoverOpen}
                >
                  <PopoverTrigger
                    render={<Button variant="outline" size="sm" />}
                  >
                    Block
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <PopoverTitle>
                      Block {selectedCount} user
                      {selectedCount === 1 ? "" : "s"}?
                    </PopoverTitle>
                    <PopoverDescription>
                      Blocked users won't be able to sign in until an admin
                      unblocks them.
                    </PopoverDescription>
                    <div className="mt-4 flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setBlockPopoverOpen(false)}
                        disabled={isBulkUpdating}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleBulkAction("BLOCKED")}
                        disabled={isBulkUpdating}
                      >
                        {isBulkUpdating ? (
                          <>
                            <Spinner />
                            Blocking...
                          </>
                        ) : (
                          `Block (${selectedCount})`
                        )}
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>

                <Popover
                  open={deletePopoverOpen}
                  onOpenChange={setDeletePopoverOpen}
                >
                  <PopoverTrigger
                    render={
                      <Button variant="destructive" size="sm">
                        {isBulkUpdating ? (
                          <>
                            <Spinner />
                            Deleting...
                          </>
                        ) : (
                          <>
                            <Trash2 />
                            Delete
                          </>
                        )}
                      </Button>
                    }
                  />
                  <PopoverContent className="w-80">
                    <PopoverTitle>
                      Delete {selectedCount} user
                      {selectedCount === 1 ? "" : "s"}?
                    </PopoverTitle>
                    <PopoverDescription>
                      This soft-deletes the selected accounts. They can be
                      restored later from the Deleted tab.
                    </PopoverDescription>
                    <div className="mt-4 flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDeletePopoverOpen(false)}
                        disabled={isBulkUpdating}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleBulkAction("DELETED")}
                        disabled={isBulkUpdating}
                      >
                        {isBulkUpdating ? (
                          <>
                            <Spinner />
                            Deleting...
                          </>
                        ) : (
                          `Delete (${selectedCount})`
                        )}
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          )}

          <Suspense fallback={<AdminUsersTableLoading />}>
            <AdminUsersTable
              {...queryParams}
              handleView={setSelectedId}
              handlePageChange={setPage}
              selectedIds={selectedIds}
              handleToggleRow={handleToggleRow}
              handleToggleAll={handleToggleAll}
            />
          </Suspense>
        </CardContent>
      </Card>

      <AdminUserDetailSheet
        selectedId={selectedId}
        onClose={() => setSelectedId("")}
        onUserDeleted={() => {
          setSelectedId("");
          setStatusTab("DELETED");
          setPage(1);
        }}
      />
    </>
  );
}
