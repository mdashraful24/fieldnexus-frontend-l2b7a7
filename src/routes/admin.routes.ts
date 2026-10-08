const prefix = "/admin";

export const adminRoutes = [
  {
    title: "Administration",
    items: [
      {
        title: "Overview",
        url: `${prefix}`,
      },
      {
        title: "Users",
        url: `${prefix}/users`,
      },
      {
        title: "Technician Approval",
        url: `${prefix}/approve-technician`,
      },
      {
        title: "Vendors",
        url: `${prefix}/vendors`,
      },
      {
        title: "Work Orders",
        url: `${prefix}/work-orders`,
      },
      {
        title: "Payments",
        url: `${prefix}/payments`,
      },
      {
        title: "Service Categories",
        url: `${prefix}/service-categories`,
      },
    ],
  },
  {
    title: "Monitoring",
    items: [
      {
        title: "Contact Messages",
        url: `${prefix}/contact-messages`,
      },
      {
        title: "Audit Logs",
        url: `${prefix}/audit-logs`,
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
