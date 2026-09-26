"use client";

import { Bell, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import {
  useMarkAllNotificationsAsRead,
  useMarkNotificationAsRead,
  useSuspenseGetMyNotifications,
} from "@/hooks";
import { getApiErrorMessage } from "@/lib/apiError";
import { cn } from "cn";

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

export default function NotificationList() {
  const params = { page: 1, limit: 8 };

  const { data } = useSuspenseGetMyNotifications(params);
  const { mutate: markAsRead } = useMarkNotificationAsRead();
  const { mutate: markAllAsRead, isPending: markAllPending } =
    useMarkAllNotificationsAsRead();

  const notifications = data?.data ?? [];
  const unreadCount = notifications.filter((item) => !item.isRead).length;

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

  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed py-10 text-center">
        <span className="inline-flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <Bell size={18} />
        </span>
        <p className="text-sm text-muted-foreground">
          You have no notifications yet.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {unreadCount > 0
            ? `${unreadCount} unread`
            : "You are all caught up"}
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
        {notifications.map((notification) => (
          <li key={notification.id}>
            <button
              type="button"
              onClick={() => {
                if (!notification.isRead) {
                  handleMarkAsRead(notification.id);
                }
              }}
              className={cn(
                "flex w-full flex-col gap-1 rounded-xl border px-4 py-3 text-left transition-colors",
                notification.isRead
                  ? "bg-card hover:bg-muted/50"
                  : "border-primary/30 bg-primary/5 hover:bg-primary/10",
              )}
            >
              <span className="flex items-center gap-2">
                {!notification.isRead && (
                  <span className="size-2 shrink-0 rounded-full bg-primary" />
                )}
                <span className="text-sm">{notification.message}</span>
              </span>
              <span className="text-xs text-muted-foreground">
                {new Date(notification.createdAt).toLocaleString()}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
