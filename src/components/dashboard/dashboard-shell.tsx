"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { adminRoutes } from "@/routes/admin.routes";
import { customerRoutes } from "@/routes/customer.routes";
import { superAdminRoutes } from "@/routes/super-admin.routes";
import { technicianRoutes } from "@/routes/technician.routes";
import type { UserRole } from "@/types/user.type";
import { DashboardSidebar } from "./dashboard-sidebar";
import NotificationBell from "./notification-bell";
import OfflineIndicator from "./offline-indicator";
import UserAvatarMenu from "./user-avatar-menu";

const dashboardRoutes = [
  ...adminRoutes,
  ...customerRoutes,
  ...superAdminRoutes,
  ...technicianRoutes,
].flatMap((group) => group.items);

function formatPathSegment(segment: string) {
  return segment
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function CurrentPagePath() {
  const pathname = usePathname();
  const matchedRoute = dashboardRoutes
    .filter(
      (route) => pathname === route.url || pathname.startsWith(`${route.url}/`),
    )
    .sort((a, b) => b.url.length - a.url.length)[0];

  const remainingPath = matchedRoute
    ? pathname.slice(matchedRoute.url.length).split("/").filter(Boolean)
    : pathname.split("/").filter(Boolean).slice(1);
  const breadcrumbItems = [
    matchedRoute?.title ??
      formatPathSegment(pathname.split("/").filter(Boolean)[0] ?? "Dashboard"),
    ...remainingPath.map(formatPathSegment),
  ];

  return (
    <div className="hidden min-w-0 items-center gap-2 text-sm md:flex">
      <Link
        href="/"
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        Dashboard
      </Link>
      {breadcrumbItems.map((item) => (
        <span
          key={`${pathname}-${item}`}
          className="flex min-w-0 items-center gap-2"
        >
          <span className="text-muted-foreground/60">/</span>
          <span className="truncate font-medium">{item}</span>
        </span>
      ))}
    </div>
  );
}

function DashboardHeaderActions() {
  const { isMobile, open, openMobile } = useSidebar();
  const isSidebarOpen = isMobile ? openMobile : open;

  return (
    <div className="flex shrink-0 items-center gap-2">
      <ThemeToggle />
      <OfflineIndicator />
      <NotificationBell />
      {!isSidebarOpen ? <UserAvatarMenu /> : null}
    </div>
  );
}

export default function DashboardShell({
  children,
  userRole,
}: {
  children: ReactNode;
  userRole: UserRole;
}) {
  return (
    <SidebarProvider>
      <DashboardSidebar userRole={userRole} />
      <SidebarInset>
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-background/95 px-4 backdrop-blur supports-backdrop-filter:bg-background/95">
          <div className="flex min-w-0 items-center gap-3">
            <SidebarTrigger className="-ml-1" />
            <CurrentPagePath />
          </div>
          <DashboardHeaderActions />
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
