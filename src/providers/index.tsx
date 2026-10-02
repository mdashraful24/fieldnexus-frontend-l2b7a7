"use client";

import type { ReactNode } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import GoogleAuthProvider from "./google-auth.provider";
import OfflineSyncProvider from "./offline.provider";
import QueryProviders from "./query.provider";
import ServiceWorkerRegister from "./service-worker.provider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <GoogleAuthProvider>
      <QueryProviders>
        <TooltipProvider>
          <ServiceWorkerRegister />
          <OfflineSyncProvider />
          {children}
        </TooltipProvider>
      </QueryProviders>
    </GoogleAuthProvider>
  );
}
