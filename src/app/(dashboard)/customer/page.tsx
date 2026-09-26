import { Bell, LayoutDashboard } from "lucide-react";
import { Suspense } from "react";
import CustomerOverview, {
  CustomerOverviewLoading,
} from "@/components/modules/customer/customer-overview";
import NotificationList, {
  NotificationsLoading,
} from "@/components/modules/notification/notification-list";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CustomerDashboardPage() {
  return (
    <div className="flex-1 p-4 lg:p-6">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <LayoutDashboard className="size-5" />
          </span>
          <div>
            <h1 className="font-heading text-2xl font-semibold tracking-tight">
              Customer Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Your bookings, payments and latest updates.
            </p>
          </div>
        </div>

        <Suspense fallback={<CustomerOverviewLoading />}>
          <CustomerOverview />
        </Suspense>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Bell className="size-4" />
              Notifications
            </CardTitle>
            <CardDescription>
              Updates about your bookings and payments.
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
