"use client";

import { cn } from "cn";
import { Box, FileText, Inbox, UserRound } from "lucide-react";
import { type Dispatch, type SetStateAction, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TablePagination from "@/components/ui/table-pagination";
import { useSuspenseGetAuditLogs } from "@/hooks";
import type { IAuditLogParams } from "@/types";

export interface AdminAuditLogsTableProps extends IAuditLogParams {
  handlePageChange: Dispatch<SetStateAction<number>>;
}

type ActionTone = "positive" | "negative" | "neutral";

const actionMeta: Record<string, { label: string; tone: ActionTone }> = {
  USER_STATUS_UPDATED: { label: "User status updated", tone: "neutral" },
  USER_RESTORED: { label: "User restored", tone: "positive" },
  ADMIN_CREATED: { label: "Admin created", tone: "positive" },
  ADMIN_STATUS_UPDATED: { label: "Admin status updated", tone: "neutral" },
  ADMIN_RESTORED: { label: "Admin restored", tone: "positive" },
  ADMIN_PASSWORD_RESET: { label: "Admin password reset", tone: "negative" },
  ADMIN_EMAIL_CHANGED: { label: "Admin email changed", tone: "neutral" },
  TECHNICIAN_APPLICATION_APPROVED: {
    label: "Application approved",
    tone: "positive",
  },
  TECHNICIAN_APPLICATION_REJECTED: {
    label: "Application rejected",
    tone: "negative",
  },
};

const toneStyles: Record<ActionTone, string> = {
  positive: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  negative: "bg-destructive/10 text-destructive",
  neutral: "bg-primary/10 text-primary",
};

function humanizeAction(action: string): {
  label: string;
  tone: ActionTone;
} {
  const meta = actionMeta[action];
  if (meta) return meta;
  return {
    label: action
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/^\w/, (char) => char.toUpperCase()),
    tone: "neutral" satisfies ActionTone,
  };
}

function humanizeKey(key: string) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase());
}

function formatValue(value: unknown) {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  if (typeof value === "boolean") return value ? "true" : "false";
  if (typeof value === "number") return String(value);
  if (Array.isArray(value)) return `[${value.join(", ")}]`;
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

interface ChangeRow {
  key: string;
  oldValue: string;
  newValue: string;
  kind: "changed" | "added" | "removed";
}

function buildChangeRows(oldValue: unknown, newValue: unknown): ChangeRow[] {
  const isObject = (value: unknown): value is Record<string, unknown> =>
    value !== null && typeof value === "object" && !Array.isArray(value);

  if (!isObject(oldValue) && !isObject(newValue)) {
    const oldStr = formatValue(oldValue);
    const newStr = formatValue(newValue);
    if (oldStr === newStr) return [];
    return [
      {
        key: "",
        oldValue: oldStr,
        newValue: newStr,
        kind: oldStr ? "changed" : "added",
      },
    ];
  }

  const keys = [
    ...new Set([
      ...(isObject(oldValue) ? Object.keys(oldValue) : []),
      ...(isObject(newValue) ? Object.keys(newValue) : []),
    ]),
  ];

  const rows: ChangeRow[] = [];

  for (const key of keys) {
    const oldStr = isObject(oldValue) ? formatValue(oldValue[key]) : "";
    const newStr = isObject(newValue) ? formatValue(newValue[key]) : "";

    if (oldStr === newStr) continue;

    if (!oldStr) {
      rows.push({ key, oldValue: "", newValue: newStr, kind: "added" });
    } else if (!newStr) {
      rows.push({ key, oldValue: oldStr, newValue: "", kind: "removed" });
    } else {
      rows.push({ key, oldValue: oldStr, newValue: newStr, kind: "changed" });
    }
  }

  return rows;
}

function EntityIcon({ entityType }: { entityType: string }) {
  if (entityType === "User") {
    return <UserRound className="size-4" />;
  }

  if (entityType === "TechnicianApplication") {
    return <FileText className="size-4" />;
  }

  return <Box className="size-4" />;
}

export default function AdminAuditLogsTable({
  handlePageChange,
  ...params
}: AdminAuditLogsTableProps) {
  const { data } = useSuspenseGetAuditLogs(params);

  const logs = data?.data ?? [];
  const totalPages = data?.meta?.totalPages ?? 0;
  const page = params.page ?? 1;

  useEffect(() => {
    if (page > 1 && (totalPages === 0 || page > totalPages)) {
      handlePageChange(totalPages > 0 ? totalPages : 1);
    }
  }, [totalPages, page, handlePageChange]);

  return (
    <>
      <div className="overflow-hidden rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Entity</TableHead>
              <TableHead>Actor</TableHead>
              <TableHead className="w-44">Changes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-32 text-center text-muted-foreground"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Inbox className="size-8 opacity-50" />
                    <p className="text-sm">No audit logs found.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              logs.map((entry) => {
                const action = humanizeAction(entry.action);
                const changeRows = buildChangeRows(
                  entry.oldValue,
                  entry.newValue,
                );

                return (
                  <TableRow key={entry.id}>
                    <TableCell className="whitespace-nowrap text-muted-foreground">
                      {new Date(entry.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
                          toneStyles[action.tone],
                        )}
                      >
                        {action.label}
                      </span>
                      <p className="mt-1 font-mono text-[10px] text-muted-foreground">
                        {entry.action}
                      </p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="grid size-7 shrink-0 place-items-center rounded-md bg-muted text-muted-foreground">
                          <EntityIcon entityType={entry.entityType} />
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">
                            {entry.entityType}
                          </p>
                          {entry.entityId && (
                            <p className="truncate font-mono text-[10px] text-muted-foreground">
                              {entry.entityId}
                            </p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-44">
                      <p className="truncate text-sm font-medium">
                        {entry.user.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {entry.user.email}
                      </p>
                      {entry.ipAddress && (
                        <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">
                          {entry.ipAddress}
                        </p>
                      )}
                    </TableCell>
                    <TableCell className="min-w-60 align-top whitespace-normal">
                      {changeRows.length === 0 ? (
                        <span className="text-xs text-muted-foreground">
                          — No value changes
                        </span>
                      ) : (
                        <div className="space-y-1">
                          {changeRows.map((row) => (
                            <div key={row.key || "value"} className="text-xs">
                              {row.key && (
                                <span className="mr-1.5 text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
                                  {humanizeKey(row.key)}
                                </span>
                              )}
                              {row.kind === "added" ? (
                                <span className="font-medium text-emerald-600 break-all dark:text-emerald-400">
                                  {row.newValue || "—"}
                                </span>
                              ) : row.kind === "removed" ? (
                                <span className="text-muted-foreground break-all line-through">
                                  {row.oldValue || "—"}
                                </span>
                              ) : (
                                <>
                                  <span className="text-muted-foreground break-all line-through">
                                    {row.oldValue || "—"}
                                  </span>
                                  <span
                                    className="mx-1 text-muted-foreground"
                                    aria-hidden="true"
                                  >
                                    →
                                  </span>
                                  <span className="font-medium text-foreground break-all">
                                    {row.newValue || "—"}
                                  </span>
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <div>
        <TablePagination
          page={page}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </>
  );
}
