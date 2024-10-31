"use client";

import type { components } from "@repo/api";
import { Alert, AlertDescription, AlertTitle } from "@repo/ui/components/alert";
import { Button } from "@repo/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import { ScrollArea } from "@repo/ui/components/scroll-area";
import { formatDistance } from "date-fns";
import { Bell, RefreshCcw } from "lucide-react";

export function PlayerNotification({
  notifications,
}: {
  notifications: components["schemas"]["NotificationModel"][];
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Bell className="size-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-3 w-80">
        <DropdownMenuLabel>
          <span className="flex w-full flex-row items-center justify-between">
            Notifications
            <Button className="p-[10px]" variant="outline">
              <RefreshCcw size={16} />
            </Button>
          </span>
        </DropdownMenuLabel>
        <ScrollArea className="h-[320px]">
          {notifications.map((notification) => (
            <Alert className="group my-1 p-2" key={notification.id}>
              <AlertTitle className="m-1">{notification.title}</AlertTitle>
              <AlertDescription>
                <div className="text-ellipsis">{notification.content}</div>
                <span className="text-xs text-muted-foreground">
                  {formatDistance(notification.updated_at, new Date(), {
                    addSuffix: true,
                    includeSeconds: true,
                  })}
                </span>
              </AlertDescription>
            </Alert>
          ))}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
