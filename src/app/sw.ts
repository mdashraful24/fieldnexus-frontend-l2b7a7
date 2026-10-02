import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry } from "serwist";
import { ExpirationPlugin, NetworkFirst, NetworkOnly, Serwist } from "serwist";

// `self.__SW_MANIFEST` is replaced at build time by the Serwist CLI (see
// `injectionPoint` in scripts/build-sw.mjs). It is declared on `Window` because
// this project compiles with the DOM lib instead of the WebWorker lib.
declare global {
  interface Window {
    __SW_MANIFEST: (PrecacheEntry | string)[];
  }
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
const API_ORIGIN = API_BASE_URL.startsWith("http")
  ? new URL(API_BASE_URL).origin
  : null;

function isApiRequest(url: URL) {
  return API_ORIGIN
    ? url.origin === API_ORIGIN
    : url.pathname.startsWith("/api/");
}

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    {
      matcher: ({ url, request }) =>
        request.method === "GET" &&
        isApiRequest(url) &&
        !url.pathname.includes("/auth/"),
      handler: new NetworkFirst({
        cacheName: "field-nexus-api",
        networkTimeoutSeconds: 5,
        plugins: [
          new ExpirationPlugin({
            maxEntries: 60,
            maxAgeSeconds: 60 * 60 * 24,
          }),
        ],
      }),
    },
    {
      matcher: ({ url }) => isApiRequest(url),
      handler: new NetworkOnly(),
    },
    ...defaultCache,
  ],
});

serwist.addEventListeners();
