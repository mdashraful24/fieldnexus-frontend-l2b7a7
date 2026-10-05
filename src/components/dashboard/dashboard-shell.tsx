import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import type { UserRole } from "@/types/user.type";
import { DashboardSidebar } from "./dashboard-sidebar";
import NotificationBell from "./notification-bell";
import OfflineIndicator from "./offline-indicator";
import UserAvatarMenu from "./user-avatar-menu";

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
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <OfflineIndicator />
            <NotificationBell />
            <UserAvatarMenu />
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
