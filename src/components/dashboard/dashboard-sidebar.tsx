"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "@/assets/svg/Logo";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { adminRoutes } from "@/routes/admin.routes";
import { UserRole } from "@/types/user.type";
import { technicianRoutes } from "@/routes/technician.routes";
import { customerRoutes } from "@/routes/customer.routes";
import { SidebarItems } from "@/types/sidebar.type";

const sideBarRoutes: Partial<Record<UserRole, SidebarItems>> = {
  SUPER_ADMIN: adminRoutes,
  ADMIN: adminRoutes,
  TECHNICIAN: technicianRoutes,
  CUSTOMER: customerRoutes,
};

export function DashboardSidebar({ role }: { role: UserRole }) {
  const pathname = usePathname();
  const routes: SidebarItems = sideBarRoutes[role] || [];

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
      <SidebarRail />
    </Sidebar>
  );
}