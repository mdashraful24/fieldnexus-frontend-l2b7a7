"use client";

import { cn } from "cn";
import { Bell, CheckCheck, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import {
  useGetMe,
  useMarkAllNotificationsAsRead,
  useMarkNotificationAsRead,
  useSuspenseGetMyNotifications,
} from "@/hooks";
import { getApiErrorMessage } from "@/lib/apiError";
import type { INotification, NotificationType } from "@/types";
import type { UserRole } from "@/types/user.type";

export function NotificationsLoading() {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 3 }).map((_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static placeholder rows
        <Skeleton key={index} className="h-16 w-full rounded-xl" />
      ))}
    </div>
  );
}

const workOrderNotificationTypes = new Set<NotificationType>([
  "WORK_ORDER_CREATED",
  "WORK_ORDER_APPROVED",
  "WORK_ORDER_ASSIGNED",
  "WORK_ORDER_ACCEPTED",
  "WORK_ORDER_REASSIGNED",
  "WORK_ORDER_REJECTED",
  "WORK_ORDER_CANCELLED",
  "WORK_ORDER_EN_ROUTE",
  "WORK_ORDER_IN_PROGRESS",
  "WORK_ORDER_COMPLETED",
  "WORK_ORDER_FAILED",
  "SERVICE_REPORT_SUBMITTED",
  "FEEDBACK_SUBMITTED",
]);

function getNotificationHref(
  notification: INotification,
  role?: UserRole,
): string | null {
  if (workOrderNotificationTypes.has(notification.type)) {
    if (role === "CUSTOMER") return "/customer/bookings";
    if (role === "TECHNICIAN") return "/technician/work-orders";
    if (role === "ADMIN" || role === "SUPER_ADMIN") return "/admin/work-orders";
    return null;
  }

  switch (notification.type) {
    case "PAYMENT_SUCCESS":
      if (role === "ADMIN" || role === "SUPER_ADMIN") return "/admin/payments";
      if (role === "CUSTOMER") return "/customer/payment-history";
      return null;
    case "APPLICATION_APPROVED":
    case "APPLICATION_REJECTED":
      if (role === "ADMIN" || role === "SUPER_ADMIN") {
        return "/admin/approve-technician";
      }
      if (role === "TECHNICIAN") return "/technician";
      return "/apply/status";
    default:
      return null;
  }
}

export default function NotificationList({
  onNavigate,
}: {
  onNavigate?: () => void;
}) {
  const router = useRouter();
  const params = { page: 1, limit: 8, isRead: false };

  const { data: meData } = useGetMe();
  const role = meData?.data?.role;

  const { data } = useSuspenseGetMyNotifications(params);
  const { mutate: markAsRead } = useMarkNotificationAsRead();
  const { mutate: markAllAsRead, isPending: markAllPending } =
    useMarkAllNotificationsAsRead();

  const notifications = data?.data ?? [];
  const unreadCount = notifications.length;

  const handleMarkAsRead = (notificationId: string) => {
    markAsRead(notificationId, {
      onError: (err) => {
        toast.add({
          title: "Update Failed",
          description: getApiErrorMessage(err),
          type: "error",
        });
      },
    });
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead(undefined, {
      onError: (err) => {
        toast.add({
          title: "Update Failed",
          description: getApiErrorMessage(err),
          type: "error",
        });
      },
    });
  };

  const handleClick = (notification: INotification) => {
    const href = getNotificationHref(notification, role);

    handleMarkAsRead(notification.id);

    if (href) {
      router.push(href);
      onNavigate?.();
    }
  };

  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed py-10 text-center">
        <span className="inline-flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <Bell size={18} />
        </span>
        <p className="text-sm text-muted-foreground">
          You&apos;re all caught up. No unread notifications.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {unreadCount > 0 ? `${unreadCount} unread` : "You are all caught up"}
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleMarkAllAsRead}
          disabled={markAllPending || unreadCount === 0}
          className="h-8"
        >
          {markAllPending ? <Spinner /> : <CheckCheck size={14} />}
          Mark all read
        </Button>
      </div>

      <ul className="flex flex-col gap-2">
        {notifications.map((notification) => {
          const href = getNotificationHref(notification, role);

          return (
            <li key={notification.id}>
              <button
                type="button"
                onClick={() => handleClick(notification)}
                className={cn(
                  "flex w-full flex-col gap-1 rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 text-left transition-colors hover:bg-primary/10",
                  href && "cursor-pointer",
                )}
              >
                <span className="flex items-center gap-2">
                  <span className="size-2 shrink-0 rounded-full bg-primary" />
                  <span className="flex-1 text-sm">{notification.message}</span>
                  {href && (
                    <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                  )}
                </span>
                <span className="text-xs text-muted-foreground">
                  {new Date(notification.createdAt).toLocaleString()}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
