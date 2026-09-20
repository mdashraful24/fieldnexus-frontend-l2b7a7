type ApiClientOptions = {
  method?: string;
  body?: unknown;
  query?: object;
  headers?: HeadersInit;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export class ApiClientError<T = unknown> extends Error {
  data?: T;
  status?: number;
  statusText?: string;

  constructor(message: string, opts: { data?: T; status?: number }) {
    super(message, { cause: opts.data });
    this.name = "ApiClientError";
    this.data = opts.data;
    this.status = opts.status;
    this.statusText = opts.status ? String(opts.status) : undefined;
  }
}

let refreshPromise: Promise<boolean> | null = null;

async function attemptRefresh(): Promise<boolean> {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        const response = await fetch(`${BASE_URL}/auth/refresh-token`, {
          method: "POST",
          credentials: "include",
        });
        return response.ok;
      } catch {
        return false;
      } finally {
        refreshPromise = null;
      }
    })();
  }
  return refreshPromise;
}

function buildUrl(path: string, query?: object): string {
  if (path.startsWith("http")) {
    return path;
  }

  const url = new URL(`${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`);

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value === undefined || value === null || value === "") {
        continue;
      }
      url.searchParams.set(key, String(value));
    }
  }

  return url.toString();
}

// biome-ignore lint/suspicious/noExplicitAny: matches ofetch's $Fetch<T> (callers pass the parcel type explicitly)
async function request<T = any>(
  path: string,
  options: ApiClientOptions,
  isRetry: boolean,
): Promise<T> {
  const { method = "GET", body, query, headers } = options;

  const headersInit = new Headers(headers);
  let requestBody: BodyInit | undefined;

  if (body instanceof FormData) {
    requestBody = body;
  } else if (body !== undefined) {
    headersInit.set("Content-Type", "application/json");
    requestBody = JSON.stringify(body);
  }

  const response = await fetch(buildUrl(path, query), {
    method,
    credentials: "include",
    headers: headersInit,
    body: requestBody,
  });

  if (response.status === 401 && !isRetry) {
    const refreshed = await attemptRefresh();
    if (refreshed) {
      return request(path, options, true);
    }
  }

  const text = await response.text();
  let data: unknown = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = null;
    }
  }

  if (!response.ok) {
    const message =
      typeof data === "object" &&
      data !== null &&
      "message" in data &&
      typeof data.message === "string"
        ? data.message
        : `[${method}] ${path}: ${response.status} ${response.statusText}`;

    throw new ApiClientError(message, {
      data: data ?? undefined,
      status: response.status,
    });
  }

  return data as T;
}

// biome-ignore lint/suspicious/noExplicitAny: matches ofetch's $Fetch<T> (callers pass the parcel type explicitly)
const apiClient = <T = any>(
  path: string,
  options: ApiClientOptions = {},
): Promise<T> => request<T>(path, options, false);

export default apiClient;
