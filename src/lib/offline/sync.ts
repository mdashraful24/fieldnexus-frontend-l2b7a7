"use client";

import type { QueuedRequest, SerializedBody } from "./db";
import { emitOfflineEvent } from "./events";
import {
  getQueuedRequest,
  getQueuedRequests,
  isQueuedRequest,
  markRequestFailed,
  markRequestPending,
  markRequestSyncing,
  removeQueuedRequest,
} from "./queue";

const MAX_ATTEMPTS = 5;

let syncPromise: Promise<SyncResult> | null = null;

export interface SyncResult {
  syncedCount: number;
  failedCount: number;
}

function buildRequestBody(
  body: SerializedBody | undefined,
): BodyInit | undefined {
  if (!body) return undefined;

  if (body.kind === "json") return JSON.stringify(body.value);
  if (body.kind === "raw") return body.value;

  const formData = new FormData();

  for (const [key, value] of body.parts) {
    if (typeof value === "string") {
      formData.append(key, value);
      continue;
    }

    formData.append(key, value.blob, value.name);
  }

  return formData;
}

const AUTH_ERROR_STATUSES = [401, 403];

function isPermanentFailure(item: QueuedRequest) {
  return item.attempts >= MAX_ATTEMPTS;
}

export function syncPendingRequests(): Promise<SyncResult> {
  if (typeof window === "undefined" || syncPromise) {
    return syncPromise ?? Promise.resolve({ syncedCount: 0, failedCount: 0 });
  }

  syncPromise = (async () => {
    const items = (await getQueuedRequests()).filter(
      (item) => isQueuedRequest(item) && !isPermanentFailure(item),
    );
    const result: SyncResult = { syncedCount: 0, failedCount: 0 };

    for (const item of items) {
      if (typeof item.id !== "number") continue;
      if (!navigator.onLine) break;

      await markRequestSyncing(item.id);

      try {
        const response = await fetch(item.url, {
          method: item.method,
          credentials: "include",
          headers: {
            "x-field-nexus-offline-replay": "1",
          },
          body: buildRequestBody(item.body),
        });

        if (!response.ok) {
          if (AUTH_ERROR_STATUSES.includes(response.status)) {
            await markRequestFailed(
              item.id,
              "Session expired. Sign in again to sync this change.",
            );
            result.failedCount += 1;
            break;
          }

          throw new Error(`Sync failed with status ${response.status}`);
        }

        await removeQueuedRequest(item.id);
        result.syncedCount += 1;
      } catch (error) {
        await markRequestFailed(
          item.id,
          error instanceof Error ? error.message : "Sync failed",
        );

        const latest = await getQueuedRequest(item.id);

        if (latest && isPermanentFailure(latest)) {
          result.failedCount += 1;
          continue;
        }

        await markRequestPending(item.id);
        break;
      }
    }

    if (result.syncedCount > 0 || result.failedCount > 0) {
      emitOfflineEvent("synced", result);
    }

    return result;
  })().finally(() => {
    syncPromise = null;
  });

  return syncPromise;
}

const SYNC_INTERVAL_MS = 30_000;

export function startAutoSync() {
  if (typeof window === "undefined") return () => {};

  const runSync = () => {
    syncPendingRequests().catch(() => {});
  };

  const intervalId = window.setInterval(runSync, SYNC_INTERVAL_MS);
  const handleOnline = () => runSync();

  window.addEventListener("online", handleOnline);
  runSync();

  return () => {
    window.clearInterval(intervalId);
    window.removeEventListener("online", handleOnline);
  };
}
