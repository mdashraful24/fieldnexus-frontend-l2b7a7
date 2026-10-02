import Dexie, { type Table } from "dexie";

export type QueuedRequestStatus = "pending" | "syncing" | "failed";

export interface QueuedFilePart {
  name: string;
  type: string;
  blob: Blob;
}

export type SerializedBody =
  | { kind: "json"; value: unknown }
  | { kind: "form-data"; parts: Array<[string, string | QueuedFilePart]> }
  | { kind: "raw"; value: string };

export interface QueuedRequest {
  id?: number;
  url: string;
  method: string;
  body?: SerializedBody;
  label: string;
  status: QueuedRequestStatus;
  attempts: number;
  lastError?: string | null;
  createdAt: number;
  updatedAt: number;
}

class FieldNexusOfflineDB extends Dexie {
  requests!: Table<QueuedRequest, number>;

  constructor() {
    super("field-nexus-offline");
    this.version(1).stores({
      requests: "++id, method, url, status, createdAt",
    });
  }
}

export const offlineDB = new FieldNexusOfflineDB();
