import { emitOfflineEvent } from "./events";
import { countQueuedRequests, enqueueRequest } from "./queue";

const QUEUED_HEADER = "x-field-nexus-offline-queued";
const MUTATION_METHODS = ["POST", "PUT", "PATCH", "DELETE"];

function isMutationMethod(method: string) {
  return MUTATION_METHODS.includes(method.toUpperCase());
}

function isNetworkFailure(error: unknown) {
  if (error instanceof TypeError) return true;
  if (error instanceof DOMException && error.name === "AbortError")
    return false;

  return (
    error instanceof Error &&
    /network|failed to fetch|load failed/i.test(error.message)
  );
}

function buildQueuedResponse(label: string) {
  return new Response(
    JSON.stringify({
      success: true,
      message: `${label} saved offline and queued for sync.`,
      data: null,
    }),
    {
      status: 202,
      statusText: "Queued Offline",
      headers: {
        "content-type": "application/json",
        [QUEUED_HEADER]: "1",
      },
    },
  );
}

export function isOfflineQueuedResponse(response: Response) {
  return response.headers.get(QUEUED_HEADER) === "1";
}

export async function offlineAwareFetch(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  const method = (init?.method ?? "GET").toUpperCase();
  const canQueue = typeof window !== "undefined" && isMutationMethod(method);

  if (!canQueue) {
    return fetch(input, init);
  }

  try {
    return await fetch(input, init);
  } catch (error) {
    if (!isNetworkFailure(error)) throw error;

    const url =
      typeof input === "string"
        ? input
        : input instanceof URL
          ? input.toString()
          : input.url;

    const label = init?.method ? `${init.method} ${url}` : "Request";
    const queuedId = await enqueueRequest({
      url,
      method,
      body: init?.body ?? null,
      label,
    });

    if (!queuedId) throw error;

    const pendingCount = await countQueuedRequests();

    emitOfflineEvent("queued", { label, pendingCount });

    return buildQueuedResponse(label);
  }
}
