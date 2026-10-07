import {
  offlineDB,
  type QueuedFilePart,
  type QueuedRequest,
  type SerializedBody,
} from "./db";

export interface EnqueueRequestInput {
  url: string;
  method: string;
  body?: unknown;
  label: string;
}

function isPlainSerializableBody(body: unknown) {
  return (
    typeof body === "object" &&
    body !== null &&
    Object.getPrototypeOf(body) === Object.prototype
  );
}

export function serializeBody(body: unknown): SerializedBody | undefined {
  if (body === null || body === undefined) return undefined;

  if (typeof body === "string") {
    return { kind: "raw", value: body };
  }

  if (typeof FormData !== "undefined" && body instanceof FormData) {
    const parts: Array<[string, string | QueuedFilePart]> = [];

    body.forEach((value, key) => {
      if (typeof value === "string") {
        parts.push([key, value]);
        return;
      }

      parts.push([
        key,
        {
          name: value.name || "file",
          type: value.type || "application/octet-stream",
          blob: value,
        },
      ]);
    });

    return { kind: "form-data", parts };
  }

  if (isPlainSerializableBody(body)) {
    return { kind: "json", value: body };
  }

  return undefined;
}

export async function enqueueRequest(input: EnqueueRequestInput) {
  const now = Date.now();
  const body = serializeBody(input.body);

  if (input.body && !body) return null;

  return offlineDB.requests.add({
    url: input.url,
    method: input.method.toUpperCase(),
    body,
    label: input.label,
    status: "pending",
    attempts: 0,
    lastError: null,
    createdAt: now,
    updatedAt: now,
  });
}

export function getQueuedRequests() {
  return offlineDB.requests.orderBy("createdAt").toArray();
}

export function getQueuedRequest(id: number) {
  return offlineDB.requests.get(id);
}

export function removeQueuedRequest(id: number) {
  return offlineDB.requests.delete(id);
}

export function countQueuedRequests() {
  return offlineDB.requests.count();
}

export function markRequestSyncing(id: number) {
  return offlineDB.requests.update(id, {
    status: "syncing",
    updatedAt: Date.now(),
  });
}

export async function markRequestFailed(id: number, error: string) {
  const request = await getQueuedRequest(id);

  return offlineDB.requests.update(id, {
    status: "failed",
    attempts: (request?.attempts ?? 0) + 1,
    lastError: error.slice(0, 300),
    updatedAt: Date.now(),
  });
}

export function markRequestPending(id: number) {
  return offlineDB.requests.update(id, {
    status: "pending",
    updatedAt: Date.now(),
  });
}

export async function resetStaleSyncingRequests() {
  return offlineDB.requests
    .where("status")
    .equals("syncing")
    .modify({ status: "pending", updatedAt: Date.now() });
}

export function isQueuedRequest(item: QueuedRequest) {
  return item.status === "pending" || item.status === "failed";
}
