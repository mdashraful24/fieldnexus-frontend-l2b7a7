import { Bell, ClipboardList } from "lucide-react";
import { Suspense } from "react";
import NotificationList, {
  NotificationsLoading,
} from "@/components/modules/notification/notification-list";
import TechnicianOverview from "@/components/modules/technician/technician-overview";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TechnicianDashboardPage() {
  return (
    <div className="flex-1 p-4 lg:p-6">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ClipboardList className="size-5" />
          </span>
          <div>
            <h1 className="font-heading text-2xl font-semibold tracking-tight">
              Technician Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Your assigned jobs, priorities and latest updates.
            </p>
          </div>
        </div>

        <TechnicianOverview />

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Bell className="size-4" />
              Notifications
            </CardTitle>
            <CardDescription>
              Updates about your assignments and applications.
            </CardDescription>
          </CardHeader>
          <Suspense fallback={<NotificationsLoading />}>
            <NotificationList />
          </Suspense>
        </Card>
      </div>
    </div>
  );
}
