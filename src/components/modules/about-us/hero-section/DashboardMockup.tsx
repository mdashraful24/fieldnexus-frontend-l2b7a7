import {
  Bell,
  ClipboardList,
  LayoutDashboard,
  Search,
  TrendingUp,
  Users,
  Wrench,
} from "lucide-react";

const orders = [
  { id: "WO-2048", title: "AC unit not cooling", status: "In Progress" },
  { id: "WO-2047", title: "Pipe leak repair", status: "Completed" },
  { id: "WO-2046", title: "Network cabling install", status: "Assigned" },
  { id: "WO-2045", title: "Generator servicing", status: "Completed" },
];

const stats = [
  { icon: ClipboardList, label: "Total jobs", value: "25,348" },
  { icon: TrendingUp, label: "Completion rate", value: "96.8%" },
  { icon: Users, label: "Active users", value: "1,247" },
  { icon: Wrench, label: "Technicians", value: "412" },
];

const statusColor: Record<string, string> = {
  Completed: "bg-emerald-500",
  "In Progress": "bg-amber-500",
  Assigned: "bg-primary",
};

export function DashboardMockup() {
  return (
    <div className="w-full rounded-xl border bg-card shadow-2xl shadow-primary/10">
      <div className="flex items-center gap-2 border-b px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-red-400" />
        <span className="size-2.5 rounded-full bg-amber-400" />
        <span className="size-2.5 rounded-full bg-emerald-400" />
        <span className="ml-3 flex-1 rounded-md bg-muted px-3 py-1 text-[11px] text-muted-foreground">
          app.fieldnexus.com/dashboard
        </span>
      </div>

      <div className="flex">
        <aside className="hidden w-48 flex-col gap-1 border-r p-3 md:flex">
          {[
            { icon: LayoutDashboard, label: "Dashboard", active: true },
            { icon: ClipboardList, label: "Work orders", active: false },
            { icon: Users, label: "Team", active: false },
            { icon: Wrench, label: "Technicians", active: false },
          ].map((item) => (
            <div
              key={item.label}
              className={`flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs ${
                item.active
                  ? "bg-primary/10 font-medium text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <item.icon className="size-4" />
              {item.label}
            </div>
          ))}
        </aside>

        <div className="flex-1 p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Dashboard</h3>
            <div className="flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs text-muted-foreground">
              <Search className="size-3" />
              Search...
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-lg bg-muted/60 p-2.5">
                <stat.icon className="mb-1 size-3.5 text-muted-foreground" />
                <p className="text-[13px] font-semibold leading-none">
                  {stat.value}
                </p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-3 rounded-lg border">
            <div className="flex items-center justify-between border-b px-3 py-2">
              <p className="text-[11px] font-semibold">Recent work orders</p>
              <Bell className="size-3.5 text-muted-foreground" />
            </div>
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between px-3 py-2"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`size-1.5 rounded-full ${statusColor[order.status] ?? "bg-muted-foreground"}`}
                  />
                  <div>
                    <p className="text-[11px] font-medium leading-none">
                      {order.title}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {order.id}
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-muted px-2 py-0.5 text-[9px] font-medium text-muted-foreground">
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
