"use client";

import { useEffect } from "react";
import { toast } from "@/components/ui/toast";
import { onOfflineEvent } from "@/lib/offline/events";
import { startAutoSync } from "@/lib/offline/sync";
import { resetStaleSyncingRequests } from "@/lib/offline/queue";

export default function OfflineSyncProvider() {
  useEffect(() => {
    resetStaleSyncingRequests().catch(() => {});
    startAutoSync();
  }, []);

  useEffect(() => {
    const offQueued = onOfflineEvent(
      "queued",
      ({ pendingCount }: { pendingCount: number }) => {
        toast.add({
          title: "Saved offline",
          description: `No connection right now. This change is stored on your device and will sync automatically. (${pendingCount} pending)`,
          type: "warning",
        });
      },
    );

    const offSynced = onOfflineEvent(
      "synced",
      ({
        syncedCount,
        failedCount,
      }: {
        syncedCount: number;
        failedCount: number;
      }) => {
        if (syncedCount > 0) {
          toast.add({
            title: "Back online",
            description: `${syncedCount} queued change${syncedCount > 1 ? "s" : ""} synced successfully.`,
            type: "success",
          });
        }

        if (failedCount > 0) {
          toast.add({
            title: "Sync needs attention",
            description: `${failedCount} queued change${failedCount > 1 ? "s" : ""} could not be synced. Open the offline panel to review.`,
            type: "error",
          });
        }
      },
    );

    return () => {
      offQueued();
      offSynced();
    };
  }, []);

  return null;
}
