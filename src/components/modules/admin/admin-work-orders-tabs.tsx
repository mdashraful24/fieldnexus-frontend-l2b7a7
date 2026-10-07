"use client";

import { Search, X } from "lucide-react";
import { type ChangeEvent, Suspense, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useDebounce from "@/hooks/debounce.hook";
import type {
  IWorkOrder,
  IWorkOrderParams,
  WorkOrderListFilter,
  WorkOrderPriority,
  WorkOrderStatus,
} from "@/types";
import AdminWorkOrdersTable from "./admin-work-orders-table";
import AdminWorkOrdersTableLoading from "./admin-work-orders-table-loading";
import WorkOrderAssignModal from "./work-order-assign-modal";
import WorkOrderDetailsSheet from "./work-order-details-sheet";
import WorkOrderStatusDialog from "./work-order-status-dialog";

const statusOptions: WorkOrderStatus[] = [
  "PENDING",
  "APPROVED",
  "ASSIGNED",
  "ACCEPTED",
  "EN_ROUTE",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
  "FAILED",
  "REASSIGNED",
];

const priorityOptions: WorkOrderPriority[] = [
  "LOW",
  "MEDIUM",
  "HIGH",
  "URGENT",
];

const listTabs: WorkOrderListFilter[] = ["ALL", "DELETED"];

const selectClassName =
  "h-9 w-full appearance-none rounded-lg border bg-background px-3 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:opacity-50 lg:w-40";

export default function AdminWorkOrdersTabs() {
  const [searchInput, setSearchInput] = useState("");
  const [listTab, setListTab] = useState<WorkOrderListFilter>("ALL");
  const [statusFilter, setStatusFilter] = useState<WorkOrderStatus | "">("");
  const [priorityFilter, setPriorityFilter] = useState<WorkOrderPriority | "">(
    "",
  );
  const [page, setPage] = useState(1);

  const [detailsId, setDetailsId] = useState("");
  const [assignWorkOrder, setAssignWorkOrder] = useState<IWorkOrder | null>(
    null,
  );
  const [statusWorkOrder, setStatusWorkOrder] = useState<IWorkOrder | null>(
    null,
  );

  const debouncedSearch = useDebounce(searchInput);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setPage(1);
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setPage(1);
  };

  const queryParams: IWorkOrderParams = {
    page,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "desc",
    ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),
    ...(statusFilter ? { status: statusFilter } : {}),
    ...(priorityFilter ? { priority: priorityFilter } : {}),
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
                placeholder="Search by order number or title"
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
                  setListTab(value as WorkOrderListFilter);
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

              <select
                aria-label="Filter by status"
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value as WorkOrderStatus | "");
                  setPage(1);
                }}
                className={selectClassName}
              >
                <option value="">All statuses</option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0) + status.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>

              <select
                aria-label="Filter by priority"
                value={priorityFilter}
                onChange={(e) => {
                  setPriorityFilter(e.target.value as WorkOrderPriority | "");
                  setPage(1);
                }}
                className={selectClassName}
              >
                <option value="">All priorities</option>
                {priorityOptions.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority.charAt(0) + priority.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Suspense fallback={<AdminWorkOrdersTableLoading />}>
            <AdminWorkOrdersTable
              {...queryParams}
              listFilter={listTab}
              handleDetails={setDetailsId}
              handleAssign={setAssignWorkOrder}
              handleStatus={setStatusWorkOrder}
              handlePageChange={setPage}
            />
          </Suspense>
        </CardContent>
      </Card>

      <WorkOrderDetailsSheet
        selectedId={detailsId}
        onClose={() => setDetailsId("")}
      />

      <WorkOrderAssignModal
        workOrder={assignWorkOrder}
        onClose={() => setAssignWorkOrder(null)}
      />

      <WorkOrderStatusDialog
        workOrder={statusWorkOrder}
        onClose={() => setStatusWorkOrder(null)}
      />
    </>
  );
}
