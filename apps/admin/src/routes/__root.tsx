import { AppSidebar, type SidebarItem } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/ui/components/breadcrumb";
import { SidebarProvider } from "@repo/ui/components/sidebar";
import { Toaster } from "@repo/ui/components/sonner";
import { ThemeProvider } from "@repo/ui/components/theme-provider";
import { TooltipProvider } from "@repo/ui/components/tooltip";
import { Outlet, createRootRoute, useLocation } from "@tanstack/react-router";
import { Container, IdCard, Mail, Table2 } from "lucide-react";

const sidebarItems: SidebarItem[] = [
  {
    title: "Mail",
    icon: Mail,
    items: [
      { title: "Inbox", url: "/mail/inbox" },
      { title: "Trash", url: "/mail/trash" },
      { title: "Sent", url: "/mail/sent" },
      { title: "Spam", url: "/mail/spam" },
    ],
  },
  {
    title: "RBAC",
    icon: IdCard,
    items: [
      { title: "Roles", url: "/rbac/roles" },
      { title: "Overrides", url: "/rbac/overrides" },
    ],
  },
  {
    title: "Docker",
    icon: Container,
    items: [
      { title: "Containers", url: "/docker/containers" },
      { title: "Images", url: "/docker/images" },
      { title: "Networks", url: "/docker/networks" },
      { title: "Volumes", url: "/docker/volumes" },
    ],
  },
  {
    title: "Tables",
    icon: Table2,
    items: [
      { title: "Admin", url: "/table/admin" },
      { title: "Award", url: "/table/award" },
      { title: "Ban", url: "/table/ban" },
      { title: "Challenge File", url: "/table/challenge_file" },
      { title: "Challenge", url: "/table/challenge" },
      { title: "Container", url: "/table/container" },
      { title: "Deployment", url: "/table/deployment" },
      { title: "File", url: "/table/file" },
      { title: "Flag", url: "/table/flag" },
      { title: "Hint", url: "/table/hint" },
      { title: "Instance", url: "/table/instance" },
      { title: "Invite", url: "/table/invite" },
      { title: "Notification", url: "/table/notification" },
      { title: "Player Award", url: "/table/player_award" },
      { title: "Player", url: "/table/player" },
      { title: "Submission", url: "/table/submission" },
      { title: "Team", url: "/table/team" },
      { title: "Ticket", url: "/table/ticket" },
      { title: "Unlock", url: "/table/unlock" },
    ],
  },
];

const reverseItems = sidebarItems.reduce(
  (acc, item) => {
    item.items.forEach((subItem) => {
      acc[subItem.url as string] = [item.title, subItem.title];
    });

    return acc;
  },
  {} as Record<string, string[]>,
);

export const Route = createRootRoute({
  component: Index,
});

function Index() {
  const location = useLocation();

  return (
    <ThemeProvider storageKey="athena-theme">
      <TooltipProvider>
        <SidebarProvider>
          <div className="relative flex min-h-screen flex-col bg-background">
            <AppSidebar items={sidebarItems} />
            <div className="flex flex-col w-full min-h-screen">
              <Breadcrumb>
                <BreadcrumbList>{reverseItems[location.pathname]}</BreadcrumbList>
              </Breadcrumb>
              <Outlet />
            </div>
          </div>
          <Toaster richColors position="bottom-right" closeButton visibleToasts={5} />
        </SidebarProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
