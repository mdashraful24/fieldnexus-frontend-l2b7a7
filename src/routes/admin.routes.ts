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
                title: "Technician Approval",
                url: `${prefix}/approve-technician`,
            },
        ],
    },
    {
        title: "App Settings",
        items: [
            {
                title: "Routing",
                url: "#",
            },
            {
                title: "Data Fetching",
                url: "#",
            },
            {
                title: "Rendering",
                url: "#",
            },
        ],
    },
];