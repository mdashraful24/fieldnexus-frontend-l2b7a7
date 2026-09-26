import type { SidebarItems } from "@/types";

export const superAdminRoutes: SidebarItems = [
  {
    title: "Super Admin",
    items: [
      {
        title: "Admins",
        url: `/admin/admins`,
      },
      {
        title: "My Profile",
        url: `/profile`,
      },
    ],
  },
];
