import { ChevronDown, GalleryVerticalEnd, type LucideIcon, Table } from "lucide-react";

import type { FileRouteTypes } from "@/routeTree.gen";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@repo/ui/components/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@repo/ui/components/sidebar";
import { Link } from "@tanstack/react-router";

interface SidebarItem {
  title: string;
  icon: LucideIcon;
  items: { title: string; url: FileRouteTypes["to"] }[];
}

const sidebarItems: SidebarItem[] = [
  {
    title: "Tables",
    icon: Table,
    items: [
      { title: "Admin", url: "/table/admin" },
      { title: "Award", url: "/table/award" },
      { title: "Ban", url: "/table/ban" },
      { title: "Challenge File", url: "/table/challenge_file" },
      { title: "Challenge", url: "/table/challenge" },
      { title: "Challenge Tag", url: "/table/challenge_tag" },
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
      { title: "Tag", url: "/table/tag" },
      { title: "Team", url: "/table/team" },
      { title: "Ticket", url: "/table/ticket" },
      { title: "Unlock", url: "/table/unlock" },
    ],
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">My App</span>
                  <span className="">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {sidebarItems.map((group) => (
          <Collapsible defaultOpen className="group/collapsible" key={group.title}>
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger>
                  <group.icon className="mr-2 h-4 w-4" />
                  {group.title}
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={false}>
                          {/* TODO: check `isActive` */}
                          <Link to={item.url}>{item.title}</Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
