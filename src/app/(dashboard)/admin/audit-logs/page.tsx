import { FileClock } from "lucide-react";
import AdminAuditLogs from "@/components/modules/admin/admin-audit-logs";

export default function AdminAuditLogsPage() {
  return (
    <div className="flex-1 p-4 lg:p-6">
      <div className="mx-auto flex w-full flex-col gap-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <FileClock className="size-5" />
          </span>
          <div>
            <h1 className="font-heading text-2xl font-semibold tracking-tight">
              Audit Logs
            </h1>
            <p className="text-sm text-muted-foreground">
              Track administrative actions taken on the platform.
            </p>
          </div>
        </div>

        <AdminAuditLogs />
      </div>
    </div>
  );
}
