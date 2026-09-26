import type { SidebarItems } from "@/types";

const prefix = "/customer";

export const customerRoutes: SidebarItems = [
  {
    title: "Bookings",
    items: [
      {
        title: "Overview",
        url: `${prefix}`,
      },
      {
        title: "Create Booking",
        url: `${prefix}/create-booking`,
      },
      {
        title: "View Bookings",
        url: `${prefix}/bookings`,
      },
      {
        title: "Payment History",
        url: `${prefix}/payment-history`,
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
