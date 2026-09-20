"use client";

// Action-search filter (temporarily disabled). Uncomment to restore:
// import { type ChangeEvent } from "react";
// import { Input } from "@/components/ui/input";
// import useDebounce from "@/hooks/debounce.hook";
import { Suspense, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { IAuditLogParams } from "@/types";
import AdminAuditLogsTableLoading from "./admin-audit-logs-loading";
import AdminAuditLogsTable from "./admin-audit-logs-table";

type AuditLogEntityFilter = "all" | "user" | "technician-application";

const entityFilters: AuditLogEntityFilter[] = [
  "all",
  "user",
  "technician-application",
];

const entityFilterMeta: Record<
  AuditLogEntityFilter,
  { label: string; entityType?: string }
> = {
  all: { label: "All" },
  user: { label: "Users", entityType: "User" },
  "technician-application": {
    label: "Applications",
    entityType: "TechnicianApplication",
  },
};

export default function AdminAuditLogs() {
  const [entityTab, setEntityTab] = useState<AuditLogEntityFilter>("all");
  const [page, setPage] = useState(1);

  // Action-search filter (disabled). Uncomment these lines to re-enable:
  // const [action, setAction] = useState("");
  // const debouncedAction = useDebounce(action);
  //
  // const handleActionChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setAction(e.target.value);
  //   setPage(1);
  // };

  const currentEntityType = entityFilterMeta[entityTab].entityType;

  const queryParams: IAuditLogParams = {
    page,
    limit: 10,
    // ...(debouncedAction ? { action: debouncedAction } : {}),
    ...(currentEntityType ? { entityType: currentEntityType } : {}),
  };

  return (
    <Card>
      <CardContent className="flex-1">
        <div className="flex flex-col justify-between gap-3 pb-4 md:flex-row md:items-center">
          {/* Action-search filter (disabled). Uncomment to re-enable:
          <Input
            type="search"
            placeholder="Filter by action (e.g. USER_STATUS_UPDATED)"
            value={action}
            onChange={handleActionChange}
            className="h-9 max-w-xs rounded-lg shadow-sm"
          />
          */}
          <Tabs
            value={entityTab}
            onValueChange={(value) => {
              setEntityTab(value as AuditLogEntityFilter);
              setPage(1);
            }}
            className="md:ml-auto"
          >
            <TabsList className="w-full justify-start md:w-auto">
              {entityFilters.map((filter) => (
                <TabsTrigger value={filter} key={filter} className="flex-1">
                  {entityFilterMeta[filter].label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <Suspense fallback={<AdminAuditLogsTableLoading />}>
          <AdminAuditLogsTable {...queryParams} handlePageChange={setPage} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
