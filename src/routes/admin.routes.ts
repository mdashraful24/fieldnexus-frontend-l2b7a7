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
    ],
  },
  {
    title: "Monitoring",
    items: [
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
