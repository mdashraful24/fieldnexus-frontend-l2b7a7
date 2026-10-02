"use client";

import { liveQuery } from "dexie";
import { useEffect, useState } from "react";
import { offlineDB, type QueuedRequest } from "@/lib/offline/db";

const EMPTY_REQUESTS: QueuedRequest[] = [];

function querierAll() {
  return offlineDB.requests.orderBy("createdAt").toArray();
}

function querierCount() {
  return offlineDB.requests.count();
}

function querierSyncingCount() {
  return offlineDB.requests.where("status").equals("syncing").count();
}

function useDexieLiveQuery<T>(querier: () => Promise<T>, initialValue: T) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const subscription = liveQuery(querier).subscribe({
      next: (result) => setValue(result),
      error: () => setValue(initialValue),
    });

    return () => subscription.unsubscribe();
  }, [initialValue, querier]);

  return value;
}

export function useQueuedRequests() {
  return useDexieLiveQuery<QueuedRequest[]>(querierAll, EMPTY_REQUESTS);
}

export function useQueuedRequestCount() {
  return useDexieLiveQuery<number>(querierCount, 0);
}

export function useIsSyncingRequests() {
  return useDexieLiveQuery<number>(querierSyncingCount, 0) > 0;
}

export function getRequestSummary(item: QueuedRequest) {
  const path = item.url.replace(/^https?:\/\/[^/]+/, "");

  return `${item.method} ${path}`;
}
