"use client";

import { cn } from "cn";
import { Bell } from "lucide-react";
import { Suspense, useState } from "react";
import NotificationList, {
  NotificationsLoading,
} from "@/components/modules/notification/notification-list";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGetMyNotifications } from "@/hooks";

const params = { page: 1, limit: 20, isRead: false };

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const { data, isPending } = useGetMyNotifications(params);

  const notifications = data?.data ?? [];
  const unreadCount = notifications.length;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label={
              unreadCount > 0
                ? `Notifications, ${unreadCount} unread`
                : "Notifications"
            }
            className="relative size-9 rounded-full"
          />
        }
      >
        <Bell className="size-5" />
        {unreadCount > 0 && (
          <span
            className={cn(
              "absolute -top-0.5 -right-0.5 grid min-w-4 place-items-center rounded-full bg-destructive px-1 text-[10px] font-semibold leading-4 text-destructive-foreground ring-2 ring-background",
              unreadCount > 9 && "px-1.5",
            )}
          >
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </PopoverTrigger>

      <PopoverContent align="end" className="w-88 p-3">
        <PopoverTitle className="px-1 pb-2">Notifications</PopoverTitle>
        {isPending ? (
          <NotificationsLoading />
        ) : (
          <div className="max-h-96 overflow-y-auto">
            <Suspense fallback={<NotificationsLoading />}>
              <NotificationList onNavigate={() => setOpen(false)} />
            </Suspense>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
