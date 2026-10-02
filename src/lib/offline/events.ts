export interface OfflineEventMap {
  queued: { label: string; pendingCount: number };
  synced: { syncedCount: number; failedCount: number };
}

type Listener<K extends keyof OfflineEventMap> = (
  payload: OfflineEventMap[K],
) => void;

const listeners = new Map<keyof OfflineEventMap, Set<Listener<never>>>();

export function emitOfflineEvent<K extends keyof OfflineEventMap>(
  event: K,
  payload: OfflineEventMap[K],
) {
  listeners.get(event)?.forEach((listener) => {
    listener(payload as never);
  });
}

export function onOfflineEvent<K extends keyof OfflineEventMap>(
  event: K,
  listener: Listener<K>,
) {
  const existing = listeners.get(event) ?? new Set();
  existing.add(listener as Listener<never>);
  listeners.set(event, existing);

  return () => {
    existing.delete(listener as Listener<never>);
  };
}
