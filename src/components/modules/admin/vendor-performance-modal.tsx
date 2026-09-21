"use client";

import { AlertTriangle, Building2 } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetVendorPerformance } from "@/hooks";
import { getApiErrorMessage } from "@/lib/apiError";

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: ReactNode;
  hint?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-lg bg-muted/50 px-3 py-2.5">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-right font-semibold">
        {value}
        {hint ? (
          <span className="block text-xs font-normal text-muted-foreground">
            {hint}
          </span>
        ) : null}
      </span>
    </div>
  );
}

export default function VendorPerformanceModal({
  vendorId,
  onClose,
}: {
  vendorId: string;
  onClose: () => void;
}) {
  const { data, isPending, isError, error } = useGetVendorPerformance(vendorId);

  const performance = data?.data;

  return (
    <Dialog open={!!vendorId} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden">
        <DialogHeader className="shrink-0 pr-12">
          <div className="flex items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
              <Building2 className="size-5" />
            </span>
            <div className="min-w-0">
              <DialogTitle className="break-all">
                {performance?.vendorName ?? "Vendor performance"}
              </DialogTitle>
              <DialogDescription className="break-all">
                Performance overview for this vendor
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {isPending ? (
          <div className="space-y-3 px-4 py-2">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between gap-2 rounded-lg bg-muted/50 px-3 py-2.5"
              >
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        ) : isError || !performance ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border p-8 text-center">
            <span className="grid size-12 place-items-center rounded-full bg-destructive/10 text-destructive">
              <AlertTriangle className="size-6" />
            </span>
            <h2 className="text-base font-semibold">Unable to load performance</h2>
            <p className="max-w-xs text-sm text-muted-foreground">
              {getApiErrorMessage(
                error,
                "Vendor not found or you may not have permission to view it.",
              )}
            </p>
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
        ) : (
          <>
            <div
              key={vendorId}
              className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4"
            >
              <div className="space-y-3">
                <Stat
                  label="Total Jobs"
                  value={performance.totalJobs}
                  hint={`${performance.completedJobs} completed`}
                />
                <Stat
                  label="Average Rating"
                  value={`${performance.averageRating.toFixed(1)} / 5`}
                />
                <Stat
                  label="Success Rate"
                  value={`${performance.successRate}%`}
                />
                <Stat
                  label="Average Completion Time"
                  value={performance.averageCompletionTime}
                />
                <Stat label="Cancelled Jobs" value={performance.cancelledJobs} />
              </div>

              <div className="rounded-lg border bg-card p-4">
                <p className="text-xs font-medium text-muted-foreground">
                  Vendor ID
                </p>
                <p className="mt-0.5 font-mono text-xs break-all">
                  {performance.vendorId}
                </p>
              </div>

              <div className="rounded-lg border bg-card p-4">
                <p className="text-xs font-medium text-muted-foreground">SLA</p>
                <p className="mt-1">
                  {performance.totalJobs > 0 ? (
                    <span className="text-sm text-foreground">
                      {performance.slaBreaches} breach
                      {performance.slaBreaches === 1 ? "" : "es"} reported
                    </span>
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      No SLA data available
                    </span>
                  )}
                </p>
              </div>
            </div>

            <DialogFooter className="shrink-0">
              <Button variant="outline" size="lg" onClick={onClose}>
                Close
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}