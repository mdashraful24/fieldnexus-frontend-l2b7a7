"use client";

import { CloudOff, RefreshCw, Trash2, TriangleAlert, Wifi } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { useNetworkStatus } from "@/hooks/use-network-status";
import {
  getRequestSummary,
  useIsSyncingRequests,
  useQueuedRequestCount,
  useQueuedRequests,
} from "@/hooks/use-offline-queue";
import { removeQueuedRequest } from "@/lib/offline/queue";
import { syncPendingRequests } from "@/lib/offline/sync";

function formatQueuedTime(timestamp: number) {
  return new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(timestamp));
}

export default function OfflineIndicator() {
  const isOnline = useNetworkStatus();
  const pendingCount = useQueuedRequestCount();
  const queuedRequests = useQueuedRequests();
  const isSyncing = useIsSyncingRequests();

  const handleSync = async () => {
    if (!isOnline) {
      toast.add({
        title: "Still offline",
        description: "Queued changes will sync as soon as you are back online.",
        type: "info",
      });
      return;
    }

    const result = await syncPendingRequests();

    if (result.syncedCount === 0 && result.failedCount === 0) {
      toast.add({
        title: "Nothing to sync",
        description: "All queued changes are already up to date.",
        type: "info",
      });
    }
  };

  const handleDiscard = async (id: number) => {
    await removeQueuedRequest(id);

    toast.add({
      title: "Change discarded",
      description: "The queued change was removed from this device.",
      type: "info",
    });
  };

  const statusLabel = isOnline ? "Online" : "Offline";

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            size="lg"
            className="pointer-events-none shrink-0 gap-2 cursor-default opacity-100"
            aria-disabled="true"
            aria-label={`Connection status: ${statusLabel}`}
          />
        }
      >
        {isSyncing ? (
          <Spinner className="size-3.5" />
        ) : isOnline ? (
          <Wifi className="size-3.5 text-emerald-600 dark:text-emerald-400" />
        ) : (
          <CloudOff className="size-3.5 text-amber-600 dark:text-amber-400" />
        )}
        <span className="hidden sm:inline">{statusLabel}</span>
        {pendingCount > 0 && (
          <Badge
            variant={isOnline ? "secondary" : "destructive"}
            className="h-4 px-1.5 text-[0.65rem]"
          >
            {pendingCount}
          </Badge>
        )}
      </PopoverTrigger>
      {/* <PopoverContent align="end" className="w-80">
        <PopoverTitle>Offline sync</PopoverTitle>
        <PopoverDescription>
          {isOnline
            ? "Connected. Queued changes sync automatically every 30 seconds."
            : "No connection. New changes are saved on this device and synced later."}
        </PopoverDescription>

        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="text-xs text-muted-foreground">
            {pendingCount} pending change{pendingCount === 1 ? "" : "s"}
          </span>
          <Button
            variant="outline"
            size="xs"
            onClick={handleSync}
            disabled={isSyncing || pendingCount === 0 || !isOnline}
          >
            {isSyncing ? <Spinner /> : <RefreshCw />}
            Sync now
          </Button>
        </div>

        {queuedRequests.length > 0 && (
          <ul className="mt-3 max-h-60 space-y-1.5 overflow-y-auto">
            {queuedRequests.map((item) => (
              <li
                key={item.id}
                className="flex items-start justify-between gap-2 rounded-lg border bg-muted/40 p-2"
              >
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium">
                    {getRequestSummary(item)}
                  </p>
                  <p className="text-[0.7rem] text-muted-foreground">
                    Queued at {formatQueuedTime(item.createdAt)}
                    {item.attempts > 0 && ` · ${item.attempts} attempt(s)`}
                  </p>
                  {item.lastError && (
                    <p className="mt-0.5 flex items-start gap-1 text-[0.7rem] text-destructive">
                      <TriangleAlert className="mt-px size-3 shrink-0" />
                      <span className="line-clamp-2">{item.lastError}</span>
                    </p>
                  )}
                </div>
                {typeof item.id === "number" && (
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    title="Discard queued change"
                    onClick={() => handleDiscard(item.id as number)}
                  >
                    <Trash2 className="text-destructive" />
                  </Button>
                )}
              </li>
            ))}
          </ul>
        )}
      </PopoverContent> */}
    </Popover>
  );
}
