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
