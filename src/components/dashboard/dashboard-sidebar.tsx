"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "@/assets/svg/Logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useGetMe } from "@/hooks";
import { adminRoutes } from "@/routes/admin.routes";
import { customerRoutes } from "@/routes/customer.routes";
import { superAdminRoutes } from "@/routes/super-admin.routes";
import { technicianRoutes } from "@/routes/technician.routes";
import type { SidebarItems } from "@/types/sidebar.type";
import type { UserRole } from "@/types/user.type";
import UserAvatarMenu from "./user-avatar-menu";

const sideBarRoutes: Partial<Record<UserRole, SidebarItems>> = {
  SUPER_ADMIN: [...adminRoutes, ...superAdminRoutes],
  ADMIN: adminRoutes,
  TECHNICIAN: technicianRoutes,
  CUSTOMER: customerRoutes,
};

export function DashboardSidebar({ userRole }: { userRole: UserRole }) {
  const pathname = usePathname();
  const { data: meData } = useGetMe();
  const effectiveRole: UserRole = (meData?.data?.role as UserRole) ?? userRole;
  const routes: SidebarItems = sideBarRoutes[effectiveRole] || [];

  // console.log(pathname);

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/">
          <div className="flex items-center gap-2">
            <Logo />
            <span>Field Nexus</span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      render={<Link href={item.url} />}
                      isActive={pathname === item.url}
                    >
                      {item.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="border-t p-3">
        <UserAvatarMenu sidebar />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
