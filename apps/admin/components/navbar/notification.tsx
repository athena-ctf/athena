"use client";

import type { components } from "@repo/api";
import { deleteNotification } from "../../../admin/components/admin/actions";
import { Alert, AlertDescription, AlertTitle } from "@ui/components/ui/alert";
import { Button } from "@ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@ui/components/ui/dropdown-menu";
import { ScrollArea } from "@ui/components/ui/scroll-area";
import { formatDistance } from "date-fns";
import { Bell, RefreshCcw, Trash2 } from "lucide-react";
import { useState } from "react";

export function PlayerNotification({
  notifications,
}: {
  notifications: components["schemas"]["NotificationModel"][];
}) {
  const [notifs, setNotifs] = useState(notifications);

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
          {notifs.map((notification) => (
            <Alert className="group my-1 p-2" key={notification.id}>
              <AlertTitle className="m-1">{notification.title}</AlertTitle>
              <AlertDescription>
                <div className="flex flex-row">
                  <div className="text-ellipsis">{notification.content}</div>
                  <Button
                    className="invisible ml-5 p-3 group-hover:visible"
                    variant="outline"
                    onClick={() => {
                      deleteNotification(notification.id).then(() => {
                        setNotifs(notifs.filter((notif) => notif.id !== notification.id));
                      });
                    }}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
                <span className="text-xs text-muted-foreground">
                  {formatDistance(notification.date, new Date(), {
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
