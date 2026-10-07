import type { SidebarItems } from "@/types";

const prefix = "/technician";

export const technicianRoutes: SidebarItems = [
  {
    title: "Technician",
    items: [
      {
        title: "Overview",
        url: `${prefix}`,
      },
      {
        title: "My Work Orders",
        url: `${prefix}/work-orders`,
      },
      {
        title: "Payments",
        url: `${prefix}/payments`,
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        title: "My Profile",
        url: "/profile",
      },
    ],
  },
];
